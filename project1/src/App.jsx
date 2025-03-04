import { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Accordion, Form } from 'react-bootstrap';
import PartnersTables from './components/PartnersTables'
import PartnerFormModal from './components/PartnerFormModal'


function App() {
  const [partners, setPartners] = useState([
    { id: 1, name: 'John', surname: 'Doe', birthdate: '1985-05-15' },
    { id: 2, name: 'Jane', surname: 'Smith', birthdate: '1990-08-22' },
    { id: 3, name: 'Michael', surname: 'Johnson', birthdate: '1978-11-30' },
    { id: 4, name: 'Sara', surname: 'Williams', birthdate: '1992-02-17' },
  ]);

  // Filter state
  const [filters, setFilters] = useState({
    name: '',
    surname: '',
    dateFrom: '',
    dateTo: ''
  });
  
  // Filtered partners state
  const [filteredPartners, setFilteredPartners] = useState(partners);
  
  // Update filtered partners when filters or partners change
  useEffect(() => {
    const filtered = partners.filter(partner => {
      // Name filter (case insensitive)
      if (filters.name && !partner.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }
      
      // Surname filter (case insensitive)
      if (filters.surname && !partner.surname.toLowerCase().includes(filters.surname.toLowerCase())) {
        return false;
      }
      
      // Date range filter
      if (filters.dateFrom && partner.birthdate < filters.dateFrom) {
        return false;
      }
      
      if (filters.dateTo && partner.birthdate > filters.dateTo) {
        return false;
      }
      
      return true;
    });
    
    setFilteredPartners(filtered);
  }, [filters, partners]);
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      name: '',
      surname: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  // Modal state
  const [modalState, setModalState] = useState({
    isOpen: false,
    isNew: false,
    partner: null
  });

  const columns = [
    { field: 'actions', label: '', visible: true },
    { field: 'id', label: 'ID', visible: false }, 
    { field: 'name', label: 'First Name', visible: true },
    { field: 'surname', label: 'Last Name', visible: true },
    { field: 'birthdate', label: 'Date of Birth', visible: true }
  ];

  const handleOpenSettings = () => {
    console.log('Settings');
    alert('Settings page to be implemented');
  }

  const handleOpenAddModal = () => {
    setModalState({
      isOpen: true,
      isNew: true,
      partner: null
    });
  };

  const handleEdit = (partner) => {
    setModalState({
      isOpen: true,
      isNew: false,
      partner: partner
    });
  };

  const handleDelete = (partnerId) => {
    setPartners(partners.filter(partner => partner.id !== partnerId));
  };

  const handleSavePartner = (partnerData, shouldClose) => {
    if (modalState.isNew) {
      // Create a new partner with a generated ID
      const newPartner = {
        ...partnerData,
        id: Math.max(0, ...partners.map(p => p.id)) + 1 // Generate a new unique ID
      };
      setPartners([...partners, newPartner]);
    } else {
      // Update existing partner
      setPartners(partners.map(partner => 
        partner.id === partnerData.id ? partnerData : partner
      ));
    }
    
    if (shouldClose) {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      isNew: false,
      partner: null
    });
  };

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1>Partner List</h1>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={handleOpenAddModal} className="me-2">
            Add New Partner
          </Button>
          <Button variant="secondary" onClick={handleOpenSettings}>
            Settings
          </Button>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Filter Partners</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Row>
                    <Col md={6} lg={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="name" 
                          value={filters.name} 
                          onChange={handleFilterChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} lg={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="surname" 
                          value={filters.surname} 
                          onChange={handleFilterChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} lg={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Date From</Form.Label>
                        <Form.Control 
                          type="date" 
                          name="dateFrom" 
                          value={filters.dateFrom} 
                          onChange={handleFilterChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} lg={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Date To</Form.Label>
                        <Form.Control 
                          type="date" 
                          name="dateTo" 
                          value={filters.dateTo} 
                          onChange={handleFilterChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex justify-content-end">
                      {(filters.name || filters.surname || filters.dateFrom || filters.dateTo) && (
                        <Button 
                          variant="outline-danger" 
                          onClick={resetFilters}
                        >
                          Reset Filters
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <PartnersTables 
            partners={filteredPartners} 
            columns={columns} 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Col>
      </Row>
      
      {modalState.isOpen && (
        <PartnerFormModal
          partner={modalState.partner}
          isNew={modalState.isNew}
          onClose={handleCloseModal}
          onSave={handleSavePartner}
        />
      )}
    </Container>
  )
}

export default App

import { useState } from 'react'
import PartnersTables from './components/PartnersTables'
import PartnerFormModal from './components/PartnerFormModal'


function App() {
  const [partners, setPartners] = useState([
    { id: 1, name: 'John', surname: 'Doe', birthdate: '1985-05-15' },
    { id: 2, name: 'Jane', surname: 'Smith', birthdate: '1990-08-22' },
    { id: 3, name: 'Michael', surname: 'Johnson', birthdate: '1978-11-30' },
    { id: 4, name: 'Sara', surname: 'Williams', birthdate: '1992-02-17' },
  ]);

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
    <div className="app-container">
      <div className="header-container">
        <h1>Partner List</h1>
        <button className="add-btn" onClick={handleOpenAddModal}>
          Add New Partner
        </button>
      </div>
      
      <PartnersTables 
        partners={partners} 
        columns={columns} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      {modalState.isOpen && (
        <PartnerFormModal
          partner={modalState.partner}
          isNew={modalState.isNew}
          onClose={handleCloseModal}
          onSave={handleSavePartner}
        />
      )}
    </div>
  )
}

export default App

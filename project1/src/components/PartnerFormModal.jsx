import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function PartnerFormModal({ partner, isNew, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    birthdate: ''
  });

  // Initialize form when partner changes or on open
  useEffect(() => {
    if (partner && !isNew) {
      // Editing an existing partner
      setFormData({
        name: partner.name || '',
        surname: partner.surname || '',
        birthdate: partner.birthdate || ''
      });
    } else {
      // Creating a new partner
      setFormData({
        name: '',
        surname: '',
        birthdate: ''
      });
    }
  }, [partner, isNew]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDiscard = () => {
    onClose();
  };

  const handleSave = (shouldClose = false) => {
    if (isNew) {
      // For new partners, we just pass the form data
      onSave(formData, shouldClose);
    } else {
      // For existing partners, we merge with the original partner object
      const updatedPartner = {
        ...partner,
        ...formData
      };
      onSave(updatedPartner, shouldClose);
    }
  };

  return (
    <Modal show={true} onHide={handleDiscard} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{isNew ? 'Add New Partner' : 'Edit Partner'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="partnerName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="partnerSurname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text" 
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="partnerBirthdate">
            <Form.Label>Birthdate</Form.Label>
            <Form.Control
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDiscard}>
          Discard
        </Button>
        <Button variant="primary" onClick={() => handleSave(false)}>
          Save
        </Button>
        <Button variant="success" onClick={() => handleSave(true)}>
          Save & Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PartnerFormModal;
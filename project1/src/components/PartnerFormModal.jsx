import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Move subscription_types outside of component to prevent re-creation on each render
const subscription_types = ['standard', 'plus'];

function PartnerFormModal({ partner, isNew, onClose, onSave, allPartners = [] }) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    birthdate: '',
    association_date: '',
    address: '',
    zip: '',
    city: '',
    state: '',
    country: '',
    note: '',
    subscription_type: '',
    has_valid_insurance: false,
    associated_partners: [],
  });

  // Add validation state
  const [validationErrors, setValidationErrors] = useState({});

  // Initialize form when partner changes or on open
  useEffect(() => {
    if (partner && !isNew) {
      // Editing an existing partner
      setFormData({
        name: partner.name || '',
        surname: partner.surname || '',
        birthdate: partner.birthdate || '',
        association_date: partner.association_date || '',
        address: partner.address || '',
        zip: partner.zip || '',
        city: partner.city || '',
        state: partner.state || '',
        country: partner.country || '',
        note: partner.note || '',
        subscription_type: partner.subscription_type || subscription_types[0],
        has_valid_insurance: partner.has_valid_insurance || false,
        associated_partners: partner.associated_partners || [],
      });
    } else {
      // Creating a new partner
      setFormData({
        name: '',
        surname: '',
        birthdate: '',
        association_date: '',
        address: '',
        zip: '',
        city: '',
        state: '',
        country: '',
        note: '',
        subscription_type: subscription_types[0],
        has_valid_insurance: false,
        associated_partners: [],
      });
    }
  }, [partner, isNew]); // Removed subscription_types from dependency array

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
    // Validate required fields
    const errors = {};
    if (!formData.name.trim()) errors.name = "First Name is required";
    if (!formData.surname.trim()) errors.surname = "Last Name is required";
    
    // If there are validation errors, show them and stop the save process
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    // Clear any previous validation errors
    setValidationErrors({});
    
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handlePartnerSelect = (selectedPartner) => {
    // Prevent adding duplicate partners
    if (!formData.associated_partners.some(p => p.id === selectedPartner.id)) {
      setFormData(prev => ({
        ...prev,
        associated_partners: [...prev.associated_partners, selectedPartner]
      }));
    }
  };

  const handleRemoveAssociatedPartner = (partnerId) => {
    setFormData(prev => ({
      ...prev,
      associated_partners: prev.associated_partners.filter(p => p.id !== partnerId)
    }));
  };

  return (
    <Modal show={true} onHide={handleDiscard} centered backdrop="static" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isNew ? 'Add New Partner' : 'Edit Partner'}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '75vh', overflowY: 'auto' }}>
        <Form>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="partnerName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!validationErrors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="partnerSurname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text" 
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  isInvalid={!!validationErrors.surname}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.surname}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="partnerBirthdate">
                <Form.Label>Birthdate</Form.Label>
                <Form.Control
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="partnerAssociationDate">
                <Form.Label>Association Date</Form.Label>
                <Form.Control
                  type="date"
                  name="association_date"
                  value={formData.association_date}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>
          
          <Form.Group className="mb-3" controlId="partnerAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          
          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3" controlId="partnerZip">
                <Form.Label>ZIP Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            
            <div className="col-md-8">
              <Form.Group className="mb-3" controlId="partnerCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="partnerState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="partnerCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>
          
          <Form.Group className="mb-3" controlId="partnerNote">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="note"
              value={formData.note}
              onChange={handleChange}
            />
          </Form.Group>
          
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="partnerSubscriptionType">
                <Form.Label>Subscription Type</Form.Label>
                <Form.Select
                  name="subscription_type"
                  value={formData.subscription_type}
                  onChange={handleChange}
                >
                  {subscription_types.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            
            <div className="col-md-6">
              <Form.Group className="mb-3 mt-4" controlId="partnerInsurance">
                <Form.Check
                  type="checkbox"
                  label="Has Valid Insurance"
                  name="has_valid_insurance"
                  checked={formData.has_valid_insurance}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>
            </div>
          </div>
          
          <Form.Group className="mb-3" controlId="partnerAssociations">
            <Form.Label>Associated Partners</Form.Label>
            
            {/* Display currently associated partners */}
            {formData.associated_partners.length > 0 && (
              <div className="mb-3 border p-2 rounded">
                <h6>Selected Partners:</h6>
                <ul className="list-group">
                  {formData.associated_partners.map(assocPartner => (
                    <li key={assocPartner.id} className="list-group-item d-flex justify-content-between align-items-center">
                      {assocPartner.name} {assocPartner.surname}
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleRemoveAssociatedPartner(assocPartner.id)}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Display available partners to select */}
            <div className="border p-2 rounded" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <h6>Available Partners:</h6>
              <ul className="list-group">
                {allPartners
                  .filter(p => p.id !== (partner?.id || null)) // Exclude current partner
                  .map(availablePartner => (
                    <li 
                      key={availablePartner.id} 
                      className="list-group-item list-group-item-action"
                      onClick={() => handlePartnerSelect(availablePartner)}
                      style={{ cursor: 'pointer' }}
                    >
                      {availablePartner.name} {availablePartner.surname}
                    </li>
                  ))}
              </ul>
              {allPartners.length === 0 && (
                <p className="text-muted">No other partners available</p>
              )}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDiscard}>
          Discard
        </Button>
        {!isNew && (
          <Button variant="primary" onClick={() => handleSave(false)}>
            Save
          </Button>
        )}
        <Button variant="success" onClick={() => handleSave(true)}>
          Save & Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PartnerFormModal;
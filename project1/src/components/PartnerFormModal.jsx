import { useState, useEffect } from 'react';

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
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isNew ? 'Add New Partner' : 'Edit Partner'}</h2>
        
        <div className="form-group">
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="surname">Last Name</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="birthdate">Birthdate</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />
        </div>
        
        <div className="modal-actions">
          <button 
            className="discard-btn" 
            onClick={handleDiscard}
          >
            Discard
          </button>
          <button 
            className="save-btn" 
            onClick={() => handleSave(false)}
          >
            Save
          </button>
          <button 
            className="save-close-btn" 
            onClick={() => handleSave(true)}
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PartnerFormModal;
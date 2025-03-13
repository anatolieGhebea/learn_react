import { Modal, Button, Form } from 'react-bootstrap';
import { usePartners } from '../context/PartnersContext';

function SettingsModal({ show, onClose }) {
  const { columns, updateColumnVisibility } = usePartners();

  const handleVisibilityChange = (e, field) => {
    updateColumnVisibility(field, e.target.checked);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Column Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted mb-3">Select which columns should be visible in the table:</p>
        <Form>
          {columns.map(column => (
            <Form.Check 
              key={column.field}
              type="checkbox" 
              id={`column-${column.field}`}
              label={column.label || column.field}
              checked={column.visible}
              onChange={(e) => handleVisibilityChange(e, column.field)}
              className="mb-2"
              disabled={column.field === 'actions'} // Actions column is always visible
            />
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SettingsModal;
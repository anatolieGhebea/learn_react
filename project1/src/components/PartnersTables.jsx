import { Table, Button } from 'react-bootstrap';

function PartnersTables({partners, columns, onEdit, onDelete}){
// Filter columns to only show visible ones
const visibleColumns = columns.filter(column => column.visible !== false);
  
// Find if there's an actions column
const hasActionsColumn = visibleColumns.some(column => column.type === 'actions');

return (
  <div className="table-responsive">
    <Table striped bordered hover>
      <thead>
        <tr>
            {visibleColumns.map(column => (
                <th key={column.field || column.type}>{column.label}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {partners.map((partner) => (
          <tr key={partner.id}>
            {visibleColumns.map(column => {
              // For actions type column, render buttons
              if (column.field === 'actions') {
                return (
                  <td key={`${partner.id}-actions`}>
                    {onEdit && (
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2" 
                        onClick={() => onEdit(partner)}
                      >
                        Edit
                      </Button>
                    )}
                    {onDelete && (
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => onDelete(partner.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                );
              }
              
              // For regular data columns
              return (
                <td key={`${partner.id}-${column.field}`}>
                  {partner[column.field]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);
}

export default PartnersTables;
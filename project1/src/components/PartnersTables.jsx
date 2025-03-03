function PartnersTables({partners, columns, onEdit, onDelete}){
// Filter columns to only show visible ones
const visibleColumns = columns.filter(column => column.visible !== false);
  
// Find if there's an actions column
const hasActionsColumn = visibleColumns.some(column => column.type === 'actions');

return (
  <div className="table-container">
    <table>
      <thead>
        <tr>
            {!hasActionsColumn && <th>Actions</th>}
            {visibleColumns.map(column => (
                <th key={column.field || column.type}>{column.label}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {partners.map((partner) => (
          <tr key={partner.id}>
            {/* Add actions column if not defined in columns prop */}
            {!hasActionsColumn && (
              <td className="actions-cell">
                {onEdit && (
                  <button 
                    className="edit-btn" 
                    onClick={() => onEdit(partner)}
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button 
                    className="delete-btn" 
                    onClick={() => onDelete(partner.id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            )}

            {visibleColumns.map(column => {
              // For actions type column, render buttons
              if (column.type === 'actions') {
                return (
                  <td key={`${partner.id}-actions`} className="actions-cell">
                    {onEdit && (
                      <button 
                        className="edit-btn" 
                        onClick={() => onEdit(partner)}
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button 
                        className="delete-btn" 
                        onClick={() => onDelete(partner.id)}
                      >
                        Delete
                      </button>
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
    </table>
  </div>
);
}

export default PartnersTables;
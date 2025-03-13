import { createContext, useState, useEffect, useContext } from 'react';

const PartnersContext = createContext();

export function PartnersProvider({ children }) {
  // Initial partners data
  const initialPartners = [
    { id: 1, name: 'John', surname: 'Doe', birthdate: '1985-05-15' },
    { id: 2, name: 'Jane', surname: 'Smith', birthdate: '1990-08-22' },
    { id: 3, name: 'Michael', surname: 'Johnson', birthdate: '1978-11-30' },
    { id: 4, name: 'Sara', surname: 'Williams', birthdate: '1992-02-17' },
  ];

  // Initial columns configuration
  const initialColumns = [
    { field: 'actions', label: '', visible: true },
    { field: 'id', label: 'ID', visible: false }, 
    { field: 'name', label: 'First Name', visible: true },
    { field: 'surname', label: 'Last Name', visible: true },
    { field: 'birthdate', label: 'Date of Birth', visible: true }
  ];

  // Load partners from localStorage or use initial data
  const [partners, setPartners] = useState(() => {
    const savedPartners = localStorage.getItem('partners');
    return savedPartners ? JSON.parse(savedPartners) : initialPartners;
  });

  // Load columns from localStorage or use initial data
  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem('columns');
    return savedColumns ? JSON.parse(savedColumns) : initialColumns;
  });

  // Save partners to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('partners', JSON.stringify(partners));
  }, [partners]);

  // Save columns to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  const addPartner = (partnerData) => {
    const newPartner = {
      ...partnerData,
      id: Math.max(0, ...partners.map(p => p.id)) + 1 // Generate a new unique ID
    };
    setPartners([...partners, newPartner]);
  };

  const updatePartner = (partnerData) => {
    setPartners(partners.map(partner => 
      partner.id === partnerData.id ? partnerData : partner
    ));
  };

  const deletePartner = (partnerId) => {
    setPartners(partners.filter(partner => partner.id !== partnerId));
  };

  const updateColumnVisibility = (fieldName, isVisible) => {
    setColumns(columns.map(column => 
      column.field === fieldName ? { ...column, visible: isVisible } : column
    ));
  };

  return (
    <PartnersContext.Provider value={{ 
      partners, 
      addPartner, 
      updatePartner, 
      deletePartner,
      columns,
      updateColumnVisibility
    }}>
      {children}
    </PartnersContext.Provider>
  );
}

// Custom hook to use the partners context
export function usePartners() {
  const context = useContext(PartnersContext);
  if (context === undefined) {
    throw new Error('usePartners must be used within a PartnersProvider');
  }
  return context;
}
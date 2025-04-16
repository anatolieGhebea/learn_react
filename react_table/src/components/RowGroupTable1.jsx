// App.jsx
import React, { useMemo, useRef, useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table";

// Sample component that displays the table
function RowGroupTable1({ search = "" }) {
  // State for sorting
  const [sorting, setSorting] = useState([]);
  
  // State for pagination
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 6, // Default page size
  });

  // Refs for scroll synchronization
  const totalsTableRef = useRef(null);
  const dataTableRef = useRef(null);
  
  // Flag to prevent infinite scroll loops
  const isScrolling = useRef(false);
  
  // Set up scroll synchronization
  useEffect(() => {
    const totalsTable = totalsTableRef.current;
    const dataTable = dataTableRef.current;
    
    if (!totalsTable || !dataTable) return;
    
    const handleTotalsScroll = () => {
      if (isScrolling.current) return;
      isScrolling.current = true;
      dataTable.scrollLeft = totalsTable.scrollLeft;
      setTimeout(() => {
        isScrolling.current = false;
      }, 10);
    };
    
    const handleDataScroll = () => {
      if (isScrolling.current) return;
      isScrolling.current = true;
      totalsTable.scrollLeft = dataTable.scrollLeft;
      setTimeout(() => {
        isScrolling.current = false;
      }, 10);
    };
    
    totalsTable.addEventListener('scroll', handleTotalsScroll);
    dataTable.addEventListener('scroll', handleDataScroll);
    
    return () => {
      totalsTable.removeEventListener('scroll', handleTotalsScroll);
      dataTable.removeEventListener('scroll', handleDataScroll);
    };
  }, []);

  // Define totals rows separately
  const totals = useMemo(
    () => [
      {
        cod_art: "Totals",
        unit: "kg",
        "202201": "209,00",
        "202202": "77,00",
        "202203": "150,00",
        "202204": "217,00",
        "202205": "287,00",
        "202206": "24,00",
        kg_year: "964,00",
        max: "287,00",
        cv_avg: "160,67"
      },
      {
        cod_art: "Totals",
        unit: "€",
        "202201": "2.484,50",
        "202202": "1.325,50",
        "202203": "1.560,00",
        "202204": "1.589,40",
        "202205": "4.904,80",
        "202206": "480,00",
        kg_year: "12.344,20",
        max: "4.904,80",
        cv_avg: "2.057,37"
      }
    ],
    []
  );

  // 1. Prepare your data without the totals
  const data = useMemo(
    () => [
      // Original products
      {
        cod_art: "ttv-01",
        unit: "kg",
        "202201": "50,00",
        "202202": "0,00",
        "202203": "150,00",
        "202204": "75,00",
        "202205": "87,00",
        "202206": "0,00",
        kg_year: "362,00",
        max: "150,00",
        cv_avg: "60,33"
      },
      {
        cod_art: "ttv-01",
        unit: "€",
        "202201": "520,00",
        "202202": "0,00",
        "202203": "1.560,00",
        "202204": "780,00",
        "202205": "904,80",
        "202206": "0,00",
        kg_year: "3.764,80",
        max: "1.560,00",
        cv_avg: "627,47"
      },
      {
        cod_art: "ttu-02",
        unit: "kg",
        "202201": "85,00",
        "202202": "15,00",
        "202203": "0,00",
        "202204": "142,00",
        "202205": "0,00",
        "202206": "0,00",
        kg_year: "242,00",
        max: "142,00",
        cv_avg: "40,33"
      },
      {
        cod_art: "ttu-02",
        unit: "€",
        "202201": "484,50",
        "202202": "85,50",
        "202203": "0,00",
        "202204": "809,40",
        "202205": "0,00",
        "202206": "0,00",
        kg_year: "1.379,40",
        max: "809,40",
        cv_avg: "229,90"
      },
      {
        cod_art: "mvp-16",
        unit: "kg",
        "202201": "74,00",
        "202202": "62,00",
        "202203": "0,00",
        "202204": "0,00",
        "202205": "200,00",
        "202206": "24,00",
        kg_year: "360,00",
        max: "200,00",
        cv_avg: "60,00"
      },
      {
        cod_art: "mvp-16",
        unit: "€",
        "202201": "1.480,00",
        "202202": "1.240,00",
        "202203": "0,00",
        "202204": "0,00",
        "202205": "4.000,00",
        "202206": "480,00",
        kg_year: "7.200,00",
        max: "4.000,00",
        cv_avg: "1.200,00"
      },
      // New products
      {
        cod_art: "abc-01",
        unit: "kg",
        "202201": "35,00",
        "202202": "45,00",
        "202203": "20,00",
        "202204": "56,00",
        "202205": "65,00",
        "202206": "30,00",
        kg_year: "251,00",
        max: "65,00",
        cv_avg: "41,83"
      },
      {
        cod_art: "abc-01",
        unit: "€",
        "202201": "350,00",
        "202202": "450,00",
        "202203": "200,00",
        "202204": "560,00",
        "202205": "650,00",
        "202206": "300,00",
        kg_year: "2.510,00",
        max: "650,00",
        cv_avg: "418,33"
      },
      {
        cod_art: "xyz-02",
        unit: "kg",
        "202201": "90,00",
        "202202": "75,00",
        "202203": "60,00",
        "202204": "85,00",
        "202205": "95,00",
        "202206": "70,00",
        kg_year: "475,00",
        max: "95,00",
        cv_avg: "79,17"
      },
      {
        cod_art: "xyz-02",
        unit: "€",
        "202201": "1.080,00",
        "202202": "900,00",
        "202203": "720,00",
        "202204": "1.020,00",
        "202205": "1.140,00",
        "202206": "840,00",
        kg_year: "5.700,00",
        max: "1.140,00",
        cv_avg: "950,00"
      },
      {
        cod_art: "pqr-03",
        unit: "kg",
        "202201": "42,00",
        "202202": "35,00",
        "202203": "50,00",
        "202204": "45,00",
        "202205": "38,00",
        "202206": "48,00",
        kg_year: "258,00",
        max: "50,00",
        cv_avg: "43,00"
      },
      {
        cod_art: "pqr-03",
        unit: "€",
        "202201": "630,00",
        "202202": "525,00",
        "202203": "750,00",
        "202204": "675,00",
        "202205": "570,00",
        "202206": "720,00",
        kg_year: "3.870,00",
        max: "750,00",
        cv_avg: "645,00"
      },
      {
        cod_art: "lmn-04",
        unit: "kg",
        "202201": "65,00",
        "202202": "72,00",
        "202203": "58,00",
        "202204": "0,00",
        "202205": "80,00",
        "202206": "68,00",
        kg_year: "343,00",
        max: "80,00",
        cv_avg: "57,17"
      },
      {
        cod_art: "lmn-04",
        unit: "€",
        "202201": "975,00",
        "202202": "1.080,00",
        "202203": "870,00",
        "202204": "0,00",
        "202205": "1.200,00",
        "202206": "1.020,00",
        kg_year: "5.145,00",
        max: "1.200,00",
        cv_avg: "857,50"
      },
      {
        cod_art: "def-05",
        unit: "kg",
        "202201": "28,00",
        "202202": "22,00",
        "202203": "30,00",
        "202204": "25,00",
        "202205": "32,00",
        "202206": "20,00",
        kg_year: "157,00",
        max: "32,00",
        cv_avg: "26,17"
      },
      {
        cod_art: "def-05",
        unit: "€",
        "202201": "392,00",
        "202202": "308,00",
        "202203": "420,00",
        "202204": "350,00",
        "202205": "448,00",
        "202206": "280,00",
        kg_year: "2.198,00",
        max: "448,00",
        cv_avg: "366,33"
      },
      {
        cod_art: "ghi-06",
        unit: "kg",
        "202201": "55,00",
        "202202": "0,00",
        "202203": "60,00",
        "202204": "70,00",
        "202205": "65,00",
        "202206": "0,00",
        kg_year: "250,00",
        max: "70,00",
        cv_avg: "41,67"
      },
      {
        cod_art: "ghi-06",
        unit: "€",
        "202201": "825,00",
        "202202": "0,00",
        "202203": "900,00",
        "202204": "1.050,00",
        "202205": "975,00",
        "202206": "0,00",
        kg_year: "3.750,00",
        max: "1.050,00",
        cv_avg: "625,00"
      },
      {
        cod_art: "jkl-07",
        unit: "kg",
        "202201": "0,00",
        "202202": "48,00",
        "202203": "52,00",
        "202204": "45,00",
        "202205": "0,00",
        "202206": "50,00",
        kg_year: "195,00",
        max: "52,00",
        cv_avg: "32,50"
      },
      {
        cod_art: "jkl-07",
        unit: "€",
        "202201": "0,00",
        "202202": "720,00",
        "202203": "780,00",
        "202204": "675,00",
        "202205": "0,00",
        "202206": "750,00",
        kg_year: "2.925,00",
        max: "780,00",
        cv_avg: "487,50"
      },
      {
        cod_art: "stu-08",
        unit: "kg",
        "202201": "40,00",
        "202202": "38,00",
        "202203": "45,00",
        "202204": "42,00",
        "202205": "36,00",
        "202206": "44,00",
        kg_year: "245,00",
        max: "45,00",
        cv_avg: "40,83"
      },
      {
        cod_art: "stu-08",
        unit: "€",
        "202201": "600,00",
        "202202": "570,00",
        "202203": "675,00",
        "202204": "630,00",
        "202205": "540,00",
        "202206": "660,00",
        kg_year: "3.675,00",
        max: "675,00",
        cv_avg: "612,50"
      },
      {
        cod_art: "vwx-09",
        unit: "kg",
        "202201": "32,00",
        "202202": "36,00",
        "202203": "0,00",
        "202204": "38,00",
        "202205": "35,00",
        "202206": "30,00",
        kg_year: "171,00",
        max: "38,00",
        cv_avg: "28,50"
      },
      {
        cod_art: "vwx-09",
        unit: "€",
        "202201": "480,00",
        "202202": "540,00",
        "202203": "0,00",
        "202204": "570,00",
        "202205": "525,00",
        "202206": "450,00",
        kg_year: "2.565,00",
        max: "570,00",
        cv_avg: "427,50"
      },
      {
        cod_art: "opq-10",
        unit: "kg",
        "202201": "25,00",
        "202202": "28,00",
        "202203": "30,00",
        "202204": "22,00",
        "202205": "26,00",
        "202206": "32,00",
        kg_year: "163,00",
        max: "32,00",
        cv_avg: "27,17"
      },
      {
        cod_art: "opq-10",
        unit: "€",
        "202201": "375,00",
        "202202": "420,00",
        "202203": "450,00",
        "202204": "330,00",
        "202205": "390,00",
        "202206": "480,00",
        kg_year: "2.445,00",
        max: "480,00",
        cv_avg: "407,50"
      },
      {
        cod_art: "rst-11",
        unit: "kg",
        "202201": "50,00",
        "202202": "45,00",
        "202203": "55,00",
        "202204": "0,00",
        "202205": "60,00",
        "202206": "48,00",
        kg_year: "258,00",
        max: "60,00",
        cv_avg: "43,00"
      },
      {
        cod_art: "rst-11",
        unit: "€",
        "202201": "750,00",
        "202202": "675,00",
        "202203": "825,00",
        "202204": "0,00",
        "202205": "900,00",
        "202206": "720,00",
        kg_year: "3.870,00",
        max: "900,00",
        cv_avg: "645,00"
      },
      {
        cod_art: "uvw-12",
        unit: "kg",
        "202201": "45,00",
        "202202": "40,00",
        "202203": "0,00",
        "202204": "50,00",
        "202205": "42,00",
        "202206": "48,00",
        kg_year: "225,00",
        max: "50,00",
        cv_avg: "37,50"
      },
      {
        cod_art: "uvw-12",
        unit: "€",
        "202201": "675,00",
        "202202": "600,00",
        "202203": "0,00",
        "202204": "750,00",
        "202205": "630,00",
        "202206": "720,00",
        kg_year: "3.375,00",
        max: "750,00",
        cv_avg: "562,50"
      }
    ],
    []
  );

  // Filter data based on search input
  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    
    return data.filter(row => {
      return row.cod_art.toLowerCase().includes(search.toLowerCase());
    });
  }, [data, search]);

  // Group data by cod_art
  const groupedData = useMemo(() => {
    const groups = {};
    filteredData.forEach(row => {
      if (!groups[row.cod_art]) {
        groups[row.cod_art] = [];
      }
      groups[row.cod_art].push(row);
    });
    return groups;
  }, [filteredData]);

  // Process data for sorting (one entry per cod_art)
  const processedDataForSorting = useMemo(() => {
    const result = [];
    Object.entries(groupedData).forEach(([codArt, rows]) => {
      // Find the kg row
      const kgRow = rows.find(row => row.unit === 'kg');
      const euroRow = rows.find(row => row.unit === '€');
      
      if (kgRow && euroRow) {
        // Create a combined row for sorting
        result.push({
          ...kgRow,
          originalKgRow: kgRow,
          originalEuroRow: euroRow,
          // Store both rows for rendering
          originalRows: rows
        });
      }
    });
    return result;
  }, [groupedData]);

  // Group totals by cod_art
  const groupedTotals = useMemo(() => {
    const groups = {};
    totals.forEach(row => {
      if (!groups[row.cod_art]) {
        groups[row.cod_art] = [];
      }
      groups[row.cod_art].push(row);
    });
    return groups;
  }, [totals]);

  // Reset pagination when search changes
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      pageIndex: 0,
    }));
  }, [search]);

  // 2. Create columns
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor("cod_art", {
        header: () => "cod_art",
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor("unit", {
        header: () => "unit",
        cell: (info) => info.getValue(),
        enableSorting: false // Disable sorting for unit column
      }),
      columnHelper.accessor("202201", {
        header: () => "202201",
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor("202202", {
        header: () => "202202",
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor("202203", {
        header: () => "202203",
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor("202204", {
        header: () => "202204",
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor("202205", {
        header: () => "202205",
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor("202206", {
        header: () => "202206",
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor("kg_year", {
        header: () => "kg_year",
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor("max", {
        header: () => "max",
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor("cv_avg", {
        header: () => "cv_avg",
        cell: (info) => info.getValue(),
        enableSorting: true
      })
    ],
    [columnHelper]
  );

  // 3. Create the table instances
  const totalsTable = useReactTable({
    data: totals,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  // Create a sortable table for the data
  const dataTable = useReactTable({
    data: processedDataForSorting,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    // Define page count manually for "all" option
    manualPagination: pagination.pageSize === 'all',
    pageCount: pagination.pageSize === 'all' ? 1 : undefined
  });

  // Helper function to handle "all" pagination
  useEffect(() => {
    if (pagination.pageSize === 'all') {
      dataTable.setPageSize(processedDataForSorting.length || 1);
    }
  }, [pagination.pageSize, processedDataForSorting.length]);

  // Define column widths for sticky positioning
  const COL_WIDTH = {
    first: 100,  // Width of first column (cod_art)
    second: 100  // Width of second column (unit)
  };

  // Helper function to render table header
  const renderTotalsTableHeader = () => (
    <thead>
      {totalsTable.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => (
            <th 
              key={header.id}
              style={{ 
                border: '1px solid #ddd', 
                padding: '8px', 
                backgroundColor: '#f2f2f2',
                minWidth: `${index < 2 ? COL_WIDTH[index === 0 ? 'first' : 'second'] : 100}px`,
                // Make the first and second columns sticky
                ...(index === 0 ? {
                  position: 'sticky',
                  left: 0,
                  zIndex: 3,
                  boxShadow: '2px 0 5px -2px #888'
                } : index === 1 ? {
                  position: 'sticky',
                  left: `${COL_WIDTH.first}px`,
                  zIndex: 2,
                  boxShadow: '2px 0 5px -2px #888'
                } : {})
              }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );

  // Helper function to render data table header with sorting
  const renderDataTableHeader = () => (
    <thead>
      {dataTable.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => (
            <th 
              key={header.id}
              style={{ 
                border: '1px solid #ddd', 
                padding: '8px', 
                backgroundColor: '#f2f2f2',
                minWidth: `${index < 2 ? COL_WIDTH[index === 0 ? 'first' : 'second'] : 100}px`,
                // Make the first and second columns sticky
                ...(index === 0 ? {
                  position: 'sticky',
                  left: 0,
                  zIndex: 3,
                  boxShadow: '2px 0 5px -2px #888'
                } : index === 1 ? {
                  position: 'sticky',
                  left: `${COL_WIDTH.first}px`,
                  zIndex: 2,
                  boxShadow: '2px 0 5px -2px #888'
                } : {}),
                ...(header.column.getCanSort() ? { cursor: 'pointer' } : {})
              }}
              onClick={header.column.getToggleSortingHandler()}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              {{
                asc: ' 🔼',
                desc: ' 🔽',
              }[header.column.getIsSorted()] ?? ''}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );

  // Pagination controls component
  const PaginationControls = () => {
    const pageCount = pagination.pageSize === 'all' 
      ? 1 
      : Math.ceil(processedDataForSorting.length / pagination.pageSize);

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1rem 0' }}>
        <div>
          <button
            onClick={() => dataTable.setPageIndex(0)}
            disabled={!dataTable.getCanPreviousPage()}
            style={{ margin: '0 5px' }}
          >
            {'<<'}
          </button>
          <button
            onClick={() => dataTable.previousPage()}
            disabled={!dataTable.getCanPreviousPage()}
            style={{ margin: '0 5px' }}
          >
            {'<'}
          </button>
          <button
            onClick={() => dataTable.nextPage()}
            disabled={!dataTable.getCanNextPage()}
            style={{ margin: '0 5px' }}
          >
            {'>'}
          </button>
          <button
            onClick={() => dataTable.setPageIndex(pageCount - 1)}
            disabled={!dataTable.getCanNextPage()}
            style={{ margin: '0 5px' }}
          >
            {'>>'}
          </button>
        </div>
        <div>
          <span>
            Page{' '}
            <strong>
              {pagination.pageIndex + 1} of {pageCount}
            </strong>{' '}
          </span>
        </div>
        <div>
          <select
            value={pagination.pageSize}
            onChange={e => {
              const value = e.target.value;
              setPagination(old => ({
                ...old,
                pageIndex: 0, // Reset to first page when changing page size
                pageSize: value === 'all' ? 'all' : Number(value)
              }));
            }}
            style={{ margin: '0 5px' }}
          >
            {[6, 12, 20, 50, 'all'].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize === 'all' ? 'All' : pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  // 4. Render the tables with custom rowspan handling
  return (
    <div>
      {/* Totals Table */}
      <h3>Totals</h3>
      <div ref={totalsTableRef} style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '30px' }}>
          {renderTotalsTableHeader()}
          <tbody>
            {Object.entries(groupedTotals).map(([codArt, rows]) => {
              return rows.map((row, rowIndex) => {
                // Find the row in the table model
                const tableRow = totalsTable.getRowModel().rows.find(r => 
                  r.original.cod_art === row.cod_art && r.original.unit === row.unit
                );
                
                if (!tableRow) return null;
                
                return (
                  <tr 
                    key={tableRow.id}
                    style={{ 
                      backgroundColor: row.unit === '€' ? '#e6f0ff' : 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    {tableRow.getVisibleCells().map((cell, cellIndex) => {
                      // Only the first column (cod_art) needs rowspan
                      if (cellIndex === 0 && rowIndex === 0) {
                        return (
                          <td 
                            key={cell.id} 
                            rowSpan={rows.length}
                            style={{ 
                              border: '1px solid #ddd', 
                              padding: '8px',
                              // Make the first column sticky
                              position: 'sticky',
                              left: 0,
                              zIndex: 1,
                              backgroundColor: row.unit === '€' ? '#e6f0ff' : 'white',
                              boxShadow: '2px 0 5px -2px #888',
                              minWidth: `${COL_WIDTH.first}px`
                            }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        );
                      } else if (cellIndex === 0 && rowIndex !== 0) {
                        // Skip this cell as it's part of a rowspan
                        return null;
                      } else if (cellIndex === 1) {
                        // Make the unit column sticky
                        return (
                          <td 
                            key={cell.id}
                            style={{ 
                              border: '1px solid #ddd', 
                              padding: '8px',
                              position: 'sticky',
                              left: `${COL_WIDTH.first}px`,
                              zIndex: 1,
                              backgroundColor: row.unit === '€' ? '#e6f0ff' : 'white',
                              boxShadow: '2px 0 5px -2px #888',
                              minWidth: `${COL_WIDTH.second}px`
                            }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        );
                      }
                      
                      return (
                        <td 
                          key={cell.id}
                          style={{ border: '1px solid #ddd', padding: '8px' }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>

      {/* Data Table */}
      <h3>Products</h3>
      <div ref={dataTableRef} style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          {renderDataTableHeader()}
          <tbody>
            {dataTable.getRowModel().rows.map((row) => {
              // Get the original kg and euro rows
              const { originalRows } = row.original;
              
              return originalRows.map((originalRow, rowIndex) => {
                return (
                  <tr 
                    key={`${row.id}-${rowIndex}`}
                    style={{ 
                      backgroundColor: originalRow.unit === '€' ? '#e6f0ff' : 'white'
                    }}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => {
                      // Only the first column (cod_art) needs rowspan
                      if (cellIndex === 0 && rowIndex === 0) {
                        return (
                          <td 
                            key={cell.id} 
                            rowSpan={originalRows.length}
                            style={{ 
                              border: '1px solid #ddd', 
                              padding: '8px',
                              // Make the first column sticky
                              position: 'sticky',
                              left: 0,
                              zIndex: 1,
                              backgroundColor: originalRow.unit === '€' ? '#e6f0ff' : 'white',
                              boxShadow: '2px 0 5px -2px #888',
                              minWidth: `${COL_WIDTH.first}px`
                            }}
                          >
                            {originalRow.cod_art}
                          </td>
                        );
                      } else if (cellIndex === 0 && rowIndex !== 0) {
                        // Skip this cell as it's part of a rowspan
                        return null;
                      } else if (cellIndex === 1) {
                        // Make the unit column sticky
                        return (
                          <td 
                            key={`${cell.id}-unit`}
                            style={{ 
                              border: '1px solid #ddd', 
                              padding: '8px',
                              position: 'sticky',
                              left: `${COL_WIDTH.first}px`,
                              zIndex: 1,
                              backgroundColor: originalRow.unit === '€' ? '#e6f0ff' : 'white',
                              boxShadow: '2px 0 5px -2px #888',
                              minWidth: `${COL_WIDTH.second}px`
                            }}
                          >
                            {originalRow.unit}
                          </td>
                        );
                      }
                      
                      // For all other columns, display the data from the original row
                      const columnId = cell.column.id;
                      return (
                        <td 
                          key={`${cell.id}-${columnId}`}
                          style={{ border: '1px solid #ddd', padding: '8px' }}
                        >
                          {originalRow[columnId]}
                        </td>
                      );
                    })}
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
        </div>
        <PaginationControls />
    </div>
  );
}

export default RowGroupTable1;
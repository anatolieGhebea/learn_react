import { useState } from 'react'
import './App.css'
import RowGroupTable1 from './components/RowGroupTable1'

function App() {
  const [search, setSearch] = useState('')

  return (
    <>
      <div className='container'>
        <div>
          <div className='filters'>
            Filters
            <input type="text" placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className='table_container'>
            <RowGroupTable1 search={search} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App

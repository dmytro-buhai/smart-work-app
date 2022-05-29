import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SWNavbar from './components/SWNavbar';
import OfficesList from './components/OfficesList';

function App() {

  const[offices, setOffices] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:5001/api/Offices/List").then(response => {
      console.log(response);
      setOffices(response.data);
    })
  }, [])

  return (
    <div className="App">
      <SWNavbar />
      <OfficesList offices = {offices} />
    </div>
  );
}

export default App;

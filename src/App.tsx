import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import SWNavbar from './components/SWNavbar';
import OfficesList from './components/OfficesList';

function App() {

  const[offices, setOffices] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:5001/api/Office/List").then(response => {
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Office } from './models/office';
import OfficeDashboard from './components/OfficeDashboard';
import NavBar from './components/NavBar';
import { Container } from 'semantic-ui-react';

function App() {

  const[offices, setOffices] = useState<Office[]>([]);
  const[selectedOffice, setSelectedOffice] = useState<Office | undefined>(undefined)
  
  const pageInfo = {
    countItems: 10
  }

  useEffect(() => {

    axios.post("https://localhost:5001/api/Offices/List", pageInfo).then(response => {
      console.log(response);
      setOffices(response.data);
    })
  }, [])

  function handleSelectOffice(id: number){
    setSelectedOffice(offices.find(x => x.id === id))
  }

  function handleCancelSelectOffice(){
    setSelectedOffice(undefined)
  }

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <OfficeDashboard 
          offices = {offices}
          selectedOffice={selectedOffice}
          selectOffice={handleSelectOffice} 
          cancelSelectOffice={handleCancelSelectOffice}
        />
      </Container> 
    </>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Office } from './models/office';
import OfficeDashboard from './components/OfficeDashboard';
import NavBar from './components/NavBar';
import { Container } from 'semantic-ui-react';

function App() {

  const[offices, setOffices] = useState<Office[]>([]);
  const pageInfo = {
    countItems: 10
  }

  useEffect(() => {

    axios.post("https://localhost:5001/api/Offices/List", pageInfo).then(response => {
      console.log(response);
      setOffices(response.data);
    })
  }, [])

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <OfficeDashboard offices = {offices} />
      </Container> 
    </>
  );
}

export default App;

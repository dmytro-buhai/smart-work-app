import React, { useEffect, useState } from 'react';
import { Office } from './models/office';
import OfficeDashboard from './components/OfficeDashboard';
import NavBar from './components/NavBar';
import { Container } from 'semantic-ui-react';
import agent from './api/agent';
import LoadingComponent from './components/LoadingComponent';

function App() {

  const[offices, setOffices] = useState<Office[]>([]);
  const[selectedOffice, setSelectedOffice] = useState<Office | undefined>(undefined);
  const[editMode, setEditMode] = useState(false);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Offices.list().then(response => {
      console.log(response);
      setOffices(response);
      setLoading(false);
    })
  }, [])

  function handleSelectOffice(id: number){
    setSelectedOffice(offices.find(x => x.id === id))
  }

  function handleCancelSelectOffice(){
    setSelectedOffice(undefined)
  }

  function handleFormOpen(id?: number){
    id ? handleSelectOffice(id) : handleCancelSelectOffice();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditOffice(office: Office){
    office.id 
    ? setOffices([...offices.filter(x => x.id !== office.id), office])
    : setOffices([...offices, office]);
    setEditMode(false);
    setSelectedOffice(office);
  }

  function handleDeleteOffice(id: number){
    setOffices([...offices.filter(x => x.id !== id)]);
  }

  if (loading) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <OfficeDashboard 
          offices = {offices}
          selectedOffice={selectedOffice}
          selectOffice={handleSelectOffice} 
          cancelSelectOffice={handleCancelSelectOffice}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditOffice}
          deleteOffice={handleDeleteOffice}
        />
      </Container> 
    </>
  );
}

export default App;

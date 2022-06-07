import React, { useEffect, useState } from 'react';
import { Office } from './models/office';
import OfficeDashboard from './components/OfficeDashboard';
import NavBar from './components/NavBar';
import { Container } from 'semantic-ui-react';
import agent from './api/agent';
import LoadingComponent from './components/LoadingComponent';
import { AddOfficeDTO } from './models/officeDTOs/addOfficeDTO';
import { UpdateOfficeDTO } from './models/officeDTOs/updateOfficeDTO';

function App() {

  const[offices, setOffices] = useState<Office[]>([]);
  const[selectedOffice, setSelectedOffice] = useState<Office | undefined>(undefined);
  const[editMode, setEditMode] = useState(false);
  const[loading, setLoading] = useState(true);
  const[submitting, setSubmitting] = useState(false);

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

  function convertOfficeForCreating(office: Office): AddOfficeDTO{  
    var addOfficeDTO : AddOfficeDTO = {
      companyId: office.companyId,
      name: office.name,
      address: office.address,
      phoneNumber: office.phoneNumber,
      photoFileName: office.photoFileName,
      isFavourite: office.isFavourite,
    }
    return addOfficeDTO;
  }

  function convertOfficeForUpdating(office: Office): UpdateOfficeDTO{  
    var updateOfficeDTO : UpdateOfficeDTO = {
      id: office.id,
      companyId: office.companyId,
      name: office.name,
      address: office.address,
      phoneNumber: office.phoneNumber,
      photoFileName: office.photoFileName,
      isFavourite: office.isFavourite,
      subscribes: office.subscribes,
      rooms: office.rooms,
    }

    console.log(updateOfficeDTO);

    return updateOfficeDTO;
  }

  function handleCreateOrEditOffice(office: Office){
    setSubmitting(true);

    if(office.id) {
      agent.Offices.update(office).then(() => {
        setOffices([...offices.filter(x => x.id !== office.id), office]);
        setSelectedOffice(office);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      agent.Offices.create(convertOfficeForCreating(office)).then(() => {
        setOffices([...offices, office]);
        setSelectedOffice(office);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteOffice(id: number){
    setSubmitting(true);
    agent.Offices.delete(id).then(() => {
      setOffices([...offices.filter(x => x.id !== id)]);
      setSubmitting(false);
    })

    
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
          submitting={submitting}
        />
      </Container> 
    </>
  );
}

export default App;

import React, { useEffect } from 'react';
import { Office } from './models/office';
import OfficeDashboard from './components/OfficeDashboard';
import NavBar from './components/NavBar';
import LoadingComponent from './components/LoadingComponent';
import { AddOfficeDTO } from './models/officeDTOs/addOfficeDTO';
import { UpdateOfficeDTO } from './models/officeDTOs/updateOfficeDTO';
import { useStore } from './stores/store';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';

function App() {
  const {officeStore} = useStore();

  useEffect(() => {
    officeStore.loadOffices();
  }, [officeStore])

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

  if (officeStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <OfficeDashboard />
      </Container> 
    </>
  );
}

export default observer(App);

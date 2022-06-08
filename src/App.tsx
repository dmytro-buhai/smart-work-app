import OfficeDashboard from './components/OfficeDashboard';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import { Route, useLocation } from 'react-router-dom';
import HomePage from './home/HomePage';
import OfficeForm from './forms/OfficeForm';
import OfficeDetails from './components/OfficeDetails';

function App() {
  const loaction = useLocation();

  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route 
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
              <Route exact path='/offices' component={OfficeDashboard} />
              <Route path='/offices/:id' component={OfficeDetails} />
              <Route key={loaction.key} path={['/addOffice', '/manage/:id']} component={OfficeForm} />
            </Container> 
          </>
        )}
      />
    </>
  );
}

export default observer(App);

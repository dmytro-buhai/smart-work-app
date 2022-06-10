import OfficeDashboard from './components/OfficeDashboard';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './home/HomePage';
import OfficeForm from './forms/OfficeForm';
import OfficeDetails from './components/OfficeDetails';
import NotFound from './components/NotFound';
import { ToastContainer } from 'react-toastify';


function App() {
  const loaction = useLocation();

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar/>
      <Route exact path='/' component={HomePage} />
      <Route 
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{paddingTop: '7em'}}>
              <Switch>
                <Route exact path='/offices' component={OfficeDashboard} />
                <Route path='/offices/:id' component={OfficeDetails} />
                <Route key={loaction.key} path={['/addOffice', '/manage/:id']} component={OfficeForm} />
                <Route component={NotFound} />
              </Switch>
            </Container> 
          </>
        )}
      />
    </>
  );
}

export default observer(App);

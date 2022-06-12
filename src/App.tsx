import OfficeDashboard from './components/OfficeDashboard';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './home/HomePage';
import OfficeForm from './forms/OfficeForm';
import OfficeDetails from './components/OfficeDetails';
import NotFound from './components/errors/NotFound';
import { ToastContainer } from 'react-toastify';
import LoginForm from './components/users/LoginForm';
import { useStore } from './stores/store';
import { useEffect } from 'react';
import LoadingComponent from './components/LoadingComponent';
import ModalContainer from './modals/ModalContainer';
import ServerError from './components/errors/ServerError';
import ProfilePage from './components/users/ProfilePage';

function App() {
  const loaction = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setApploaded());
    } else {
      commonStore.setApploaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar/>
      <ModalContainer />
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
                <Route path='/profile/:username' component={ProfilePage} />
                <Route path='/login' component={LoginForm} />
                <Route path='/server-error' component={ServerError} />
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

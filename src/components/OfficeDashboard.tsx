import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import '../styles/officeDashboard.css';
import LoadingComponent from './LoadingComponent';
import OfficeList from './OfficeList';

export default observer(function OfficeDashboard(){
    const {officeStore} = useStore();
    const {loadOffices, officeRegistry, isAddedNewOffice, setIsAddedNewOffice} = officeStore;

    useEffect(() => {
        if(officeRegistry.size <= 1 || isAddedNewOffice){
            loadOffices();
            setIsAddedNewOffice(false)
        }
    }, [officeRegistry.size, isAddedNewOffice, setIsAddedNewOffice, loadOffices])

    if (officeStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return(
        <Grid>
            <Grid.Column width='10'>
                <OfficeList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Office filters</h2>
            </Grid.Column>
        </Grid>
    )
})
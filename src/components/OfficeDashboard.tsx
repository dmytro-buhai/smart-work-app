import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import OfficeForm from '../forms/OfficeForm';
import { useStore } from '../stores/store';
import '../styles/officeDashboard.css';
import OfficeDetails from './OfficeDetails';
import OfficeList from './OfficeList';

export default observer(function OfficeDashboard(){

    const {officeStore} = useStore();
    const {selectedOffice, editMode} = officeStore;

    return(
        <Grid>
            <Grid.Column width='10'>
                <OfficeList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedOffice && !editMode &&
                <OfficeDetails />}
                {editMode &&
                <OfficeForm />}
            </Grid.Column>
        </Grid>
    )
})
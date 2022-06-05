import { Grid, GridColumn, List } from 'semantic-ui-react';
import OfficeForm from '../forms/OfficeForm';
import { Office } from '../models/office';
import '../styles/officeDashboard.css';
import OfficeDetails from './OfficeDetails';
import OfficeList from './OfficeList';

interface Props {
    offices: Office[];
    selectedOffice: Office | undefined;
    selectOffice: (id: number) => void;
    cancelSelectOffice: () => void;
}

export default function OfficeDashboard({offices, selectedOffice, 
        selectOffice, cancelSelectOffice}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <OfficeList offices={offices} selectOffice={selectOffice}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedOffice && 
                <OfficeDetails office={selectedOffice} cancelSelectOffice={cancelSelectOffice}/>}
                <OfficeForm />
            </Grid.Column>
        </Grid>
    )
}
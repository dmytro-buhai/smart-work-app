import { Grid, GridColumn, List } from 'semantic-ui-react';
import { Office } from '../models/office';
import '../styles/officeDashboard.css';
import OfficeDetails from './OfficeDetails';
import OfficeList from './OfficeList';

interface Props {
    offices: Office[];
}

export default function OfficeDashboard({offices}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <OfficeList offices={offices}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {offices[0] && 
                <OfficeDetails office={offices[0]}/>}
            </Grid.Column>
        </Grid>
    )
}
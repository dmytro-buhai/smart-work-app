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
    editMode: boolean;
    openForm: (id: number) => void;
    closeForm: () => void;
}

export default function OfficeDashboard({offices, selectedOffice, 
        selectOffice, cancelSelectOffice, editMode, openForm, closeForm}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <OfficeList offices={offices} selectOffice={selectOffice}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedOffice && !editMode &&
                <OfficeDetails 
                    office={selectedOffice} 
                    cancelSelectOffice={cancelSelectOffice}
                    openForm={openForm}
                />}
                {editMode &&
                <OfficeForm closeForm={closeForm} office={selectedOffice}/>}
            </Grid.Column>
        </Grid>
    )
}
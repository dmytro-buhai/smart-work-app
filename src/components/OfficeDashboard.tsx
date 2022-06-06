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
    createOrEdit: (office: Office) => void;
    deleteOffice: (id: number) => void;
    submitting: boolean;
}

export default function OfficeDashboard({offices, selectedOffice, deleteOffice,
        selectOffice, cancelSelectOffice, editMode, openForm, 
        closeForm, createOrEdit, submitting}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <OfficeList offices={offices} 
                    selectOffice={selectOffice}
                    deleteOffice={deleteOffice}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedOffice && !editMode &&
                <OfficeDetails 
                    office={selectedOffice} 
                    cancelSelectOffice={cancelSelectOffice}
                    openForm={openForm}
                />}
                {editMode &&
                <OfficeForm 
                    closeForm={closeForm} 
                    office={selectedOffice} 
                    createOrEdit={createOrEdit}
                    submitting={submitting}
                />}
            </Grid.Column>
        </Grid>
    )
}
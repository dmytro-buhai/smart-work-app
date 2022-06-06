import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Office } from '../models/office';
import '../styles/officeList.css';

interface Props {
    offices: Office[];
    selectOffice: (id: number) => void;
    deleteOffice: (id: number) => void;
}

function OfficeList({offices, selectOffice, deleteOffice}: Props){
    return(
        <Segment>
            <Item.Group divided>
                {offices.map((office: Office) => (
                    <Item key={office.id}>
                        <Item.Content>
                            <Item.Header as='a'>{office.name}</Item.Header>
                            <Item.Meta>{office.address}</Item.Meta>
                            <Item.Description>
                                <div>{office.phoneNumber}</div>
                                <div>{office.companyId}, {office.isFavourite}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectOffice(office.id)} floated='right' content='View' color='blue' />
                                <Button onClick={() => deleteOffice(office.id)} floated='right' content='Delete' color='red' />
                                <Label basic content={office.isFavourite.toString()} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>      
    )
}

export default OfficeList;
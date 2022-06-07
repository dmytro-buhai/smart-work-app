import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { Office } from '../models/office';
import { useStore } from '../stores/store';
import '../styles/officeList.css';

export default observer(function OfficeList(){
    const {officeStore} = useStore();
    const {deleteOffice, officesById, loading} = officeStore;

    const[target, setTarget] = useState(0);

    function handleOfficeDelete(e: SyntheticEvent<HTMLButtonElement>, id: number){
        setTarget(+e.currentTarget.name);
        deleteOffice(id);
    }

    return(
        <Segment>
            <Item.Group divided>
                {officesById.map((office: Office) => (
                    <Item key={office.id}>
                        <Item.Content>
                            <Item.Header as='a'>{office.name}</Item.Header>
                            <Item.Meta>{office.address}</Item.Meta>
                            <Item.Description>
                                <div>{office.phoneNumber}</div>
                                <div>{office.companyId}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => officeStore.selectOffice(office.id)} floated='right' content='View' color='blue' />
                                <Button
                                    name={office.id}
                                    loading={loading && target === office.id}
                                    onClick={(e) => handleOfficeDelete(e, office.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                                {office.isFavourite && 
                                    <Button type="button" color='yellow' content='⭐' />
                                }
                                {!office.isFavourite && 
                                    <Button type="button" content='⭐' />
                                }
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>      
    )
})
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Office } from "../models/office";
import { useStore } from "../stores/store";

interface Props {
    office: Office
}

export default function OfficeListItem({office}: Props){
    const {officeStore} = useStore();
    const{userStore: {checkHostName, checkAdminName}} = useStore()
    const {deleteOffice, loading, updateOfficeIsFavoriteProp} = officeStore;
    const [isFavouriteState, setFavouriteState] = useState(office.isFavourite);

    const[target, setTarget] = useState(0);

    function handleOfficeDelete(e: SyntheticEvent<HTMLButtonElement>, id: number){
        setTarget(+e.currentTarget.name);
        deleteOffice(id);
    }
    
    return (  
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="medium" bordered src={`/assets/${office.photoFileName}.jpg`}/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/offices/${office.id}`}>
                                {office.name}
                            </Item.Header>
                            <Item.Description>
                                <Icon name="phone volume" /> {office.phoneNumber}
                                <br/>
                                <Icon name="briefcase" /> Rooms amount: {office.rooms.length}
                                <br/>                                
                                <Label as={Link} to='#' basic content={office.company.name}/>
                                <br/> 
                                <br/> 
                                <div>Company description: <br/> {office.company.description}</div>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="address card outline" /> {office.address}
                </span>
            </Segment>
            <Segment>
                {checkAdminName() ? (
                        <span>
                            {isFavouriteState ? (
                                <Button onClick={() => {
                                        updateOfficeIsFavoriteProp(office.id, false);
                                        setFavouriteState(false);
                                    }} 
                                    color='yellow' 
                                    content='⭐' 
                                />
                            ) : (
                                <Button onClick={() => {
                                        updateOfficeIsFavoriteProp(office.id, true)
                                        setFavouriteState(true);
                                    }}  
                                    content='⭐' 
                                />
                            )}
                        </span>
                    )   :   (
                        <span>
                            {isFavouriteState ? (
                                <Button color='yellow' content='⭐' />
                            ) : (
                                <Button content='⭐' />
                            )}
                        </span>
                    )
                }
                
                <Button as={Link} to={`/offices/${office.id}`}  floated='right' content='View' color='blue' />
                {checkHostName(office.host) && 
                    <Button
                        name={office.id}
                        loading={loading && target === office.id}
                        onClick={(e) => handleOfficeDelete(e, office.id)} 
                        floated='right' 
                        content='Delete' 
                        color='red' 
                    />
                }
                
            </Segment>
        </Segment.Group> 
    )
}
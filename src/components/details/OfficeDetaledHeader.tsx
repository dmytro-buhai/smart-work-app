import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"
import { Segment, Image, Item, Header, Label, Button } from "semantic-ui-react"
import OfficeForm from "../../forms/OfficeForm"
import RoomForm from "../../forms/RoomForm"
import { Office } from "../../models/office"
import { useStore } from "../../stores/store"

const officeImageStyle = {
    filter: 'brightness(30%)'
}

const officeImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    wifth: '100%',
    heigth: 'auto',
    color: 'white'
}

interface Props{
    office: Office
}

export default observer(function OfficeDetaledHeader({office}: Props) {
    const{userStore: {checkHostName}, modalStore} = useStore();

    return(
        <Segment.Group>
            <Segment basic attached='top' style={{padding: 0}}>
                <Image src={`/assets/${office.photoFileName}.jpg`} fluid style={officeImageStyle} />
                <Segment style={officeImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size="huge"
                                    content={office.name}
                                    style={{color: 'white'}}
                                />
                                <br/> 
                                <br/> 
                                <Label as={Link} to='#' basic content={office.company.name}/>
                                <br/> 
                                <br/> 
                                <div>{office.company.description}</div>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {checkHostName(office.host) &&
                    <>
                        <Button 
                            onClick={() => modalStore
                                .openModal(<OfficeForm officeId={office.id} companyId={office.companyId}/>)} 
                            color='orange' 
                            floated='right'
                            content='Manage Office'
                        />
                        <Button 
                            onClick={() => modalStore.openModal(<RoomForm officeId={office.id}/>)}
                            positive
                            content='Add room'
                        />
    
                    </> 
                }
                
            </Segment>
        </Segment.Group>
    )
})
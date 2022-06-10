import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"
import { Segment, Image, Item, Header, Label, Button } from "semantic-ui-react"
import { Office } from "../../models/office"

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
                <Button as={Link} to={`/manage/${office.id}`} color='orange' floated='right'>
                    Manage Office
                </Button>
            </Segment>
        </Segment.Group>
    )
})
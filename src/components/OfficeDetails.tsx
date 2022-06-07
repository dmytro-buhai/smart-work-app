import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";

export default function OfficeDetails(){
    const {officeStore} = useStore();
    const {selectedOffice: office, openForm, cancelSelectedOffice} = officeStore;

    if(!office) return <LoadingComponent/>;

    return(
        <Card fluid>
            <Image src={`/assets/${office.photoFileName}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{office.name}</Card.Header>
                <Card.Meta>
                    <span className="address">{office.address}</span>
                </Card.Meta>
                <Card.Description>
                    {office.phoneNumber}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(office.id)} basic color="blue" content='Edit' />
                    <Button onClick={cancelSelectedOffice} basic color="grey" content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}
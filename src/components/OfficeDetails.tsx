import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";

export default observer(function OfficeDetails(){
    const {officeStore} = useStore();
    const {selectedOffice: office, loadOffice, loadingInitial} = officeStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id){
            loadOffice(+id);
        }
    }, [id, loadOffice]);

    if(loadingInitial || !office) return <LoadingComponent/>

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
                    <Button as={Link} to={`/manage/${office.id}`} basic color="blue" content='Edit' />
                    <Button as={Link} to='/offices' basic color="grey" content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})
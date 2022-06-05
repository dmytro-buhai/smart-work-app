import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Office } from "../models/office";

interface Props{
    office: Office;
    cancelSelectOffice: () => void;
}

export default function OfficeDetails({office, cancelSelectOffice}: Props){
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
                    <Button basic color="blue" content='Edit' />
                    <Button onClick={cancelSelectOffice} basic color="grey" content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}
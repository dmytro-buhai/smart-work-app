import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Office } from "../models/office";

interface Props{
    office: Office | undefined;
    closeForm: () => void;
    createOrEdit: (office: Office) => void;
}

export default function OfficeForm({office : selectedOffice, closeForm, createOrEdit}: Props){

    const initialState = selectedOffice ?? {
        id: 0,
        companyId: 0,
        name: '',
        address: '',
        phoneNumber: '',
        isFavourite: false,
        photoFileName: 'default_office_photo_file_name',
        subscribes: [],
        rooms: []
    }

    const[office, setOffice] = useState(initialState);

    function handleSubmit() {
        createOrEdit(office);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setOffice({...office, [name]: value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoCpmplete='off'>
                <Form.Input placeholder='Name' value={office.name} name='name' onChange={handleInputChange} />
                <Form.Input placeholder='Address' value={office.address} name='address' onChange={handleInputChange} />
                <Form.Input type="tel" placeholder='PhoneNumber' value={office.phoneNumber} name='phoneNumber' onChange={handleInputChange} />
                <Form.Input type="number" placeholder='CompanyId' value={office.companyId} name='companyId' onChange={handleInputChange} />
                <Button floated="right" positive type="submit" content='Submit' />
                <Button onClick={closeForm} floated="right" type="button" content='Cancel' />
            </Form>
        </Segment>
    )
}
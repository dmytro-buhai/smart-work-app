import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Office } from "../models/office";

interface Props{
    office: Office | undefined;
    closeForm: () => void;
}

export default function OfficeForm({office, closeForm}: Props){
    return(
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Name'/>
                <Form.Input placeholder='Address'/>
                <Form.Input placeholder='PhoneNumber'/>
                <Form.Input placeholder='CompanyId'/>
                <Button floated="right" positive type="submit" content='Submit' />
                <Button onClick={closeForm} floated="right" type="button" content='Cancel' />
            </Form>
        </Segment>
    )
}
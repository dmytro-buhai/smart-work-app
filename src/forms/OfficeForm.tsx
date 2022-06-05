import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function OfficeForm(){
    return(
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Name'/>
                <Form.Input placeholder='Address'/>
                <Form.Input placeholder='PhoneNumber'/>
                <Form.Input placeholder='CompanyId'/>
                <Button floated="right" positive type="submit" content='Submit' />
                <Button floated="right" type="button" content='Cancel' />
            </Form>
        </Segment>
    )
}
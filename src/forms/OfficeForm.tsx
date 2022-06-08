import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from '../components/LoadingComponent';
import { useStore } from "../stores/store";

export default observer(function OfficeForm(){
    const history = useHistory();
    const {officeStore} = useStore();
    const {createOffice, updateOffice, 
        loading, loadOffice, loadingInitial, setIsAddedNewOffice} = officeStore;
    const {id} = useParams<{id: string}>();

    const[office, setOffice] = useState({
        id: 0,
        companyId: 0,
        name: '',
        address: '',
        phoneNumber: '',
        isFavourite: false,
        photoFileName: 'default_office_photo_file_name',
        rooms: [],
        company: {
            id: 0,
            name: '',
            address: '',
            phoneNumber: '',
            description: '',
            photoFileName: 'default_company_photo_file_name',
        }
    });

    useEffect(() => {
        if (id) {
            loadOffice(+id).then(office => setOffice(office!))
        }
    }, [id, loadOffice]);

    function handleSubmit() {
        if(office.id === 0){
            // ADD office.Company PROPERTY!!!
            createOffice(office).then((officeId) => {setIsAddedNewOffice(true); history.push(`offices/${officeId}`)});
        } else {
            updateOffice(office).then(() => { history.goBack(); history.push(`offices/${office.id}`) });
        }      
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setOffice({...office, [name]: value})
    }

    if(loadingInitial) return <LoadingComponent content='Loading office...' />

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={office.name} name='name' onChange={handleInputChange} />
                <Form.Input placeholder='Address' value={office.address} name='address' onChange={handleInputChange} />
                <Form.Input type="tel" placeholder='PhoneNumber' value={office.phoneNumber} name='phoneNumber' onChange={handleInputChange} />
                <Form.Input type="number" placeholder='CompanyId' value={office.companyId} name='companyId' onChange={handleInputChange} />
                <Button loading={loading} floated="right" positive type="submit" content='Submit' />
                <Button as={Link} to='/offices' floated="right" type="button" content='Cancel' />
            </Form>
        </Segment>
    )
})
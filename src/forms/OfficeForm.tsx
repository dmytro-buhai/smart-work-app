import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import * as Yup from 'yup';
import MyTextInput from './MyTextInput';
import { Office } from '../models/office';

interface Props{
    officeId?: number;
    companyId: number;
}

export default observer(function OfficeForm({officeId, companyId}: Props){
    const history = useHistory();
    const {officeStore, modalStore, userStore: {user}} = useStore();
    const {createOffice, updateOffice, 
        loading, loadOffice,  setIsAddedNewOffice} = officeStore;

    const[office, setOffice] = useState({
        id: 0,
        companyId: companyId,
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
            host: ''
        },
        host: ''
    });

    const validationSchema = Yup.object({
        name: Yup.string()
                .required('The office name is required'),
        address: Yup.string().required('The office address is required')
                .matches(/^[A-Za-z0-9]+(?:\s[A-Za-z0-9',/_-]+)+$/g,
                "Please, specify a valid address, for example, Correct address, 54 or Correct address, 54/2"),
        phoneNumber: Yup.string()
                .required('The office phone number is required')
                .matches(/^0\d{9}$/g, 
                "Please, specify a valid phone number that starts from 0, for example 0661234567"),
    })

    useEffect(() => {
        if (officeId) {
            loadOffice(officeId).then(office => setOffice(office!));
        }
    }, [officeId, loadOffice, setOffice]);

    function handleFormSubmit(office: Office) {
        if(office.id === 0){
            office.host = user!.username;
            createOffice(office).then((officeId) => {setIsAddedNewOffice(true); history.push(`/offices/${officeId}`)});
        } else {
            updateOffice(office);
        }      
    }

    return(
        <Segment clearing>
            <Header content='Office details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={office} 
                onSubmit={values => handleFormSubmit(values)}>            
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='id' placeholder='Id' hidden={true}/>
                        <MyTextInput name='name' placeholder='Name'/>
                        <MyTextInput name='address' placeholder='Address' />
                        <MyTextInput name='phoneNumber' type="tel" placeholder='PhoneNumber' />
                       
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated="right" 
                            positive type="submit" content='Submit' />
                        <Button onClick={() => modalStore.closeModal()} floated="right" type="button" content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})
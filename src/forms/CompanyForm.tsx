import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Header, Segment } from "semantic-ui-react";
import LoadingComponent from '../components/LoadingComponent';
import { useStore } from "../stores/store";
import * as Yup from 'yup';
import MyTextInput from './MyTextInput';
import { Company } from '../models/company';

export default observer(function CompanyForm(){
    const history = useHistory();
    const {companyStore} = useStore();
    const {createCompany, updateCompany, 
        loading, loadCompany, loadingInitial, setIsAddedNewCompany} = companyStore;
    const {id} = useParams<{id: string}>();

    const[company, setCompany] = useState({
        id: 0,
        name: '',
        address: '',
        phoneNumber: '',
        description: '',
        photoFileName: 'default_company_photo_file_name',
    });

    const validationSchema = Yup.object({
        name: Yup.string()
                .required('The company name is required'),
        address: Yup.string().required('The company address is required')
                .matches(/^[A-Za-z0-9]+(?:\s[A-Za-z0-9',/_-]+)+$/g,
                "Please, specify a valid address, for example, Correct address, 54 or Correct address, 54/2"),
        phoneNumber: Yup.string()
                .required('The company phone number is required')
                .matches(/^0\d{9}$/g, 
                "Please, specify a valid phone number that starts from 0, for example 0661234567"),
        description: Yup.string().required('The company description is required'),
    })

    useEffect(() => {
        if (id) {
            loadCompany(+id).then(company => setCompany(company!));
        }
    }, [id, loadCompany]);

    function handleFormSubmit(company: Company) {
        if(company.id === 0){
            createCompany(company).then(() => {setIsAddedNewCompany(true); history.push('/companies')});
        } else {
            updateCompany(company).then(() => { history.push(`/companies/${company.id}`) });
        }      
    }

    if(loadingInitial) return <LoadingComponent content='Loading company...' />

    return(
        <Segment clearing>
            <Header content='Company details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={company} 
                onSubmit={values => handleFormSubmit(values)}>            
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='id' placeholder='Id' hidden={true}/>
                        <MyTextInput name='name' placeholder='Name'/>
                        <MyTextInput name='description' placeholder='Description' />
                        <MyTextInput name='address' placeholder='Address' />
                        <MyTextInput name='phoneNumber' type="tel" placeholder='PhoneNumber' />
                       
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated="right" 
                            positive type="submit" content='Submit' />
                        <Button as={Link} to='/companies' floated="right" type="button" content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})
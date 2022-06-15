import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import * as Yup from 'yup';
import MyTextInput from './MyTextInput';
import { User } from '../models/user';

export default observer(function UserForm(){
    const { userStore, modalStore } = useStore();
    const {user, update, loading } = userStore;

    const currentUser = {
        username: user!.username,
        email: user!.email,
        displayName: user!.displayName,
        phoneNumber: user!.phoneNumber,
        token: user!.token
    };

    const validationSchema = Yup.object({
        email: Yup.string().required().email(),
        displayName: Yup.string().required('Display name is required'),
        phoneNumber: Yup.string()
                .required('The phone number is required')
                .matches(/^0\d{9}$/g, 
                "Please, specify a valid phone number that starts from 0, for example 0661234567")
    })


    function handleFormSubmit(user: User) {
        update(user);
    }

    return(
        <Segment clearing>
            <Header content='Room details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={currentUser} 
                onSubmit={values => handleFormSubmit(values)}>            
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='username' placeholder='Username' hidden={true}/>
                        <MyTextInput label='Email' name='email' placeholder='Email' type='email'/>
                        <MyTextInput label='Display name' name='displayName' placeholder='Display name' />
                        <MyTextInput label='Phone number' name='phoneNumber' placeholder='Phone number' type='tel' />
                       
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
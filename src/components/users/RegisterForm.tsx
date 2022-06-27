import { ErrorMessage, Formik } from "formik"
import { observer } from "mobx-react-lite"
import { Button, Form, Header } from "semantic-ui-react"
import MyTextInput from "../../forms/MyTextInput"
import { useStore } from "../../stores/store"
import * as Yup from 'yup'
import ValidationErrors from "../errors/ValidationErrors"
import { useTranslation } from 'react-i18next';

export default observer(function RegisterForm() {
    const { t } = useTranslation();
    const {userStore} = useStore();

    return (
        <Formik 
            initialValues={{displayName: '', username: '', email:'', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => 
                setErrors({error}))}
            validationSchema={Yup.object({
                email: Yup.string().required().email(),
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                phoneNumber: Yup.string().required()
                    .matches(/^0\d{9}$/g, 'Please, specify a valid phone number that starts from 0, for example 0661234567.'),
                password: Yup.string().required()
                    .matches(/[0-9]+/g, 'Password should contain at least one numeric value.')
                    .matches(/[A-Z]+/g, 'Password should contain at least one upper case letter.')
                    .matches(/.{8,16}/g, 'Password should not be lesser than 8 or greater than 16 characters.')
                    .matches(/[a-z]+/g, 'Password should contain at least one lower case letter.')
                    .matches(/[!@#$%^&*()_+=\[{\]};:<>|./?,-]/g, 'Password should contain at least one special case character.'),
                passwordConfirm: Yup.string().required()
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content={t('register')} color='teal' textAlign='center' />
                    <MyTextInput name='email' placeholder='Email' type='email' />
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextInput name='username' placeholder='Username' />
                    <MyTextInput name='phoneNumber' placeholder='Phone number' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <MyTextInput name='passwordConfirm' placeholder='Confirm password' type='password' />
                    <ErrorMessage 
                        name='error' render={() => <ValidationErrors errors={errors.error}/>}
                    />
                    <Button      
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting}          
                        positive type="submit" 
                        content='Register'
                        fluid    
                    />
                </Form>
            )}
        </Formik>
    )
})
import { ErrorMessage, Formik } from "formik"
import { observer } from "mobx-react-lite"
import { Button, Form, Header, Label } from "semantic-ui-react"
import MyTextInput from "../../forms/MyTextInput"
import { useStore } from "../../stores/store"
import * as Yup from 'yup'

export default observer(function RegisterForm() {
    const {userStore} = useStore();

    return (
        <Formik 
            initialValues={{displayName: '', username: '', email:'', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => 
                setErrors({error: 'Invalid email or password'}))}
            validationSchema={Yup.object({
                email: Yup.string().required().email(),
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                password: Yup.string().required()
                    .matches(/[0-9]+/g, 'Password should contain at least one numeric value.')
                    .matches(/[A-Z]+/g, 'Password should contain at least one upper case letter.')
                    .matches(/.{8,16}/g, 'Password should not be lesser than 8 or greater than 16 characters.')
                    .matches(/[a-z]+/g, 'Password should contain at least one lower case letter.')
                    .matches(/[!@#$%^&*()_+=\[{\]};:<>|./?,-]/g, 'Password should contain at least one special case character.')
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to SwartWork' color='teal' textAlign='center' />
                    <MyTextInput name='email' placeholder='Email' type='email' />
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextInput name='username' placeholder='Username' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage 
                        name='error' render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>}
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
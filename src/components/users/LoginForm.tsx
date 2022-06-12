import { ErrorMessage, Formik } from "formik"
import { observer } from "mobx-react-lite"
import { Button, Form, Header, Label } from "semantic-ui-react"
import MyTextInput from "../../forms/MyTextInput"
import { useStore } from "../../stores/store"

export default observer(function LoginForm() {
    const {userStore} = useStore();

    return (
        <Formik 
            initialValues={{email:'', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
                setErrors({error: 'Invalid email or password'}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to SwartWork' color='teal' textAlign='center' />
                    <MyTextInput name='email' placeholder='Email' type='email' />
                    <Label basic content='admin@sw.com' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <Label basic content='_Aa123456' />
                    <ErrorMessage 
                        name='error' render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>}
                    />
                    <Button      
                        loading={isSubmitting}          
                        positive type="submit" 
                        content='Login'
                        fluid    
                    />
                </Form>
            )}
        </Formik>
    )
})
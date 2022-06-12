import { ErrorMessage, Formik } from "formik";
import { Button, Form, Header, Input, Item, Label, Segment } from "semantic-ui-react";
import MyTextInput from "../../forms/MyTextInput";
import { Room } from "../../models/room";
import { useStore } from "../../stores/store";
import ValidationErrors from "../errors/ValidationErrors";
import Calendar from 'react-calendar'
import "../../styles/calendar.css"
import { useState } from "react";

interface Props {
    room: Room
}

export default function SubscribeDetailsFrom({room}: Props) {
    const {subscribeStore} = useStore();
    const [selectedDates, setDates] = useState<Date[]>();

    return (
        <Formik 
            initialValues={{error: null}}
            onSubmit={(_values, {setErrors}) => subscribeStore.selectSubscribe(room.id, selectedDates!).catch(error => 
                setErrors({error}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <>
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                        <Header as='h2' content={`Select Subsribe plan for ${room.name}`} color='teal' textAlign='center' />
                        <Calendar selectRange={true} onChange={(dates: Date[]) => setDates(dates)}
                        />
                        <br/>
                        <Button styles={{marginTop: '5px'}}     
                            loading={isSubmitting}          
                            positive type="submit" 
                            content='Select subscribe'
                            fluid    
                        />
                        <ErrorMessage 
                            name='error' render={() => <ValidationErrors errors={errors.error}/>}
                        />
                    </Form>
                    
                </>
                
            )}
        </Formik>
    )
}
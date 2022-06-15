import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import * as Yup from 'yup';
import MyTextInput from './MyTextInput';
import { Room } from '../models/room';

interface Props{
    roomId?: number;
    officeId: number;
}

export default observer(function RoomForm({roomId, officeId}: Props){
    const {roomStore, modalStore, userStore: {user} } = useStore();
    const {loadRoom, createRoom, updateRoom, 
        loading } = roomStore;

    const[room, setRoom] = useState<Room>({
        id: 0,
        officeId: officeId,
        name: '',
        number: '',
        square: 0,
        amountOfWorkplaces: 0,
        photoFileName: 'default_room_photo_file_name',
        host: '',
        subscribeForDay: 0,
        subscribeForWeek: 0,
        subscribeForMonth: 0,
        subscribeDetails: []
    });

    const validationSchema = Yup.object({
        name: Yup.string()
                .required('The room name is required'),
        number: Yup.string().required('The room number is required')
                .matches(/^\w+$/g,
                "Please, specify a valid room number, for example, 1a"),
        square: Yup.string()
                .required('The room square is required')
                .matches(/^[1-9][0-9]*$/g, 'min square size is greater than 0'),
        amountOfWorkplaces: Yup.string()
                .required('The room amount of workplaces is required')
                .matches(/^[1-9][0-9]*$/g, 'min amount of workplaces is greater than 0'),
        subscribeForDay: Yup.string()
                .required('The room subscribe for a day is required')
                .matches(/^[1-9][0-9]*$/g, 'subscribe price must be greater than 0'),
        subscribeForWeek: Yup.string()
                .required('The room subscribe for a week is required')
                .matches(/^[1-9][0-9]*$/g, 'subscribe price must be greater than 0'),
        subscribeForMonth: Yup.string()
                .required('The room subscribe for a month is required')
                .matches(/^[1-9][0-9]*$/g, 'subscribe price must be greater than 0'),
    })

    useEffect(() => {
        if (roomId) {
            loadRoom(roomId).then(room => setRoom(room!));
        }
    }, [roomId, loadRoom, setRoom]);

    function handleFormSubmit(room: Room) {
        console.log(room);
        
        if(room.id === 0){
            room.host = user!.username;
            createRoom(room);
        } else {
            updateRoom(room);
        }   
    }

    return(
        <Segment clearing>
            <Header content='Room details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={room} 
                onSubmit={values => handleFormSubmit(values)}>            
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='id' placeholder='Id' hidden={true}/>
                        <MyTextInput label='Room name' name='name' placeholder='Name'/>
                        <MyTextInput label='Room number' name='number' placeholder='Number' />
                        <MyTextInput label='Square'  name='square' placeholder='Square' />
                        <MyTextInput label='Amount of workplaces' 
                            name='amountOfWorkplaces' placeholder='Amount of workplaces' />
                        <MyTextInput label='Subscribe price for a day' 
                            name='subscribeForDay' placeholder='Subscribe price for a day' />
                        <MyTextInput label='Subscribe price for a week' 
                            name='subscribeForWeek' placeholder='Subscribe price for a week' />
                        <MyTextInput label='Subscribe price for a month' 
                            name='subscribeForMonth' placeholder='Subscribe price for a month' />
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
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

    const[room, setRoom] = useState({
        id: 0,
        officeId: officeId,
        name: '',
        number: '',
        square: 0,
        amountOfWorkplaces: 0,
        photoFileName: 'default_room_photo_file_name',
        host: ''
    });

    const validationSchema = Yup.object({
        name: Yup.string()
                .required('The room name is required'),
        number: Yup.string().required('The room number is required')
                .matches(/^\w+$/g,
                "Please, specify a valid room number, for example, 1a"),
        square: Yup.number()
                .required('The room square is required')
                .min(0, 'min square size is 0'),
        amountOfWorkplaces: Yup.number()
                .required('The room amount of workplaces is required')
                .min(0, 'min amount of workplaces is 0'),
    })

    useEffect(() => {
        if (roomId) {
            loadRoom(roomId).then(room => setRoom(room!));
        }
    }, [roomId, loadRoom, setRoom]);

    function handleFormSubmit(room: Room) {
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
                        <MyTextInput name='name' placeholder='Name'/>
                        <MyTextInput name='number' placeholder='Number' />
                        <MyTextInput name='square' placeholder='Square' type='number' />
                        <MyTextInput name='amountOfWorkplaces' placeholder='Amount of workplaces' type='number' />
                       
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
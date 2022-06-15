import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Icon, Item, Segment } from "semantic-ui-react";
import RoomForm from "../forms/RoomForm";
import { Room } from "../models/room";
import { SubscribeDetail } from "../models/SubscribeDetail";
import { useStore } from "../stores/store";
import OfficeDetaledSidebar from "./details/OfficeDetaledSidebar";
import SubscribeDetailsFrom from "./details/SubscribeDetailsFrom";
import LoginForm from "./users/LoginForm";
import { useTranslation } from 'react-i18next';

interface Props {
    room: Room
    subscribeDetailsForDay: SubscribeDetail | undefined
    subscribeDetailsForWeek: SubscribeDetail | undefined
    subscribeDetailsForMonth: SubscribeDetail | undefined
}

export default observer(function RoomListItem({room,
    subscribeDetailsForDay, subscribeDetailsForWeek, subscribeDetailsForMonth}: Props){
        
    const { t } = useTranslation();
    const {subscribeStore} = useStore();
    const {userStore: {checkHostName, isLoggedIn}, modalStore, roomStore: {loading, deleteRoom}} = useStore();
    const {statisticStore} = useStore();
    
    const {loadStatisticsForRoom, currentSelectedStatistic, selectedRoomId, setSelectedRoomId} = statisticStore;
    const {getSubscribeDetailsForRoom} = subscribeStore;

    const[target, setTarget] = useState(0);

    function handleSubscribe() {
        room.subscribeDetails = getSubscribeDetailsForRoom(room.id);
        modalStore.openModal(<SubscribeDetailsFrom room={room}/>);
    }

    function handleRoomViewStatistic(event: React.MouseEvent<HTMLButtonElement>, id: number){
        const button: HTMLButtonElement = event.currentTarget;
        console.log(button);
        loadStatisticsForRoom(id);
    }

    function handleRoomDelete(e: SyntheticEvent<HTMLButtonElement>, id: number){
        setTarget(+e.currentTarget.name);
        deleteRoom(id);
    }

    function handleClose(){
        setSelectedRoomId(undefined);
    }

    return (  
        <Grid>
            <Grid.Column width={10}>
                <Segment.Group>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image size='medium' bordered src={`/assets/${room.photoFileName}.jpg`}/>
                                <Item.Content>
                                    <Item.Header as={Link} to={`/offices/${room.officeId}`}>
                                        {room.name}
                                    </Item.Header>
                                    <Item.Description>
                                        <Icon name="chart pie" color='yellow' /> {t('room.workplaces')}: {room.amountOfWorkplaces}
                                        <br/>
                                        <Icon name="expand" color='orange' /> {t('room.square')}: {room.square}
                                        <br/>
                                        <Icon name='money' color='green' /> {t('subscribe.day')}: {subscribeDetailsForDay?.price}
                                        <br/>
                                        <Icon name='money' color='green' /> {t('subscribe.week')}: {subscribeDetailsForWeek?.price}
                                        <br/>
                                        <Icon name='money' color='green' /> {t('subscribe.month')}: {subscribeDetailsForMonth?.price}
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                    <Segment>
                        <span>
                            {t('room.number')}: {room.number}
                        </span>
                    </Segment>
                    {!checkHostName(room.host) ?
                        (
                            <Segment clearing>
                                {isLoggedIn ? (
                                    <Button 
                                        color='teal' 
                                        onClick={() =>  handleSubscribe()}
                                        content={t('button.subscribe')}
                                    />
                                ) : (
                                    <Button color='teal' onClick={() => modalStore.openModal(<LoginForm />)}>Subscribe</Button>
                                )}
                                <span>
                                    <Button
                                        key={room.id}
                                        name={room.id}
                                        onClick={(event) => handleRoomViewStatistic(event, room.id)} 
                                        floated='right' 
                                        content={t('button.viewStatistic')} 
                                        color='blue' 
                                    />
                                </span>
                            </Segment>
                        ) : (
                            <Segment clearing>
                                <Button 
                                    color='orange' 
                                    onClick={() => modalStore.openModal(<RoomForm roomId={room.id} officeId={room.officeId} />)}
                                    content={t('button.edit')}
                                />
                                <Button 
                                    name={room.id}
                                    loading={loading && target === room.id}
                                    onClick={(e) => handleRoomDelete(e, room.id)}
                                    content={t('button.delete')}
                                    color='red' 
                                />
                                <span>
                                    <Button
                                        key={room.id}
                                        name={room.id}
                                        onClick={(event) => handleRoomViewStatistic(event, room.id)} 
                                        floated='right' 
                                        content={t('button.viewStatistic')}
                                        color='blue' 
                                    />
                                </span>
                            </Segment>
                        )
                    }
                </Segment.Group> 
            </Grid.Column>
                <Grid.Column width={6}>
                    <OfficeDetaledSidebar key={room.id}
                        isCanBeShown={selectedRoomId !== undefined && selectedRoomId === room.id}
                        selectedStatistic={currentSelectedStatistic} 
                        handleClose={handleClose}
                    />
                </Grid.Column>
        </Grid>
    )
})
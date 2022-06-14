import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Icon, Item, Segment } from "semantic-ui-react";
import RoomForm from "../forms/RoomForm";
import { Room } from "../models/room";
import { SubscribeDetails } from "../models/subscribeDetails";
import { useStore } from "../stores/store";
import OfficeDetaledSidebar from "./details/OfficeDetaledSidebar";
import SubscribeDetailsFrom from "./details/SubscribeDetailsFrom";
import LoginForm from "./users/LoginForm";

interface Props {
    room: Room
    subscribeDetailsForDay: SubscribeDetails | undefined
    subscribeDetailsForWeek: SubscribeDetails | undefined
    subscribeDetailsForMonth: SubscribeDetails | undefined
}

export default observer(function RoomListItem({room,
    subscribeDetailsForDay, subscribeDetailsForWeek, subscribeDetailsForMonth}: Props){

    const {subscribeStore} = useStore();
    const {userStore: {checkHostName, isLoggedIn}, modalStore} = useStore()
    const {statisticStore} = useStore();
    
    const {loadStatisticsForRoom, currentSelectedStatistic, selectedRoomId, setSelectedRoomId} = statisticStore;
    const {getSubscribeDetailsForRoom} = subscribeStore;

    function handleSubscribe() {
        room.subscribeDetails = getSubscribeDetailsForRoom(room.id);
        modalStore.openModal(<SubscribeDetailsFrom room={room}/>);
    }

    function handleRoomViewStatistic(event: React.MouseEvent<HTMLButtonElement>, id: number){
        const button: HTMLButtonElement = event.currentTarget;
        console.log(button);
        loadStatisticsForRoom(id);
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
                                        <Icon name="chart pie" color='yellow' /> Workplaces: {room.amountOfWorkplaces}
                                        <br/>
                                        <Icon name="expand" color='orange' /> Square: {room.square}
                                        <br/>
                                        <Icon name='money' color='green' /> Subscribe for a day: {subscribeDetailsForDay?.price}
                                        <br/>
                                        <Icon name='money' color='green' /> Subscribe for a week: {subscribeDetailsForWeek?.price}
                                        <br/>
                                        <Icon name='money' color='green' /> Subscribe for a month: {subscribeDetailsForMonth?.price}
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                    <Segment>
                        <span>
                            Room number: {room.number}
                        </span>
                    </Segment>
                    {!checkHostName(room.host) ?
                        (
                            <Segment clearing>
                                {isLoggedIn ? (
                                    <Button 
                                        color='teal' 
                                        onClick={() =>  handleSubscribe()}
                                        content='Subscribe'
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
                                        content='View statistics' 
                                        color='blue' 
                                    />
                                </span>
                            </Segment>
                        ) : (
                            <Segment clearing>
                                <Button 
                                    color='orange' 
                                    onClick={() => modalStore.openModal(<RoomForm roomId={room.id} officeId={room.officeId} />)}
                                    content='Edit'
                                />
                                <span>
                                    <Button
                                        key={room.id}
                                        name={room.id}
                                        onClick={(event) => handleRoomViewStatistic(event, room.id)} 
                                        floated='right' 
                                        content='View statistics' 
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
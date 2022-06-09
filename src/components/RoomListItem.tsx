import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Office } from "../models/office";
import { Room } from "../models/room";
import { SubscribeDetails } from "../models/subscribeDetails";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";

interface Props {
    room: Room
    handleRoomSelect: (e: SyntheticEvent<HTMLButtonElement>, id: number) => void;
    subscribeDetailsForDay: SubscribeDetails | undefined
    subscribeDetailsForWeek: SubscribeDetails | undefined
    subscribeDetailsForMonth: SubscribeDetails | undefined
}

export default observer(function RoomListItem({room, handleRoomSelect, 
    subscribeDetailsForDay, subscribeDetailsForWeek, subscribeDetailsForMonth}: Props){

    return (  
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='medium' bordered src={`/assets/${room.photoFileName}.jpg`}/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/offices/${room.id}`}>
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
            <Segment clearing>
                <Button color='teal'>Subscribe</Button>
                <Button>Unsubscribe</Button>

                <Button
                    name={room.id}
                    onClick={(e) => handleRoomSelect(e, room.id)} 
                    floated='right' 
                    content='View statistics' 
                    color='blue' 
                />
               
            </Segment>
        </Segment.Group> 
    )
})
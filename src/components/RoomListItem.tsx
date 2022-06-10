import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Icon, Item, Segment } from "semantic-ui-react";
import { Room } from "../models/room";
import { SubscribeDetails } from "../models/subscribeDetails";
import { useStore } from "../stores/store";
import OfficeDetaledSidebar from "./details/OfficeDetaledSidebar";

interface Props {
    room: Room
    subscribeDetailsForDay: SubscribeDetails | undefined
    subscribeDetailsForWeek: SubscribeDetails | undefined
    subscribeDetailsForMonth: SubscribeDetails | undefined
}

export default observer(function RoomListItem({room,
    subscribeDetailsForDay, subscribeDetailsForWeek, subscribeDetailsForMonth}: Props){
    
    const {statisticStore} = useStore();
    const {loadStatisticsForRoom, loading, currentSelectedStatistic} = statisticStore;
    const [target, setTarget] = useState(0);

    function handleRoomViewStatistic(event: React.MouseEvent<HTMLButtonElement>, id: number){
        const button: HTMLButtonElement = event.currentTarget;
        setTarget(+button.name);
        loadStatisticsForRoom(id);
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
                        <span>
                            <Button
                                key={room.id}
                                name={room.id}
                                loading={loading && target === room.id}
                                onClick={(event) => handleRoomViewStatistic(event, room.id)} 
                                floated='right' 
                                content='View statistics' 
                                color='blue' 
                            />
                        </span>
                    </Segment>
                </Segment.Group> 
            </Grid.Column>
            <Grid.Column width={6}>
                <OfficeDetaledSidebar selectedStatistic={currentSelectedStatistic} />
            </Grid.Column>
        </Grid>
    )
})
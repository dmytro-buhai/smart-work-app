import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect } from "react";
import { Button, List } from "semantic-ui-react"
import { Room } from "../../models/room"
import { useStore } from "../../stores/store";
import LoadingComponent from "../LoadingComponent";
import RoomListItem from "../RoomListItem";

interface Props{
    rooms: Room[]
}

export default observer(function OfficeDetaledRooms({rooms}: Props) {

    const {statisticStore} = useStore();
    const {selectedStatistic, statistics, subscribeDetailsRegistry, loadSelectedStatistic, 
        loadStatisticsForRoom, loadSubscribeDetailsForRooms, 
        subscribeDetailsForDay, subscribeDetailsForWeek, subscribeDetailsForMonth} = statisticStore;

    useEffect(() => {
        if(subscribeDetailsRegistry.size <= 1){
            loadSubscribeDetailsForRooms(rooms);
        }
    }, [subscribeDetailsRegistry.size, loadSubscribeDetailsForRooms, rooms])

    function handleRoomSelect(e: SyntheticEvent<HTMLButtonElement>, id: number){
        loadStatisticsForRoom(+e.currentTarget.name)
    }

    if(statisticStore.loadingInitial) return <LoadingComponent content='Loading rooms' />

    return(
        <>
            <h1>Rooms</h1>
            <List>
                {rooms.map((room: Room) => (
                    <RoomListItem 
                        key={room.id} 
                        room={room} 
                        handleRoomSelect={handleRoomSelect}
                        subscribeDetailsForDay={subscribeDetailsForDay.find(sd => sd.roomId == room.id)}
                        subscribeDetailsForWeek={subscribeDetailsForWeek.find(sd => sd.roomId == room.id)}
                        subscribeDetailsForMonth={subscribeDetailsForMonth.find(sd => sd.roomId == room.id)}
                    />
                ))}
            </List>
        </>
    )
})
import { observer } from "mobx-react-lite";
import { List } from "semantic-ui-react"
import { Room } from "../../models/room"
import { useStore } from "../../stores/store";
import RoomListItem from "../RoomListItem";

interface Props{
    rooms: Room[]
}

export default observer(function OfficeDetaledRooms({rooms}: Props) {
    const {statisticStore} = useStore();
    const {subscribeDetailsForDay, subscribeDetailsForWeek, subscribeDetailsForMonth} = statisticStore;

    return(
        <>
            <h1>Rooms</h1>
            <List>
                {rooms.map((room: Room) => (
                    <RoomListItem
                        key={room.id}
                        room={room}
                        subscribeDetailsForDay={subscribeDetailsForDay.find(sd => sd.roomId === room.id)}
                        subscribeDetailsForWeek={subscribeDetailsForWeek.find(sd => sd.roomId === room.id)}
                        subscribeDetailsForMonth={subscribeDetailsForMonth.find(sd => sd.roomId === room.id)} 
                    />
                ))}
            </List>
        </>
    )
})
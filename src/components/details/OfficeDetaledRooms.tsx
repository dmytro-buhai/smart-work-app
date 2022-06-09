import { SyntheticEvent, useEffect } from "react";
import { Button, List } from "semantic-ui-react"
import { Room } from "../../models/room"
import { useStore } from "../../stores/store";

interface Props{
    rooms: Room[]
}

export default function OfficeDetaledRooms({rooms}: Props) {
    const {statisticStore} = useStore();
    const {selectedStatistic, statistic, 
        loadSelectedStatistic, loadStatisticsForRoom} = statisticStore;

    function handleRoomSelect(e: SyntheticEvent<HTMLButtonElement>, id: number){
        loadStatisticsForRoom(+e.currentTarget.name)
        {statistic &&
            console.log(statistic)
        }
    }

    return(
        <>
            <h1>Rooms</h1>
            <List>
                {rooms.map((room: Room) => (
                    <List.Item key={room.id}>
                        <List.Description>
                            {room.id}
                            {room.name}
                            {room.photoFileName}
                            {room.square}
                        </List.Description>
                        <Button
                            name={room.id}
                            onClick={(e) => handleRoomSelect(e, room.id)} 
                            floated='right' 
                            content='View statistics' 
                            color='blue' 
                        />
                    </List.Item>
                ))}
            </List>
        </>
    )
}
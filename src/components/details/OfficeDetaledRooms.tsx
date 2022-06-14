import { observer } from "mobx-react-lite";
import { List } from "semantic-ui-react"
import { Room } from "../../models/room"
import { useStore } from "../../stores/store";
import RoomListItem from "../RoomListItem";
import { useTranslation } from 'react-i18next';

interface Props{
    rooms: Room[]
}

export default observer(function OfficeDetaledRooms({rooms}: Props) {
    const { t } = useTranslation();
    const {subscribeStore} = useStore();
    const {getSubscribeDetailsForRoom} = subscribeStore;

    return(
        <>
            <h1>{t('rooms')}</h1>
            <List>
                {rooms.map((room: Room) => (
                    <RoomListItem
                        key={room.id}
                        room={room}
                        subscribeDetailsForDay={getSubscribeDetailsForRoom(room.id).find(sd => sd.type === 1)}
                        subscribeDetailsForWeek={getSubscribeDetailsForRoom(room.id).find(sd => sd.type === 2)}
                        subscribeDetailsForMonth={getSubscribeDetailsForRoom(room.id).find(sd => sd.type === 3)} 
                    />
                ))}
            </List>
        </>
    )
})
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { useStore } from "../stores/store";
import OfficeDetaledHeader from "./details/OfficeDetaledHeader";
import OfficeDetaledInfo from "./details/OfficeDetaledInfo";
import OfficeDetaledRooms from "./details/OfficeDetaledRooms";
import LoadingComponent from "./LoadingComponent";

export default observer(function OfficeDetails(){
    const {officeStore} = useStore();
    const {statisticStore} = useStore();
    const {selectedOffice: office, loadOffice, loadingInitial} = officeStore;
    const {loadSubscribeDetailsForRooms} = statisticStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id){
            loadOffice(+id);
            if(!loadingInitial){
                loadSubscribeDetailsForRooms(office?.rooms);
            }
        }
    }, [id, office, loadingInitial, loadOffice, loadSubscribeDetailsForRooms]);

    if(loadingInitial || !office) return <LoadingComponent/>

    return(
        <Grid>
            <Grid.Column width={10}>
                <OfficeDetaledHeader office={office}/>
                <OfficeDetaledInfo office={office}/>
                
            </Grid.Column>
            <Grid.Column width={16}>
                <OfficeDetaledRooms rooms={office.rooms} />
            </Grid.Column>
        </Grid>
    )
})
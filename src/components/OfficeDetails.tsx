import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { useStore } from "../stores/store";
import OfficeDetaledHeader from "./details/OfficeDetaledHeader";
import OfficeDetaledInfo from "./details/OfficeDetaledInfo";
import OfficeDetaledRooms from "./details/OfficeDetaledRooms";
import OfficeDetaledSidebar from "./details/OfficeDetaledSidebar";
import LoadingComponent from "./LoadingComponent";

export default observer(function OfficeDetails(){
    const {officeStore} = useStore();
    const {selectedOffice: office, loadOffice, loadingInitial} = officeStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id){
            loadOffice(+id);
        }
    }, [id, loadOffice]);

    if(loadingInitial || !office) return <LoadingComponent/>

    return(
        <Grid>
            <Grid.Column width={10}>
                <OfficeDetaledHeader office={office}/>
                <OfficeDetaledInfo office={office}/>
                <OfficeDetaledRooms rooms={office.rooms}/>
            </Grid.Column>
            <Grid.Column width={6}>
                <OfficeDetaledSidebar office={office}/>
            </Grid.Column>
        </Grid>
    )
})
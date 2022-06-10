import { observer } from "mobx-react-lite"
import { Segment } from "semantic-ui-react"
import { DetailStatistic } from "../../models/detailStatistic"
import LoadingComponent from "../LoadingComponent"
import AttendanceStatistic from "../statistic/AttendanceStatistic"

interface Props{
    selectedStatistic: DetailStatistic | undefined;
    isCanBeShown: boolean;
}

export default observer(function OfficeDetaledSidebar({selectedStatistic, isCanBeShown}: Props) {

    if(!isCanBeShown) return <></>

    return(
        <>
            <Segment
                textAlign='center'
                style={{border: 'none'}}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                Statistic for
                {selectedStatistic && 
                    <h5>{selectedStatistic.type}</h5>
                }
            </Segment>
            <Segment attached>
                {selectedStatistic === undefined && 
                    <h5>Moving to selected room...</h5>
                }
                {selectedStatistic && 
                    <AttendanceStatistic statistic={undefined} />
                }
            </Segment>
        </>
    )
})
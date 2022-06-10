import { observer } from "mobx-react-lite"
import { Segment } from "semantic-ui-react"
import { DetailStatistic } from "../../models/detailStatistic"
import AttendanceStatistic from "../statistic/AttendanceStatistic"

interface Props{
    selectedStatistic: DetailStatistic | undefined
}

export default observer(function OfficeDetaledSidebar({selectedStatistic}: Props) {
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
                {selectedStatistic && 
                    <h5>{selectedStatistic.description}</h5>
                }
                Statistic
            </Segment>
            <Segment attached>
                <AttendanceStatistic statistic={undefined} />
            </Segment>
        </>
    )
})
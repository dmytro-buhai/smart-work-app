import { observer } from "mobx-react-lite"
import { Segment } from "semantic-ui-react"
import { Office } from "../../models/office"
import AttendanceStatistic from "../statistic/AttendanceStatistic"

interface Props{
    office: Office
}

export default observer(function OfficeDetaledSidebar({office}: Props) {
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
                Statistic
            </Segment>
            <Segment attached>
                <AttendanceStatistic statistic={undefined} />
            </Segment>
        </>
    )
})
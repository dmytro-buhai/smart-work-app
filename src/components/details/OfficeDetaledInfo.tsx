import { observer } from "mobx-react-lite"
import { Grid, Icon, Segment } from "semantic-ui-react"
import { Office } from "../../models/office"

interface Props{
    office: Office
}

export default observer(function OfficeDetaledInfo({office}: Props) {
    return(
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column>
                        <Icon size='large' color='teal' name='address card outline' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{office.address}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name="briefcase" /> 
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>
                            Rooms amount: {office.rooms.length}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name="phone volume" /> 
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>
                            {office.phoneNumber}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})
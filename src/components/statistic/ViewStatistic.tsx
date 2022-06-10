import { observer } from "mobx-react-lite";
import { Header, Icon, Table } from "semantic-ui-react"
import { DetailStatistic } from "../../models/detailStatistic";

interface Props{
    selectedStatistic: DetailStatistic | undefined
}

export default observer(function ViewStatistic({selectedStatistic}: Props) {
    return(
        <Table basic='very' celled collapsing>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Day</Table.HeaderCell>
                <Table.HeaderCell>Office {selectedStatistic?.type}</Table.HeaderCell>
            </Table.Row>
            </Table.Header>

            <Table.Body>
            <Table.Row>
                <Table.Cell>
                <Header as='h4' image>
                    <Icon name='calendar alternate outline' rounded='true' size='mini' />
                    <Header.Content>
                        Monday
                    <Header.Subheader>6 Jun 2022</Header.Subheader>
                    </Header.Content>
                </Header>
                </Table.Cell>
                <Table.Cell>22</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>
                <Header as='h4' image>
                    <Icon name='calendar alternate outline' rounded='true' size='mini' />
                    <Header.Content>
                        Tuesday
                    <Header.Subheader>7 Jun 2022</Header.Subheader>
                    </Header.Content>
                </Header>
                </Table.Cell>
                <Table.Cell>15</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>
                <Header as='h4' image>
                    <Icon name='calendar alternate outline' rounded='true' size='mini' />
                    <Header.Content>
                        Wednesday
                    <Header.Subheader>8 Jun 2022</Header.Subheader>
                    </Header.Content>
                </Header>
                </Table.Cell>
                <Table.Cell>12</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>
                <Header as='h4' image>
                    <Icon name='calendar alternate outline' rounded='true' size='mini' />
                    <Header.Content>
                        Thuterday
                    <Header.Subheader>9 Jun 2022</Header.Subheader>
                    </Header.Content>
                </Header>
                </Table.Cell>
                <Table.Cell>11</Table.Cell>
            </Table.Row>
            </Table.Body>
        </Table>
    )
})

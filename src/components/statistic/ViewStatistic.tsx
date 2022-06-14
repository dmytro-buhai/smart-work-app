import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Header, Icon, Table } from "semantic-ui-react"
import { DetailStatistic } from "../../models/detailStatistic";
import LoadingComponent from "../LoadingComponent";
import { useTranslation } from 'react-i18next';

interface Props{
    selectedStatistic: DetailStatistic | undefined
}

export default observer(function ViewStatistic({selectedStatistic}: Props) {
    function randomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const { t } = useTranslation();
    const [statData, setStatData] = useState<number[]>()

    useEffect(() => {
        const attendanceData = {
            values: [
                randomNumber(15, 28),
                randomNumber(15, 28),
                randomNumber(15, 28),
                randomNumber(15, 28),
                randomNumber(15, 28)
            ]
        }
    
        const climateData = {
            values: [
                randomNumber(19, 22),
                randomNumber(19, 22),
                randomNumber(19, 22),
                randomNumber(19, 22),
                randomNumber(19, 22)
            ]
        }
    
        const lightningData = {
            values: [
                randomNumber(290, 320),
                randomNumber(290, 320),
                randomNumber(290, 320),
                randomNumber(290, 320),
                randomNumber(290, 320),
            ]
        }

        if(selectedStatistic?.type === 'Attendance'){
            setStatData(attendanceData.values)
        } else if (selectedStatistic?.type === 'Lighting'){
            setStatData(lightningData.values)
        } else {
            setStatData(climateData.values)
        }
    }, [selectedStatistic])

    if(statData === undefined) return <LoadingComponent />
 
    return(
        <Table basic='very' celled collapsing>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>{t('statistic.day')}</Table.HeaderCell>
                <Table.HeaderCell>
                    {selectedStatistic?.type === 'Lighting' &&
                        <>{t('statistic.lumens')}</>
                    }
                    {selectedStatistic?.type === 'Climate' &&
                        <>(°C)</>
                    }
                    {selectedStatistic?.type === 'Attendance' &&
                        <>{t('statistic.attendance')}</>
                    }
                </Table.HeaderCell>
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
                <Table.Cell>{statData[0]}</Table.Cell>
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
                <Table.Cell>{statData[1]}</Table.Cell>
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
                <Table.Cell>{statData[2]}</Table.Cell>
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
                <Table.Cell>{statData[3]}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>
                <Header as='h4' image>
                    <Icon name='calendar alternate outline' rounded='true' size='mini' />
                    <Header.Content>
                    Friday
                    <Header.Subheader>10 Jun 2022</Header.Subheader>
                    </Header.Content>
                </Header>
                </Table.Cell>
                <Table.Cell>{statData[4]}</Table.Cell>
            </Table.Row>
            </Table.Body>
        </Table>
    )
})

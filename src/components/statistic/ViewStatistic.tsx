import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Header, Icon, Table } from "semantic-ui-react"
import { DetailStatistic } from "../../models/detailStatistic";
import LoadingComponent from "../LoadingComponent";
import { useTranslation } from 'react-i18next';
import { useStore } from "../../stores/store";

interface Props{
    selectedStatistic: DetailStatistic | undefined;
}

export default observer(function ViewStatistic({selectedStatistic}: Props) {
    const{statisticStore} = useStore();
    const{groupedCurrentSelectedStatistic, currentSelectedStatistic, selectedStatisticType} = statisticStore;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    const { t } = useTranslation();
    const [statData, setStatData] = useState<DetailStatistic>();

    const [s1, setS1] = useState<DetailStatistic>();
    const [s2, setS2] = useState<DetailStatistic>();
    const [s3, setS3] = useState<DetailStatistic>();

    const [firstday, setFirstday] = useState<Date>();
    const [lastday, setLastday] = useState<Date>();

    useEffect(() => {
        var curr = new Date();
        setFirstday(new Date(curr.setDate(curr.getDate() - curr.getDay())));
        setLastday(new Date(curr.setDate(curr.getDate() - curr.getDay()+6)));

        console.log(firstday);
        console.log(lastday);

        setS1(currentSelectedStatistic![0]);
        setS2(currentSelectedStatistic![1]);
        setS3(currentSelectedStatistic![2]);

        console.log(selectedStatisticType);    

        if(selectedStatisticType === s1?.type){
            setStatData(s1)
        } else if (selectedStatisticType === s2?.type){
            setStatData(s2)
        } else if (selectedStatisticType === s3?.type){
            setStatData(s3)
        }

        let first = statData?.dates.find(d => d.getDate() === firstday!.getDate() + 1)!
        let last = statData?.dates.find(d => d.getDate() === lastday!.getDate())!

        let firstIndex = statData?.dates.indexOf(first);
        let lastIndex = statData?.dates.indexOf(last);
        console.log(lastIndex);

        let dates = lastIndex === -1?   statData?.dates.slice(firstIndex) :
                                        statData?.dates.slice(firstIndex, lastIndex);

        let values = lastIndex === -1?  statData?.values.slice(firstIndex) :
                                        statData?.values.slice(firstIndex, lastIndex);

        if(dates && values){
            statData!.dates = dates!
            statData!.values = values!
        } 
        
        console.log(dates);
        console.log(values);
        console.log(statData?.dates);
        console.log(statData?.values);
        
    }, [currentSelectedStatistic, firstday, lastday, statData, s1, s2, s3, selectedStatisticType])

    if(statData === undefined) return <LoadingComponent />
 
    return(
        <Table basic='very' celled collapsing>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>{t('statistic.day')}</Table.HeaderCell>
                <Table.HeaderCell>
                    {selectedStatisticType === 'Lighting' &&
                        <>{t('statistic.lumens')}</>
                    }
                    {selectedStatisticType === 'Climate' &&
                        <>(°C)</>
                    }
                    {selectedStatisticType === 'Attendance' &&
                        <>{t('statistic.attendance')}</>
                    }
                </Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    statData.values.map((value, i) => (
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4' image>
                                    <Icon name='calendar alternate outline' rounded='true' size='mini' />
                                    <Header.Content>
                                        {days[statData.dates[i].getDay()]}
                                    <Header.Subheader>{statData.dates[i].getDate()} {monthNames[firstday!.getMonth()]} {firstday!.getFullYear()}</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>{value}</Table.Cell>
                        </Table.Row>
                    )) 
                } 
            </Table.Body>
        </Table>
    )
})

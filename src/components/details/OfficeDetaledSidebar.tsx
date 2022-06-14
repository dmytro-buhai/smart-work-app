import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react";
import { Button, Segment } from "semantic-ui-react"
import { DetailStatistic } from "../../models/detailStatistic"
import ViewStatistic from "../statistic/ViewStatistic";
import { useTranslation } from 'react-i18next';

interface Props{
    selectedStatistic: DetailStatistic[] | undefined;
    isCanBeShown: boolean;
    handleClose: () => void;
}

export default observer(function OfficeDetaledSidebar({selectedStatistic, isCanBeShown, handleClose}: Props) {
    const { t } = useTranslation();
    const[currentStatistic, setCurrentStatistic] = useState<DetailStatistic | undefined>(undefined)

    useEffect(() => {
        setCurrentStatistic(selectedStatistic?.at(0))
    }, [setCurrentStatistic, selectedStatistic])

    function handleStatisitcSelecting(index: number) {
        setCurrentStatistic(selectedStatistic?.at(index))
    }

    if (!isCanBeShown) {
        return <></>
    } 

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
                {currentStatistic && 
                    <h5>{t('statistic.name')}</h5>
                }
            </Segment>
            <Segment attached>
                {selectedStatistic === undefined ? (
                        <h5>{t('statistic.moving')}</h5>
                )   :   (
                        <ViewStatistic selectedStatistic={currentStatistic} />
                )}  
            </Segment>
            <Segment attached clearing>
                <span>
                    <Button onClick={() => handleStatisitcSelecting(0)}
                        size='tiny'
                        content={t('statistic.lighting')} 
                        floated='left'
                    />
                </span>
                <span>
                    <Button onClick={() => handleStatisitcSelecting(1)}
                        size='tiny'
                        content={t('statistic.climate')} 
                        floated='left'
                    />
                </span>
                <span>
                    <Button onClick={() => handleStatisitcSelecting(2)}
                        size='tiny'
                        content={t('statistic.attendance')} 
                        floated='left'
                    />
                </span>
                <span>
                    <Button onClick={handleClose}
                        size='tiny'
                        content={t('button.close')}  
                        floated='right'
                    />
                </span>
            </Segment>
        </>
    )
})
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react";
import { Button, Segment } from "semantic-ui-react"
import { DetailStatistic } from "../../models/detailStatistic"
import ViewStatistic from "../statistic/ViewStatistic";

interface Props{
    selectedStatistic: DetailStatistic[] | undefined;
    isCanBeShown: boolean;
    handleClose: () => void;
}

export default observer(function OfficeDetaledSidebar({selectedStatistic, isCanBeShown, handleClose}: Props) {
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
                    <h5>{currentStatistic.type} Statistic</h5>
                }
            </Segment>
            <Segment attached>
                {selectedStatistic === undefined ? (
                        <h5>Moving to selected room...</h5>
                )   :   (
                        <ViewStatistic selectedStatistic={currentStatistic} />
                )}  
            </Segment>
            <Segment attached clearing>
                <span>
                    <Button  onClick={() => handleStatisitcSelecting(0)}
                        size='tiny'
                        content='Lighting' 
                        floated='left'
                    />
                </span>
                <span>
                    <Button  onClick={() => handleStatisitcSelecting(1)}
                        size='tiny'
                        content='Climate' 
                        floated='left'
                    />
                </span>
                <span>
                    <Button  onClick={() => handleStatisitcSelecting(2)}
                        size='tiny'
                        content='Attendance' 
                        floated='left'
                    />
                </span>
                <span>
                    <Button  onClick={handleClose}
                        size='tiny'
                        content='Close' 
                        floated='right'
                    />
                </span>
            </Segment>
        </>
    )
})
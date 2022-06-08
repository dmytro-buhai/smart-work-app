import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { Office } from '../models/office';
import { useStore } from '../stores/store';
import '../styles/officeList.css';
import OfficeListItem from './OfficeListItem';

export default observer(function OfficeList(){
    const {officeStore} = useStore();
    const {groupedOffices} = officeStore;

    return(
        <>
            {groupedOffices.map(([group, offices]) => (
                <Fragment key={group}>
                    <Header block>
                        {group}
                    </Header>
                    {offices.map((office: Office) => (
                        <OfficeListItem key={office.id} office={office}/>
                    ))}
                </Fragment>
            ))}
        </> 
    )
})
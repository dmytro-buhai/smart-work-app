import { observer } from "mobx-react-lite";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { useTranslation } from 'react-i18next';

export default observer(function OfficeFilters() {
    const { t } = useTranslation();
    const {officeStore: {predicate, setPredicate}, userStore: {user}} = useStore();

    return (
        <Menu vertical size='large' style={{width: '100%', marginTop: 55}}>
            <Header icon='filter' attached color='teal' content={t('filters.title')} />
            <Menu.Item 
                content={t('filters.all')} 
                active={predicate.has('all')}
                onClick={() => setPredicate('all', 'true')}
            />
            <Menu.Item 
                content={t('filters.favorites')}  
                active={predicate.has('isFavourite')}
                onClick={() => setPredicate('isFavourite', 'true')}
            />
            <Menu.Item 
                content={t('filters.my')}  
                active={predicate.has('host')}
                onClick={() => setPredicate('host', user!.username)}
            />
        </Menu>
    )
})
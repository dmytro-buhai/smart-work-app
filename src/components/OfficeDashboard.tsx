import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid, Loader } from 'semantic-ui-react';
import { PagingParams } from '../models/pagination';
import { useStore } from '../stores/store';
import '../styles/officeDashboard.css';
import LoadingComponent from './LoadingComponent';
import OfficeFilters from './OfficeFilters';
import OfficeList from './OfficeList';
import { useTranslation } from 'react-i18next';

export default observer(function OfficeDashboard(){
    const { t } = useTranslation();
    const {officeStore} = useStore();
    const {loadOffices, officeRegistry, 
           isAddedNewOffice, setIsAddedNewOffice, setPagingParams, pagination} = officeStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadOffices().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if(officeRegistry.size <= 1 || isAddedNewOffice){
            loadOffices();
            setIsAddedNewOffice(false)
        }
    }, [officeRegistry.size, isAddedNewOffice, setIsAddedNewOffice, loadOffices])

    if (officeStore.loadingInitial && !loadingNext) return <LoadingComponent content={t('loading.offices')} />

    return(
        <Grid>
            <Grid.Column width='10'>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <OfficeList />
                </InfiniteScroll>
            </Grid.Column>
            <Grid.Column width='6'>
                <OfficeFilters />
            </Grid.Column>
            <Grid.Column width='10'>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
})
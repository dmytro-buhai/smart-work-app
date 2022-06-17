import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid, Loader } from 'semantic-ui-react';
import { Company } from '../models/company';
import { PagingParams } from '../models/pagination';
import { useStore } from '../stores/store';
import '../styles/officeList.css';
import CompanyListItem from './CompanyListItem';
import LoadingComponent from './LoadingComponent';

export default observer(function CompanyList(){
    const {companyStore} = useStore();
    const {companies} = companyStore;

    const {loadCompanies, companyRegistry, 
           isAddedNewCompany, setIsAddedNewCompany, setPagingParams, pagination} = companyStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadCompanies().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if(companyRegistry.size <= 1 || isAddedNewCompany){
            loadCompanies();
            setIsAddedNewCompany(false)
        }
    }, [companyRegistry.size, isAddedNewCompany, setIsAddedNewCompany, loadCompanies])

    if (companyStore.loadingInitial && !loadingNext) return <LoadingComponent content='Loading companies...' />

    return(
        <Grid centered>
            <Grid.Column width='10'>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    {companies.map((company: Company) => (
                        <CompanyListItem key={company.id} company={company}/>
                    ))} 
                </InfiniteScroll>
            </Grid.Column>
            <Grid.Column width='10'>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
})
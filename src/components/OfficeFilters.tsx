import { observer } from "mobx-react-lite";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function OfficeFilters() {
    const {officeStore: {predicate, setPredicate}} = useStore();

    return (
        <Menu vertical size='large' style={{width: '100%', marginTop: 55}}>
            <Header icon='filter' attached color='teal' content='Filters' />
            <Menu.Item 
                content='All' 
                active={predicate.has('all')}
                onClick={() => setPredicate('all', 'true')}
            />
            <Menu.Item 
                content='Favorites' 
                active={predicate.has('isFavourite')}
                onClick={() => setPredicate('isFavourite', 'true')}
            />
        </Menu>
    )
})
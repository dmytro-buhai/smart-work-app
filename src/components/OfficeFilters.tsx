import { Header, Menu } from "semantic-ui-react";

export default function OfficeFilters() {
    return (
        <Menu vertical size='large' style={{width: '100%', marginTop: 55}}>
            <Header icon='filter' attached color='teal' content='Filters' />
            <Menu.Item content='All' />
            <Menu.Item content='Favorites' />
        </Menu>
    )
}
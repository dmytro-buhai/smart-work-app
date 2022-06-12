import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Segment, Image, Item, Header, Grid, GridColumn, Icon, Button, List, Divider } from "semantic-ui-react";
import '../../index.css'
import { useStore } from "../../stores/store";
import LoadingComponent from "../LoadingComponent";
import UserSubscribeListItem from "../UserSubscribeListItem";

const officeImageStyle = {
    filter: 'brightness(30%)'
}

const officeImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    wifth: '100%',
    heigth: 'auto',
    color: 'white'
}

export default observer(function ProfilePage() {
    const {commonStore, userStore, subscribeStore} = useStore();
    const {loadUserSubscribes, loadingUserSubscribes} = subscribeStore;
    
    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setApploaded());
        } else {
            commonStore.setApploaded();
        }
        loadUserSubscribes();
    }, [commonStore, userStore, loadingUserSubscribes, loadUserSubscribes])
  
    if (!commonStore.appLoaded) return <LoadingComponent content='Loading profile...' />
    if (loadingUserSubscribes) return <LoadingComponent content='Loading subscribes...' />
    
    return (
        <>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image avatar src={`${commonStore.imageBasePath}/user.png`} />
                        
                        <Item.Content verticalAlign="middle">
                            <Header as='h1' content="Bob"/>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>

            <Item>
                <Item.Content verticalAlign='middle'>
                    <Header as='h1' content="Subsribes" textAlign='center' size='huge' />
                    <List>
                        {subscribeStore.userSubscribes.map(sub => (
                            <UserSubscribeListItem key={sub.id} userSubscribe={sub}/>
                        ))}
                    </List>                      
                </Item.Content>
            </Item>
        </> 
    )
})
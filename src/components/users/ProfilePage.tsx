import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Segment, Item, Header, List } from "semantic-ui-react";
import '../../index.css'
import { useStore } from "../../stores/store";
import LoadingComponent from "../LoadingComponent";
import UserSubscribeListItem from "../UserSubscribeListItem";

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
                            <Header as='h1' content={userStore.user?.username}/>
                            <Item.Description >
                                <h3>bob@example.com</h3>
                            </Item.Description>

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
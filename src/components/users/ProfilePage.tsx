import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Segment, Item, Header, List, Button } from "semantic-ui-react";
import UserFrom from "../../forms/UserFrom";
import '../../index.css'
import { useStore } from "../../stores/store";
import LoadingComponent from "../LoadingComponent";
import UserSubscribeListItem from "../UserSubscribeListItem";

export default observer(function ProfilePage() {
    const {commonStore, userStore, subscribeStore, modalStore} = useStore();
    const {user} = userStore;
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
            <Segment clearing>
                <Item.Group>
                    <Item>
                        <Item.Image avatar src={`${commonStore.imageBasePath}/user.png`} />
                        <Item.Content verticalAlign="middle">
                            <Header as='h1' content={`${user?.username}`}/>
                            <Item.Description >
                                <h3>{`Email: ${user?.email}`}</h3>
                            </Item.Description>
                            <Item.Extra>
                                <h3>{`Phone number: ${user?.phoneNumber}`}</h3>
                            </Item.Extra>
                            <Button 
                                floated='left'
                                icon='edit'
                                onClick={() => modalStore.openModal(<UserFrom />)} 
                                content='Edit'
                                color='teal'
                            />
                        </Item.Content>
                    </Item>
                </Item.Group>
                <span>
                
                </span>
            </Segment>

            {subscribeStore.userSubscribes.length > 0 &&
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
            }
        </> 
    )
})
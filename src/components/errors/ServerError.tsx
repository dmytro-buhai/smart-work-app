import { observer } from "mobx-react-lite";
import { Container, Header, Message, Segment } from "semantic-ui-react";
import { useStore } from "../../stores/store";

interface Props{
    errors: string[] | null;
}

export default observer(function ServerError({errors}: Props){
    const {commonStore} = useStore();

    return(
        <Container>
            <Header as='h1' content='Server Error' />
            <Header sub as='h5' color='red' content={commonStore.error?.message} />
            {commonStore.error?.details &&
                <Segment>
                    <Header as='h4' content='Stack trace' color='teal' />
                    <code style={{marginTop: '10px'}}>{commonStore.error.details}</code>
                </Segment>
            }
        </Container>       
    )
})
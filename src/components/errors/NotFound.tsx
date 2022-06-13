import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFount() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Oops - we've lokked everywhere and could not find this.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/offices'>
                    Return to offices page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}
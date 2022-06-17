import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Grid, Header, Icon, Item, Segment } from "semantic-ui-react";
import { InfoUserSubscribe } from "../models/infoUserSubscribe";
import QRCode from "qrcode.react";

interface Props {
    userSubscribe: InfoUserSubscribe
}

export default observer(function UserSubscribeListItem({userSubscribe}: Props){
    const qrValue = `${userSubscribe.id}_${userSubscribe.userId}_` + 
                    `${userSubscribe.roomId}_${userSubscribe.startDate}_` +
                    `${userSubscribe.endDate}`;

    const downloadQRCode = () => {
        // Generate download with use canvas and stream
        const canvas = document.getElementById("qr-gen") as HTMLCanvasElement;
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${qrValue}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (  
        <Grid>
            <Grid.Column width={8} verticalAlign='middle'>
                <Segment>
                    <Item.Group>
                        <Item.Image size='large' bordered src={`/assets/default_room_photo_file_name.jpg`}/>
                        <Item>
                            <Item.Header as='h1'>
                                <Link to='/offices'>Office</Link>
                            </Item.Header>
                        </Item>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    <Item>
                                        <Item.Content>
                                            <Header content='Subscribe prices:' />
                                            <Item.Description>
                                                <ul style={{listStyleType: 'none', marginLeft: '-40px'}}>
                                                    <li>
                                                        <Icon name='money bill alternate' color='green' /> For a day: 5
                                                    </li>
                                                    <li>
                                                        <Icon name='money bill alternate' color='green' /> For a week: 15
                                                    </li>
                                                    <li>
                                                        <Icon name='money bill alternate' color='green' /> For a month: 35
                                                    </li>
                                                </ul>
                                            </Item.Description>
                                        </Item.Content>
                                    </Item>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <Item.Group>
                                        <Item>
                                            <Icon className="middle aligned" name="calendar alternate outline" color='teal' size='big' />
                                            <Item.Content>
                                                <Item.Header as='h5' content='Start date'/>
                                                <Item.Description content={userSubscribe.startDate} />  
                                            </Item.Content>
                                        </Item>
                                        <Item>
                                            <Icon className="middle aligned" name="calendar alternate outline" color='teal' size='big' />
                                            <Item.Content>
                                                <Item.Header as='h5' content='End date'/>
                                                <Item.Description content={userSubscribe.endDate} />  
                                            </Item.Content>
                                        </Item>
                                    </Item.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Item.Group>
                </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
                <Grid.Row>
                    <QRCode
                        id="qr-gen"
                        value={qrValue}
                        size={290}
                        level={"H"}
                        includeMargin={true}
                    />
                </Grid.Row>
                    <Button onClick={downloadQRCode}>
                        Download QR Code
                    </Button>
            </Grid.Column>
        </Grid>
    )
})
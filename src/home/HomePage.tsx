import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import '../styles/homePage.css';

export default function HomePage(){
    return(
        <div className="homePage">
            <Container style={{paddingTop: '7em'}}>
                <div className="homeTitle">
                    <h1 className="ui header">
                        SmartWork. Find your place to work
                        <div className="sub header">Just check out the offices we have and let's subscribe to a place to work :)</div>
                    </h1>
                    <br />
                    <br />
                    <p>The software system of flexible selection of the workplace in coworking aims to provide a comfortable search for the coworking area, and the detail information about the workspace that is considering. SmartWork provides for the organization of transparent access to the review of technical and material equipment of the coworking area, available rooms, statistic of their temperature, lighting and attendance.</p>
                    <br />
                    <h3>Go to <Link to='/offices'>Offices</Link></h3>
                </div>
            </Container>
        </div>
    )
}
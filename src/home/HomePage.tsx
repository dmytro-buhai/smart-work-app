import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import '../styles/homePage.css';
import { useTranslation } from 'react-i18next';

export default function HomePage(){
    const { t } = useTranslation();

    return(
        <div className="homePage">
            <Container style={{paddingTop: '7em'}}>
                <div className="homeTitle">
                    <h1 className="ui header">
                        {t('home.title')}
                        <div className="sub header">{t('home.subtitle')}</div>
                    </h1>
                    <br />
                    <br />
                    <p>{t('home.description')}</p>
                    <br />
                    <h3>{t('home.goTo')} <Link to='/offices'>{t('home.offices')} </Link></h3>
                </div>
            </Container>
        </div>
    )
}
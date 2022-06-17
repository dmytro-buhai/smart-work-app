import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Menu, Image, ButtonContent, ButtonOr, ButtonGroup } from "semantic-ui-react";
import { useStore } from "../stores/store";
import LoginForm from "./users/LoginForm";
import RegisterForm from "./users/RegisterForm";
import { useTranslation } from 'react-i18next';

const lngs = {
    en: { nativeName: 'English' },
    ua: { nativeName: 'Ukrainian' }
};

export default observer(function NavBar(){
    const { t, i18n } = useTranslation();
    const{userStore: {user, isLoggedIn, logout}, modalStore, commonStore} = useStore()
    
    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo"/>
                    SmartWork
                </Menu.Item>
                <Menu.Item as={NavLink} to='/offices' name={t('discover')} />
                <Menu.Item as={NavLink} to='/companies' name={t('companies.title')} />
                {isLoggedIn && 
                    <Menu.Item>
                        <Button as={NavLink} to='/addCompany' positive content={t('companies.addBtn')} />
                    </Menu.Item>
                }

                <Menu.Item position='right'>
                    {isLoggedIn === false ? (
                        <>
                            <Button onClick={() => modalStore.openModal(<LoginForm />, 'mini')} size='huge' inverted>
                                Login
                            </Button>
                            <Button onClick={() => modalStore.openModal(<RegisterForm />, 'mini')} size='huge' inverted>
                                Register
                            </Button>
                        </>
                    ) : (
                        <>
                            <Image src={user?.image || commonStore.imageBasePath + '/user.png'} avatar spased='right' />
                                <Dropdown pointing='top left' text={user?.displayName}>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text={t('profile.account')}/>
                                    <Dropdown.Item onClick={logout} text={t('profile.logOut')} icon='power' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    )}
                </Menu.Item>
                <Menu.Item>
                    <ButtonGroup>
                            <Button key={Object.keys(lngs)[0]} 
                                content={Object.keys(lngs)[0]}
                                type="submit"
                                onClick={() => i18n.changeLanguage(Object.keys(lngs)[0])}
                                color='blue'
                            />
                            <ButtonOr />
                            <Button key={Object.keys(lngs)[1]} 
                                content={Object.keys(lngs)[1]}
                                onClick={() => i18n.changeLanguage(Object.keys(lngs)[1])}
                                type="submit"
                                color='yellow'
                            />
                    </ButtonGroup>
                </Menu.Item>
            
            </Container>
        </Menu>
    )
})
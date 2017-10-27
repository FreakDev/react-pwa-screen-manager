import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

import { ScreenManager, Screen, NavigationBar, ForbiddenScreen, SplashScreen } from '../../build/lib'

ReactDOM.render(
<div>
    <ScreenManager 
        authCheck={() => {
            // return auth status
            return false
        }}
    >
        <SplashScreen style={{ background: 'black' }}  />
        <Screen style={{ background: 'yellow' }} name="splash" exact path="/" noAnim noNavbar hideNavbar >
            <h1>Login</h1>
        </Screen>
        <Screen style={{ background: 'yellow' }} name="splash" exact path="/prehome" noAnim noNavbar hideNavbar >
            <h1>Splash</h1>
        </Screen>
        <Screen protected style={{ background: 'cyan' }} name="home" exact path="/home">
            <h1>Home</h1>
        </Screen>
        <Screen protected style={{ background: 'green' }} name="Screen 2" exact path="/chat">
            <h1>Screen 2</h1>
        </Screen>
        <Screen protected style={{ background: 'blue' }} name="Screen 3" exact path="/settings">
            <h1>Screen 3</h1>
        </Screen>
        <ForbiddenScreen style={{ background: 'red' }} name="forbidden" exact path="/forbidden" redirectTo={{ pathname:"/" }} />
        <NavigationBar position="bottom" />
    </ScreenManager>
</div>
, document.getElementById('root'));

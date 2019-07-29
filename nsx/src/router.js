import React from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginPages from './components/login/login'
import Chat from './components/chat/chat'
import Auth from './components/auth/auth-components'

const MainRouter = () => (
    <main>
        <Switch>
            <Route exact path='/' render={
                () => (
                    <Auth orRedirectTo='/login' orRender={
                        <Chat></Chat>
                    }></Auth>
                )
            }></Route>
            <Route path='/login' component={LoginPages}></Route>
            <Route path='/chat' component={Chat}></Route>
        </Switch>
    </main>
)
export default MainRouter
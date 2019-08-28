import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import LoginPages from './components/login/login'
import Chat from './components/chat/chat'
import Auth from './components/auth/auth'

const MainRouter = () => (
    <main>
        <BrowserRouter>
            <Switch>
                <Route exact path='/chat' render={
                    () => (
                        <Auth orRedirectTo='/login' orRender={
                            <Chat></Chat>
                        }></Auth>
                    )
                }></Route>
                <Route path='/login' component={LoginPages}></Route>
                <Route path='/chat' component={Chat}></Route>
            </Switch>
        </BrowserRouter>
    </main>
)
export default MainRouter
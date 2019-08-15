import React from 'react'
import './login.scss'
import { socket } from '../../services/socket-service/socket-service';
import {Button, ButtonToolbar} from 'react-bootstrap'


class LoginPages extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }

    componentDidMount() {
        
    }

    onClick = event => {
        socket.emit('')
    }

    render() {
        return (
            <React.Fragment>
                <div id="login-form">
                    <div id="login-form-emoji-zone">
                        <div id="emoji">
                            <div id="emoji-head">
                                <div className="emoji-eye">
                                    <div className="emoji-pupil"></div>
                                </div>
                                <div className="emoji-eye">
                                    <div className="emoji-pupil"></div>
                                </div>
                                <div id="emoji-mouth" className="emoji-mouth"></div>
                            </div>
                        </div>
                    </div>
                    <input id="login-form-username" className="login-form-control login-form-text" type="text" placeholder="USERNAME"></input>
                    <input id="login-form-password" className="login-form-control login-form-text" type="password"
                        placeholder="PASSWORD"></input>
                    <ButtonToolbar>
                        <Button href='/chat' type='button' variant="primary" >LOGIN</Button>
                    </ButtonToolbar>
                    {/* <a href='/chat'><button className="login-form-control login-form-button" type='submit' value='LOGIN'>LOGIN</button></a> */}
                    <a className="login-form-link" href="/chat">LOST YOUR PASSWORD ?</a>
                    {/* <audio id="whistle-audio" src="audio/whistle.wav" loop></audio>
                    <audio id="wink-audio" src="audio/wink.wav"></audio>
                    <audio id="rotation-audio" src="audio/rotation.wav"></audio> */}
                    {/* <script src="animation.js"></script> */}
                </div>
            </React.Fragment>
        )
    }
}

export default LoginPages
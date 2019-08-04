import React from 'react'
import './login.scss'
import { socket } from '../../services/socket-service/socket-service';


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
                                <div class="emoji-eye">
                                    <div class="emoji-pupil"></div>
                                </div>
                                <div class="emoji-eye">
                                    <div class="emoji-pupil"></div>
                                </div>
                                <div id="emoji-mouth" class="emoji-mouth"></div>
                            </div>
                        </div>
                    </div>
                    <input id="login-form-username" class="login-form-control login-form-text" type="text" placeholder="USERNAME"></input>
                    <input id="login-form-password" class="login-form-control login-form-text" type="password"
                        placeholder="PASSWORD"></input>
                    <a href='/chat'><button class="login-form-control login-form-button" type='submit' value='LOGIN'>LOGIN</button></a>
                    <a class="login-form-link" href="/chat">LOST YOUR PASSWORD ?</a>
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
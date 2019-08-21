import React from 'react'
import './login.scss'
import { socket } from '../../services/socket-service/socket-service';
import {Button, ButtonToolbar} from 'react-bootstrap'


class LoginPages extends React.Component {
    constructor() {
        super()
        this.state = {
            userName: '',
            password: '',
            infoUser: []
        }
    }

    componentDidMount() {
        this.getUser()
        this.noInfoUser()
    }

    noInfoUser() {
        socket.on('no-username',(value) => {
            console.log('bạn đã nhập thiếu thông tin, xin kiểm tra lại')
        })
    }

    getUser(){
        socket.on('user-login',(values) => {
            // console.log(values)
            let items = []
            values.rows.map((value, index) =>{
                let item = {
                    userName: value.username,
                    password: value.password,
                    userId: value.id
                }
                items.push(item)
            })
            // console.log(items)
            this.setState({
                infoUser: items
            })
            this.checkUser()
        })
    }

    onUserName = event => {
        this.setState({
            userName: event.target.value
        })
    }

    onPassWord = event => {
        this.setState({
            password: event.target.value
        })
    }

    onClick = (event) => {
        socket.emit('user-pass', {
            userName: this.state.userName,
            password: this.state.password
        })
    }

    checkUser() {
        console.log('kiểm tra')
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
                    <input id="login-form-username" className="login-form-control login-form-text" type="text" placeholder="USERNAME" onChange={this.onUserName} value={this.state.userName}></input>
                    <input id="login-form-password" className="login-form-control login-form-text" type="password" placeholder="PASSWORD" onChange={this.onPassWord} value={this.state.password}></input>
                   
                    <div className="login-btn">LOGIN</div>
                    {/* <ButtonToolbar>
                        <Button href='/chat' type='button' variant="primary" onClick={this.onClick}>LOGIN</Button>
                        <Button type='button' variant="primary" onClick={(e) => this.onClick(e)}>LOGIN</Button>
                    </ButtonToolbar>  */}
                    {/* <a href='/chat'><button className="login-form-control login-form-button" type='submit' value='LOGIN'>LOGIN</button></a> */} 
                    <a className="login-form-link" href="/chat">LOST YOUR PASSWORD ?</a>
                    
                    <div className='icon-face'>
                        <i class="fab fa-facebook"></i>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default LoginPages
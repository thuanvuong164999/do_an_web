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
            infoUser: [],
            id: '#'
        }
    }

    componentDidMount() {
        this.getUser()
        this.noInfoUser()
        this.falseUserPass()
    }

    falseUserPass() {
        socket.on('user-pass-false', (value)=>{
            alert('Bạn đã nhập sai USERNAME hoặc PASSWORD.\nXin kiểm tra lại.')
        })
    }

    noInfoUser() {
        socket.on('no-input',(value) => {
            // console.log('bạn đã nhập thiếu thông tin, xin kiểm tra lại')
            alert('Bạn đã nhập thiếu thông tin \nXin kiểm tra lại')
        })
    }

    getUser(){
        socket.on('user-pass-true',(values) => {
            // console.log(values)
            // alert('đăng nhập thành công')
            values.rows.map((value, index) => {
                // console.log(value)
                let item = {
                    userName: value.username,
                    password: value.password,
                    userId: value.id
                }
                // console.log(item)
                this.setState({
                    infoUser : item,
                    id: '/chat'
                })
            })
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

    // onClick() {
    //     socket.emit('user-pass', {
    //         userName: this.state.userName,
    //         password: this.state.password
    //     })
    // }

    onClick = (event) => {
        socket.emit('user-pass', {
            userName: this.state.userName,
            password: this.state.password
        })
        if(this.state.id == '/chat'){
            
        }
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
                   
                    <div className="login-btn"> 
                        {/* onClick={this.onClick()} hàm onClick lun chạy, dù không click */}
                        <a id='login-btn' onClick={(e) => this.onClick()} href={`${this.state.id}`}>LOGIN</a>
                    </div>
                    {/* <ButtonToolbar>
                        <Button href='/chat' type='button' variant="primary" onClick={this.onClick}>LOGIN</Button>
                        <Button type='button' variant="primary" onClick={(e) => this.onClick(e)}>LOGIN</Button>
                    </ButtonToolbar>  */}
                    {/* <a href='/chat'><button className="login-form-control login-form-button" type='submit' value='LOGIN'>LOGIN</button></a> */} 
                    <a className="login-form-link" href={`${this.state.id}`}>LOST YOUR PASSWORD ?</a>
                    <div className='icon-bg'>
                        <div className='icon-list'>
                            <i class="fab fa-facebook"></i>
                            <i class="fab fa-google-plus"></i>
                            <i class="fab fa-instagram"></i>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default LoginPages
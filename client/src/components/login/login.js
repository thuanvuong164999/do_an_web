import React from 'react'
import './login.scss'
import { socket } from '../../services/socket-service/socket-service';
import Project from '../project/project'
import Oddly from '../oddly/oddly'
import {Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookie = new Cookies()
// import { Button, ButtonToolbar } from 'react-bootstrap'
class LoginPages extends React.Component {
    constructor() {
        super()
        this.state = {
            userName: '',
            password: '',
            infoUser: [],
            id: '#',
            check: '',
            logined: false
        }
    }
    componentDidMount() {
        this.getUser()
        this.noInfoUser()
        this.falseUserPass()
    }
    falseUserPass() {
        socket.on('user-pass-false', (value) => {
            alert('Bạn đã nhập sai USERNAME hoặc PASSWORD.\nXin kiểm tra lại.')
        })
    }
    noInfoUser() {
        socket.on('no-input', (value) => {
            // console.log('bạn đã nhập thiếu thông tin, xin kiểm tra lại')
            alert('Bạn đã nhập thiếu thông tin \nXin kiểm tra lại')
        })
    }
    getUser() {
        cookie.set('logined', '') //tao cookie tin hieu logined, gia tri rong
        socket.on('user-pass-true', (values) => {
            
            // cookie.set('logined', this.state.infoUser.username)
    
            // console.log(values)
            // alert('đăng nhập thành công')
            values.rows.map((value, index) => {
                // console.log(value)
                let item = {
                    userName: value.username,
                    password: value.password,
                    userId: value.user_id
                }
                cookie.set('logined', item.userName)
                // console.log(item)
                this.setState({
                    infoUser: item,
                    id: '/chat',
                    check: 'checked'
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

    onClick = (event) => {
        socket.emit('user-pass', {
            userName: this.state.userName,
            password: this.state.password
        })
        // console.log(this.state.userName, this.state.password)
    }
    renderRedirect() {
        if (this.state.id == '/chat') {
            return <Redirect to='/chat'></Redirect>
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.renderRedirect()}
                <div className='bg-lg'>
                    <div>
                        <Project></Project>
                    </div>
                    <div className='b1'>
                        <div className='oddly'>
                            <Oddly></Oddly>
                        </div>
                        <div className='inp'>
                            <input id="login-form-username" className="login-form-control" type="text" placeholder="EMAIL" onChange={this.onUserName} value={this.state.userName}></input>
                            <input id="login-form-password" className="login-form-control" type="password" placeholder="PASSWORD" onChange={this.onPassWord} value={this.state.password}></input>
                            {/* <i class={"fas fa-user-check " + this.state.check}></i> */}
                        </div>
                        <div className={"login-btn" + this.state.check}>
                            <a className='login1' onClick={(e) => this.onClick()} >LOGIN</a>
                        </div>
                        <a className="login-form-link">LOST YOUR PASSWORD ?</a>
                        <div className='icon-bg'>
                            <div className='icon-list'>
                                <i class="fab fa-facebook-square"></i>
                                <i class="fab fa-google-plus-square"></i>
                                <i class="fab fa-instagram"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default LoginPages
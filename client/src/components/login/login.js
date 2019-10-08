import React from 'react'
import './login.scss'
import { socket } from '../../services/socket-service/socket-service';
import Project from '../project/project'
import Oddly from '../oddly/oddly'

// import { Button, ButtonToolbar } from 'react-bootstrap'
class LoginPages extends React.Component {
    constructor() {
        super()
        this.state = {
            userName: '',
            password: '',
            infoUser: [],
            id: '#',
            check: ''
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
        socket.on('user-pass-true', (values) => {
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
        if (this.state.id == '/chat') {
        }
    }
    render() {
        return (
            <React.Fragment>
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
                            <a className='login1' onClick={(e) => this.onClick()} href={`${this.state.id}`}>LOGIN</a>
                        </div>
                        <a className="login-form-link" href={`${this.state.id}`}>LOST YOUR PASSWORD ?</a>
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
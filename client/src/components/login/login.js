import React from 'react'
import './login.scss'
import { socket } from '../../services/socket-service/socket-service';

class LoginPages extends React.Component {
    constructor() {
        super()
        this.state = {
            userRoom:'',
            email: '',
            password: '',
            infoUser: [],
            userId: '',
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
                    userId: value.user_id
                }
                // console.log(item)
                this.setState({
                    infoUser: item,
                    userRoom: value.username,
                    userId: value.user_id,
                    id: '/chat',
                    check: 'checked'
                })
            })
            console.log(this.state)
        })
    }

    onEmail = event => {
        this.setState({
            email: event.target.value
        })
    }

    onPassWord = event => {
        this.setState({
            password: event.target.value
        })
    }

    onClick = (event) => {

        socket.emit('user-pass', {
            userName: this.state.email,
            password: this.state.password
        })
        console.log(this.state)
        // if(this.state.id === '/chat'){
        //     socket.emit('login-chat', {
        //         userName: this.state.userRoom,
        //         userId: this.state.userId
        //     })
        // }
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
                    <input id="login-form-username" className="login-form-control login-form-text" type="text" placeholder="EMAIL" onChange={this.onEmail} value={this.state.email}></input>
                    <input id="login-form-password" className="login-form-control login-form-text" type="password" placeholder="PASSWORD" onChange={this.onPassWord} value={this.state.password}></input>

                    <i class={"fas fa-user-check " + this.state.check}></i>
                    <div className={"login-btn" + this.state.check}>
                        {/* <button type='button' id='login-btn' className='login-btn1' onClick={(e) => this.onClick()} href={`${this.state.id}`}>login</button> */}
                        {/* onClick={this.onClick()} hàm onClick lun chạy, dù không click */}
                        <a id='login-btn' className='login1' onClick={(e) => this.onClick()}>LOGIN</a>
                    </div>
                    {/* <ButtonToolbar>
                        <Button href='/chat' type='button' variant="primary" onClick={this.onClick}>LOGIN</Button>
                        <Button type='button' variant="primary" onClick={(e) => this.onClick(e)}>LOGIN</Button>
                    </ButtonToolbar>  */}
                    {/* <a href='/chat'><button className="login-form-control login-form-button" type='submit' value='LOGIN'>LOGIN</button></a> */}
                    <a className="login-form-link" href={`${this.state.id}`}>LOST YOUR PASSWORD ?</a>
                    <div className='icon-bg'>
                        <div className='icon-list'>
                            <i class="fab fa-facebook-square"></i>
                            <i class="fab fa-google-plus-square"></i>
                            <i class="fab fa-instagram"></i>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default LoginPages
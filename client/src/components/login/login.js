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
            th: '0'
        }
    }

    componentDidMount() {
        this.getUser()
        this.noInfoUser()
        // console.log(this.state.th)
    }

    noInfoUser() {
        socket.on('no-input',(value) => {
            // console.log('bạn đã nhập thiếu thông tin, xin kiểm tra lại')
            alert('Bạn đã nhập thiếu thông tin \nXin kiểm tra lại')
        })
    }

    getUser(){
        socket.on('user-login',(values) => {
            // console.log(values)
            values.rows.map((value, index) =>{})})}
                // console.log(value)
            //     if(value.userName !== ''){
            //         this.setState({
            //             th: '1'
            //         })
            //     }
            //     if(this.state.th === '1'){
            //         let item = {
            //             userName: value.username,
            //             password: value.password,
            //             userId: value.id
            //         }
            //         // console.log(item)
            //     } else{
            //         let item = {
            //             userName: '',
            //             password: ''
            //         }
            //         console.log(item)
            //     }
            // })

            // let userName1 = this.state.userName
            // let userName2 = this.item.userName
            // let password1 = this.state.password
            // let password2 = this.item.password
            
            // if((userName1 !== userName2) || (password1 !== password2)) {
            //     alert('Bạn đã nhập sai thông tin. \nXin kiểm tra lại.')
            // } else{
            //     alert('Đăng nhập thành công')
            // }
    //     })
    // }
    
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
                   
                    <div className="login-btn" onClick={(e) => this.onClick(e)}>LOGIN</div>
                    {/* <ButtonToolbar>
                        <Button href='/chat' type='button' variant="primary" onClick={this.onClick}>LOGIN</Button>
                        <Button type='button' variant="primary" onClick={(e) => this.onClick(e)}>LOGIN</Button>
                    </ButtonToolbar>  */}
                    {/* <a href='/chat'><button className="login-form-control login-form-button" type='submit' value='LOGIN'>LOGIN</button></a> */} 
                    <a className="login-form-link" href="/chat">LOST YOUR PASSWORD ?</a>
                    <div>
                        <div className='icon-face'>
                            <i class="fab fa-facebook"></i>
                        </div>
                        <div className='icon-gg'>
                            <i class="fab fa-google-plus"></i>
                        </div>
                        <div className='icon-ins'>
                            <a><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default LoginPages
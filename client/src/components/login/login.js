import React from 'react'
import './login.scss'
import { socket } from '../../services/socket-service/socket-service';
import Project from '../project/project'
import Oddly from '../oddly/oddly'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookie = new Cookies()
// import { Button, ButtonToolbar } from 'react-bootstrap'

class LoginPages extends React.Component {
    constructor() {
        super()
        this.state = {
            userId: '',
            userName: '',
            password: '',
            id: '#',
            logined: false
        }
    }
    componentDidMount() {

    }

    saveUserExaming(userName, password) {
        socket.on(`userpassfalse${userName}`, (value) => {
            // console.log(`userpassfalse${cookie.get('userName')}`)
            alert('Bạn đã nhập sai USERNAME hoặc PASSWORD.\nXin kiểm tra lại.')
        })

        socket.on(`userpasstrue${userName}`, (values) => {
            // console.log(`userpasstrue${cookie.get('userName')}`)
            // console.log(values)
            // alert('đăng nhập thành công')
            values.rows.map((value, index) => {
                // console.log(value)
                let item = {
                    userName: value.username,
                    password: value.password,
                    userId: value.id
                }
                cookie.set('loginId', item.userId)
                cookie.set('logined', item.userName)
                this.setState({
                    id: '/chat'
                })
            })
        })

        // socket.on(`Examing-${userName}-${password}`, (value) => {
        //     // console.log(value)
        //     let cookie = new Cookies()
        //     cookie.set('userName', value.userName)

        //     socket.on(`userpassfalse${cookie.get('userName')}`, (value) => {
        //         // console.log(`userpassfalse${cookie.get('userName')}`)
        //         alert('Bạn đã nhập sai USERNAME hoặc PASSWORD.\nXin kiểm tra lại.')
        //     })

        //     socket.on(`userpasstrue${cookie.get('userName')}`, (values) => {
        //         // console.log(`userpasstrue${cookie.get('userName')}`)
        //         // console.log(values)
        //         // alert('đăng nhập thành công')
        //         values.rows.map((value, index) => {
        //             // console.log(value)
        //             let item = {
        //                 userName: value.username,
        //                 password: value.password,
        //                 userId: value.id
        //             }
        //             cookie.set('loginId', item.userId)
        //             cookie.set('logined', item.userName)
        //             this.setState({
        //                 id: '/chat'
        //             })
        //         })
        //     })
        // })
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
        cookie.set('userName', '')
        let userName = this.state.userName
        let password = this.state.password
        if (userName === '' || password === '') {
            alert('Bạn đã nhập thiếu thông tin \nXin kiểm tra lại')
        } else {
            socket.emit('user-pass', {
                userName: this.state.userName,
                password: this.state.password
            })
        }
        this.saveUserExaming(userName, password)
    }
    
    renderRedirect() {
        if (this.state.id === '/chat') {
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
                            <input id="login-form-username" className="control" type="text" placeholder="EMAIL" onChange={this.onUserName} value={this.state.userName}></input>
                            <input id="login-form-password" className="control" type="password" placeholder="PASSWORD" onChange={this.onPassWord} value={this.state.password}></input>
                            {/* <i class={"fas fa-user-check " + this.state.check}></i> */}
                        </div>
                        <div className={"login-btn" + this.state.check}>
                            <button className='login1' onClick={(e) => this.onClick()} >LOGIN</button>
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
import React from 'react'
import './head-chatbox.scss'
import { socket } from '../../services/socket-service/socket-service'
import Cookies from 'universal-cookie'

class HeadChatBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            roomName: 'Introduce My Project',
            room:'',
            avatar:'',
            typeRoom: [],
            userName:'',
            typeRoom1: 'channel',
            typeRoom2: 'messenger',
            type1:'',
            type2:'',
            appearSearch: '',
            dropdownSet: '',
            status: '',
        }
    }

    componentDidMount() {
        this.loginChat()
        this.inRoomName()
    }

    loginChat() {
        let cookie = new Cookies()
        this.setState({
            userName: cookie.get('logined')
        })
    }

    inRoomName() {
        socket.on('join-in-room', (value) => {
            // console.log(value)
            this.setState({
                status: (value.status==='offline')?'far':'fas',
                roomName: value.roomName,
                room: value.room,
                appearSearch: 'appear-search'
            })
        })
        socket.on('type-in-room', (value) => {
            // console.log(value)
            let item = {
                user: value.userName,
                ava: value.avatar,
                type1: value.typeroom === this.state.typeRoom1 ? 'type1' : '',
                type2: value.typeroom === this.state.typeRoom2 ? 'type2' : ''
            }
            // console.log(item)
            this.setState({
                type1: item.type1,
                type2: item.type2
            })
        })
    }

    onClick = (event) => {
        if(this.state.dropdownSet === ''){
            this.setState({
                dropdownSet: 'On'
            })
        } else {
            this.setState({
                dropdownSet: ''
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='headchatbox-bg'>
                    <div className='bg-status-room'>
                        {/* <div className={'type-room ' + this.state.type1 + this.state.type2}></div> */}
                        <div className='bg-icon-type'>
                            <span><i className={"fas fa-hashtag " + this.state.type2}></i></span>
                            <span><i className={this.state.status + " fa-circle " + this.state.type2}></i></span>
                        </div>
                        <div className='input-name'><b>{this.state.roomName}</b></div>
                    </div>
                    
                    <div className='bg-list-icon'>
                        <div className='setting' onClick = {() => this.props.updateItemWidth()}>
                            <div className='icon-setting'>
                                <i className="fas fa-cog"></i>
                            </div>
                            <span className={"tooltiptext " + this.state.dropdownSet}>Settings</span>
                            <span class={"dropdown-setting " + this.state.dropdownSet}>
                                <ul className='list-setting'>
                                    <li>Thông tin về phòng</li>
                                    <li>Đổi tên phòng</li>
                                    <li>Thay đổi màu</li>
                                </ul>
                            </span>
                        </div>
                        <div className={'search-box ' + this.state.appearSearch}>
                            <input className='search-txt' type='text' name='' placeholder='Search...'></input>
                            <div className='search-btn' href='#'>
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HeadChatBox
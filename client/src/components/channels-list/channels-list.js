import React from 'react'
import './channels-list.scss'
import { serverEndPoint, socket, userName } from '../../services/socket-service/socket-service'

const axios = require('axios')


class ChannelList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            room: [],
            roomName: '',
            avatar: '',
            typeroom: 'channel',
            openList: ''
        }
    }

    componentDidMount() {
        this.openList()

        let self = this

        axios.get(`${serverEndPoint}/api/room-list/chanels`)
            .then(function (response) {
                self.setState({
                    room: response.data.data
                })
            })
            .catch(function (error) {
                // console.log(error);
            })
            .finally(function () {

            });
    }

    openList(){
        socket.on('open-list', (value) => {
            if(this.state.openList==='') {
                this.setState({
                    openList: 'open-list'
                })
            } else {
                this.setState({
                    openList: ''
                })
            }
        })
    }

    onClick = (event, id, name) => {
        // console.log('Clicked', id)
        socket.emit('join', {
            userName: userName,
            room: id
        })
        socket.emit('join-room', {
            roomName: name,
            room: id
        })
        socket.emit('type-room', {
            room: id,
            avatar: this.state.avatar,
            userName: userName,
            typeroom: this.state.typeroom
        })
    }

    onClick1 = (event) => {
        socket.emit('appear-list', {
            openList: ''
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className='chanellist-bg'>
                    <div className='title-chanels'>
                        <i className={"plus-icon fas fa-plus-circle " + this.state.openList} onClick={(e) => this.onClick1(e)}></i>
                        <i className={"minus-icon fas fa-minus-circle " + this.state.openList} onClick={(e) => this.onClick1(e)}></i>
                        <div className='title'>Chanels</div>
                    </div>
                    <div className={'list-bg ' + this.state.openList}>
                        <ul className='list'>
                            {
                                this.state.room.map((value, index) => {
                                    return (
                                        <li key={index} onClick={(e) => this.onClick(e, value.id, value.name)}>
                                            <div className='type-room-icon'>
                                                <i className="fas fa-hashtag"></i>
                                            </div>
                                            {value.name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ChannelList
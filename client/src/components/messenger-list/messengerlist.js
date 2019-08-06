import React from 'react'
import './messengerlist.scss'
import { serverEndPoint, socket, userName } from '../../services/socket-service/socket-service'
const axios = require('axios');

class MessList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            room: [],
            inRoomName:''
        }
    }

    componentDidMount() {
        this.onJoin()

        let self = this

        axios.get(`${serverEndPoint}/api/room-list/messengers`)
            .then(function (response) {
                self.setState({
                    room: response.data.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {

            });
    }

    onJoin() {
        socket.on('joinApp', (value) => {
            console.log(value)
        })
    }

    onClick = (event, id, name) => {
        console.log('Clicked', id)

        socket.emit('join', {
            userName: userName,
            room: id,
            inRoomName: name
        })
    }

    render() {
        return (
            <React.Fragment>
                <ul className='messengerlist-bg'>
                    <div className='addb'>
                        + Add the chanels
                    </div>
                    <li className='title-chanels'>
                        <i class="fas fa-plus-circle"></i>
                        <div className='title'>Direct message</div>
                    </li>
                    <li className='list'><ul>
                        {
                            this.state.room.map((value, index) => {
                                return (
                                    <li key={index} onClick={(e) => this.onClick(e, value.id, value.name)}>{value.name}</li>
                                )
                            })
                        }
                    </ul></li>
                </ul>
                
            </React.Fragment>
        )
    }
}

export default MessList


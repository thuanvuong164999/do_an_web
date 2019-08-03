import React from 'react'
import './messengerlist.scss'
import { serverEndPoint, socket, userName } from '../../services/socket-service/socket-service'

const axios = require('axios');

class MessList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            room: []
        }
    }

    componentDidMount() {
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

    onClick = (event, id) => {
        console.log('Clicked', id)

        socket.emit('join', {
            userName: userName,
            room: id
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className='messengerlist-bg'>
                    <div className='title-chanels'>
                        <div className='title'>Direct message</div>
                        <div className='plus-icon'></div>
                    </div>
                    <ul>
                        {
                            this.state.room.map((value, index) => {
                                return (
                                    <li key={index} onClick={(e) => this.onClick(e, value.id)}>{value.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default MessList


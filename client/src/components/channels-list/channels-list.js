import React from 'react'
import './channels-list.scss'
import { serverEndPoint, socket, userName } from '../../services/socket-service/socket-service'

const axios = require('axios')


class ChannelList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            room: []
        }
    }

    componentDidMount() {
        let self = this

        axios.get(`${serverEndPoint}/api/room-list/chanels`)
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
                <div className='chanellist-bg'>
                    <div className='title-chanels'>
                        <p className='title'>Chanels</p>
                        <p className='plus-icon'></p>
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

export default ChannelList
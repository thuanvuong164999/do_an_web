import React from 'react'
import './room-list.scss'
import { serverEndPoint, socket, userName } from '../../services/socket-service/socket-service'
import ChannelList from '../channels-list/channels-list';
import MessList from '../messenger-list/messengerlist';

const axios = require('axios');

class RoomList extends React.Component {
    constructor() {
        super()

        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
        let self = this

        axios.get(`${serverEndPoint}/api/room-list`)
            .then(function (response) {
                // console.log(response);
                // console.log(response.data.data);
                self.setState({
                    rooms: response.data.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {

            });

        axios.get(`${serverEndPoint}/api/room-list/messengers`)
            .then(function (response) {
                self.setState({
                    rooms_messenger: response.data.data
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
                <div className='room-bg'>
                    {
                        <ChannelList></ChannelList>
                    }
                    {
                        <MessList></MessList>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default RoomList
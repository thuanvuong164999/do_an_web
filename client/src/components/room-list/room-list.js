import React from 'react'
import './room-list.scss'
import { serverEndPoint, socket, userName } from '../../services/socket-service/socket-service'
import ChannelList from '../channels-list/channels-list';
import MessList from '../messenger-list/messengerlist';
import Serch from '../serch/serch'

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
    }

    render() {
        return (
            <React.Fragment>
                {
                    <Serch></Serch>
                }
                <ul className='room-bg'>
                    <li>{
                        <ChannelList></ChannelList>
                    }</li>
                    <li>{
                        <MessList></MessList>
                    }</li>
                </ul>
            </React.Fragment>
        )
    }
}

export default RoomList
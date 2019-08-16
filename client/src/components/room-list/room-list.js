import React from 'react'
import './room-list.scss'
import { serverEndPoint, socket, userName } from '../../services/socket-service/socket-service'
import ChannelList from '../channels-list/channels-list';
import MessList from '../messenger-list/messengerlist';
import Serch from '../serch/serch'
import ScrollToBottom from 'react-scroll-to-bottom';

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
                <ScrollToBottom>
                    {
                        <ChannelList></ChannelList>
                    }
                    {
                        <MessList></MessList>
                    }
                </ScrollToBottom>
            </React.Fragment>
        )
    }
}

export default RoomList
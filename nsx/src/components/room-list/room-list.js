import React from 'react'
import './room-list.scss'
import { serverEndPoint, userName, socket } from '../../services/socket-service/socket-service'

const axios = require('axios');

class RoomList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            room: []
        }
    }

    componentDidMount() {
        console.log(serverEndPoint)
        let self = this
        axios.get(`${serverEndPoint}/api/room-list`)
            .then(function (response) {
                console.log(response.data.data)
                self.setState({
                    room: response.data.data
                })
            })
            .catch(function(error) {
                console.log(error)
            })
            .finally(function (response) {
                
            });
            // gọi api trong database
        }

    onClick = (event, id) => {
        console.log('clicked', id)
        socket.emit('join', {
           userName: userName,
           room: id
          })
        }    //gửi tín hiệu lên server

    render() {
        return (
            <React.Fragment>
                <div className='room-bg'>
                    {/* <ul>
                        <li>D002</li>
                        <li>common</li>
                    </ul> */}
                    <ul>
                        {
                            this.state.room.map((value, index) => {
                                return(
                                    <li key={index} onClick={(e) => this.onClick(e,value.id)}>{value.name}</li>
                                )        //2:biến       biến (event)                biến (id) trong database
                            })
                        }
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default RoomList
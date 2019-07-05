import React from 'react'
import './room-list.scss'
import { serverEndPoint, socket, userName } from '../../services/socket-service/socket-service'

const axios = require('axios');


class RoomList extends React.Component {

    constructor() {
        super()

        this.state = {
            // khai báo biến (ban đầu rỗng)
            rooms: []
        }
    }

    // mõi comp có 1 componentDidMount() sử lý nội bộ trong comp
    componentDidMount() {

        console.log(serverEndPoint) //xem serverEndPoint có hd hk

        let self = this // tạo khu self rỗng chứa nội dung của this
        // gọi API (không có dấu cách)
        axios.get(`${serverEndPoint}/api/room-list`)
            .then(function (response) {
                // handle success
                // console.log(response);
                console.log(response.data.data);
                // thay đổi nội dung trong self
                self.setState({
                    rooms: response.data.data // gán giá trị response.data.data vào rooms
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    onClick = (event, id) => { //tạo event click để show ra data
        console.log('Clicked', id) //id là id trong database

        socket.emit('join', { //khi click vào socket sẽ gữi server (emit) tín hiệu join, userName, room
            userName: userName,
            room: id
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className='room-bg'>
                    <ul>
                        <li className='test-li'>
                            <div className='li-title'>D002</div>
                            <div className='join-room-btn'>

                            </div>
                        </li>
                        {/* gọi data trong api ra html */}
                        {
                            this.state.rooms.map((value,index) => { //nhiều data (map) trong rooms được truyền vào value 
                                return(
                                    <li key={index} onClick={(e) => this.onClick(e, value.id)}>{value.name}</li> 
                                    // e : event
                                )
                            })
                        }
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default RoomList
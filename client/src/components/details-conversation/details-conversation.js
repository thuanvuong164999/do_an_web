import React from 'react'
import './details-conversation.scss'
import { socket } from '../../services/socket-service/socket-service';

class DetailRoom extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            openInfo: '',
            ofInfo: 'off-info-room',
            room: ''
        }
    }

    componentDidMount(){
        this.openInfoRoom()
        this.ofInfoRoom()
    }

    ofInfoRoom() {
        socket.on('off-info', (value) => {
            this.setState({
                openInfo:'',
                ofInfo: value.ofInfo
            })
        })
    }

    openInfoRoom() {
        socket.on('info-in-room', (value) => {
            // console.log(value)
            if(value.openInfo === this.state.openInfo){
                this.setState({
                    openInfo: ''
                })
            } else {
                this.setState({
                    openInfo: 'open-info',
                    room: value.room,
                    ofInfo:''
                })
            }
        })
    }

    onClick = (event) => {
        socket.emit('off-info-room', {
            ofInfo: this.state.ofInfo, //'off-info-room'
            room: this.state.room
        })
    }

    render() {
        return(
            <React.Fragment>
                <div className={'details-room-bg ' + this.state.openInfo}>
                    <div className='details-title'>
                        <div className='title-txt'>About this conversation</div>
                        <div className='out-details-icon' onClick={(e) => this.onClick(e)}>
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                    <div className='detail-form'>
                        <div className='member-list'>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default DetailRoom
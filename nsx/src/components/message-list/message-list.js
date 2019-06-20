import React from 'react'
import './message-list.scss'
import MessageItem from '../message-item/message-item';
import ScrollToBottom from 'react-scroll-to-bottom';

class MessageList extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    render() {
        return (
            <React.Fragment>
                <div className='message-list-container'>
                    <ScrollToBottom className='message-list'>
                        {
                            this.props.messages.map((value, index) => {
                                return(
                                    <MessageItem key={index} value={value}></MessageItem>
                                )
                            })
                        }
                    </ScrollToBottom>
                </div>
            </React.Fragment>
        )
    }
}

export default MessageList
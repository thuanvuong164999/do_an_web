import React from 'react'
import './message-item.scss'
import Avatar from 'react-avatar';

class MessageItem extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className='message-item'>
                    <div className={'message-item-avatar ' + this.props.value.fr}>
                        <div className='avatar-img'>
                            <Avatar name={this.props.value.user} size="50" maxInitials={2} round={true} />
                        </div>
                    </div>
                    <div className={'message-item-content ' + this.props.value.fr}>
                        <div className='content'>
                            <span className='chat-user'>
                                {this.props.value.user}  <p className='user-date'>{this.props.value.DaT}</p></span>
                        </div>
                        <div className='created'>
                            {this.props.value.DaT}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default MessageItem
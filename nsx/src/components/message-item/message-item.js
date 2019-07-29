import React from 'react'
import './message-item.scss'
import Avatar from 'react-avatar'

class MessageItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <React.Fragment>
                <div className='message-item' id='srl'>
                    <div className={'message-item-avatar ' + this.props.value.fr }>
                        <div className='avatar-img'>   
                                <Avatar name={this.props.value.user} size="50" maxInitials={2} round={true} />
                        </div>
                    </div>
                    <div className={'message-item-content ' + this.props.value.fr}>
                        <div className='content'>
                            <span className='chat-user'>
                            {this.props.value.user}  <p className='user-date'>{this.props.value.DaT}</p></span>
                            
                            <br></br>
                            
                            <span className='chat-content' dangerouslySetInnerHTML={{__html:this.props.value.message}}></span>
                        </div>
                        <div className='created'>
                            {this.props.value.created}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default MessageItem
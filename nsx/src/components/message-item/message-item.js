import React from 'react'
import './message-item.scss'
import Avatar from 'react-avatar';
import ScrollToBottom from 'react-scroll-to-bottom';

class MessageItem extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    render() {
        return (
            <React.Fragment>
                <ScrollToBottom>
                <div className='message-item'>
                    <div className={'message-item-avatar ' + this.props.value.fr }>
                        <Avatar name={this.props.value.user} size="50px" round="50px" maxinitial={2} />
                    </div>
                    <div className={'message-item-content ' + this.props.value.fr}>
                        <div className='content'>
                            <div dangerouslySetInnerHTML={{__html:this.props.value.message}}></div>
                        </div>
                        <div className='created'>
                            {this.props.value.createAt}
                        </div>
                    </div>
                </div>
                </ScrollToBottom>
            </React.Fragment>
        )
    }
}

export default MessageItem
import React from 'react'
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import { Picker, emojiIndex } from 'emoji-mart';
import {socket} from '../../services/socket-service/socket-service'

class SendMessage extends React.Component {
  constructor(props) {
    super(props)

    var today = new Date(),
      ddate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate(),
      ttime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    this.state = {
      DaT: '',  //Date and Time
      receiveMessages: '',
      buttonTitle: 'Join',
      userName: 'K son',
      message: '',
      emoji: '',
      avatar: '', //Avatar by shorten userName
      changeInput: '',
      open: false,  //noti EmojiMenu was opened ?? 
      date: ddate,
      time: ttime,
      messages: [
      ],
      room:0
    }
  }


  componentDidMount() {
    this.onJoined()
    this.onLeaved()
    // this.onTypingFromMember()
    //this.openEmojiMenu()
    //this.closeEmojiMenu()
    //this.setZindexMenuON()
    //this.setZindexMenuOFF()
  }

  onOffEmoij = event => {
    if (this.state.open) {
      this.setState({
        open: false
      })
      //this.closeEmojiMenu(event)
      //this.setZindexMenuOFF(event)
    } else {
      this.setState({
        open: true
      })
      //this.openEmojiMenu(event)
      //this.setZindexMenuON(event)
    }
    event.preventDefault() //Tranh bi lap lai 
  }

  setZindexMenuON = event => {
    document.getElementById("overlay-menu").style.zIndex = "1022"
    document.getElementById("emoji-menu-btn").style.zIndex = "1025"
  }
  setZindexMenuOFF = event => {
    document.getElementById("overlay-menu").style.zIndex = "-1"
    document.getElementById("emoji-menu-btn").style.zIndex = "0"
  }
  openEmojiMenu = event => {
    document.getElementById("emoji-mart").style.display = "block"
  }

  closeEmojiMenu = event => {
    document.getElementById("emoji-mart").style.display = "none"
  }

  onJoined() {
    socket.on('joined', (user) => {
      console.log('Joined: ', user)
      this.setMessage(`User ${user.userName} joined`)
      this.setState({
        room: user.room
      })
    })
  }

  onLeaved() {
    socket.on('leaved', (user) => {
      console.log('Leaved: ', user)
      this.setMessage(`User ${user.userName} leaved`)
    })
  }

  setMessage(message) {
    let messages = this.state.receiveMessages
    // messages = messages + '\n' + message
    messages = message + '\n' + messages
    this.setState({
      receiveMessages: messages
    })
  }

  onKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (event.target.value === '')
        return;
      else {
        socket.emit('send-message', {
          userName: this.state.userName,
          message: event.target.value,
          room: this.state.room
        })
        this.setState({
          message: ''
        })
      }

      //Auto scroll messages to bottom
      /*var objDiv = document.getElementById("style-1");
      objDiv.scrollTop = objDiv.scrollHeight;
      */
      var today = new Date(),
        ddate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate(),
        ttime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      if (today.getMinutes() < 10)
        ttime = today.getHours() + ':0' + today.getMinutes() + ':' + today.getSeconds();
      else
        ttime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

      this.setState({
        message: '',
        date: ddate,
        time: ttime
      })
    }
  }

  onClick = event => {
    let title = 'Join'
    if (this.state.buttonTitle === 'Join') {
      title = 'Leave'
      this.join()
    } else {
      this.leave()
    }

    this.setState({
      buttonTitle: title
    })
  }

  join() {
    socket.emit('join', {
      userName: this.state.userName,
      avatar: this.state.avatar
    })
  }

  leave() {
    socket.emit('leave', {
      userName: this.state.userName
    })
  }

  onChange = event => {
    this.setState({
      message: event.target.value
    })

    this.setState({
      changeInput: '<span role="image" aria-label="slightly-smiling-face">&#x1f642</span>'
    })

    socket.emit('typing', {
      userName: this.state.userName,
      text: event.target.value
    })
  }



  render() {
    return (
      <React.Fragment>
        <div className='send-message-field'>
          <div className='input-area'>

            <ReactTextareaAutocomplete
              className='input'
              row="1"
              data-emojiable="true"
              value={this.state.message}
              onKeyPress={this.onKeyPress}
              onChange={this.onChange}
              loadingComponent={() => <span>Loading</span>}
              placeholder='Type your message here ...'
              trigger={{
                ':': {
                  dataProvider: token =>
                    emojiIndex.search(token).map(o => ({
                      colons: o.colons,
                      native: o.native,
                    })),
                  component: ({ entity: { native, colons } }) => (
                    <div>{`${colons} ${native}`}</div>
                  ),
                  output: item => `${item.native}`,
                },
              }}
            />
            <div className='emoji-btn-menu' id='emoji-menu-btn'>
              <button type='button' className='emoji-menu' onClick={e => this.onOffEmoij(e)} id='emoji-menu-btn'>
                <i className="far fa-smile fa-2x" id='emoji-menu-btn'></i>
              </button>
            </div>

          </div>
        </div>
        {/* <div className='send-message-action'>
          <button className='join-leave-btn' onClick={e => this.onClick(e)}>{this.state.buttonTitle}</button>
        </div> */}
        {this.state.open ? (<Picker set="emojione" onSelect={this.addEmoji} />) : null}

      </React.Fragment>
    )
  }
}
export default SendMessage
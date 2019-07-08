import React from 'react'
import {socket, userName} from '../../services/socket-service/socket-service'

// import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
// npm i @webscopeio/react-textarea-autocomplete --save
// import { Picker, emojiIndex } from 'emoji-mart';
// npm i emoji-mart --save

class SendMessage extends React.Component {
  constructor(props) {
    super(props)
    // let SocketService = new SocketService()
    // SocketService.join('ks')

    var today = new Date(), //khai báo khu chứa today, chứa ttin ra Date()
      ddate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate(),
      ttime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    this.state = {
      DaT: '',
      receiveMessages: '',
      buttonTitle: 'Join',
      userName: userName,
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

  // onOffEmoij = event => {
  //   if (this.state.open) {
  //     this.setState({
  //       open: false
  //     })
  //     //this.closeEmojiMenu(event)
  //     //this.setZindexMenuOFF(event)
  //   } else {
  //     this.setState({
  //       open: true
  //     })
  //     //this.openEmojiMenu(event)
  //     //this.setZindexMenuON(event)
  //   }
  //   event.preventDefault() //Tranh bi lap lai 
  // }

  // setZindexMenuON = event => {
  //   document.getElementById("overlay-menu").style.zIndex = "1022"
  //   document.getElementById("emoji-menu-btn").style.zIndex = "1025"
  // }
  // setZindexMenuOFF = event => {
  //   document.getElementById("overlay-menu").style.zIndex = "-1"
  //   document.getElementById("emoji-menu-btn").style.zIndex = "0"
  // }
  // openEmojiMenu = event => {
  //   document.getElementById("emoji-mart").style.display = "block"
  // }

  // closeEmojiMenu = event => {
  //   document.getElementById("emoji-mart").style.display = "none"
  // }

  onJoined() {
    socket.on('joined', (user) => {
      console.log('Joined: ', user)
      this.setMessage(`User ${user.userName} joined`)
      this.setState({
        room:user.room
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

  onKeyPress = event => { //tạo event onKeyPress, sử dụng khi có sự thay đổi trên bàn phím
    if (event.key === 'Enter') { //nếu event nhận khí tự trên bàn phím là Enter
      // event.preventDefault()
      if (event.target.value === '') 
        return;
      else {
        console.log(event.target.value)
        socket.emit('send-message', { //socket gữi lên server tín hiệu send-message và ...
          userName: this.state.userName,
          message: event.target.value,
          room: this.state.room
        })
      }

      var today = new Date(), //biền today chứa nội dung có thể trả ra thờ gian (Date())
        ddate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate(),
        //biến ngày   //lấy năm trong Date() / (lấy tháng trong Date() + 1) / lấy ngày trong Date()
        ttime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        //biến giờ   //lấy giờ trong Date() : lấy phút trong Date() : lấy phút trong Date()
      if (today.getMinutes() < 10) //nếu phút trong Date() < 10
        ttime = today.getHours() + ':0' + today.getMinutes() + ':' + today.getSeconds();
      else
        ttime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

      this.setState({ //liệt kê các biến có thể thay đổi
        message: '',
        date: ddate,
        time: ttime
      })
      // state chì liệt kê các biến, mún thay đổi các biến thì phài sử dụng this.setState
    }
  }

  onClick = event => { //tạo event onClick, sử dụng khi click vào 1 đồi tượng
    let title = 'Join' //gán text Join vào biền title
    if (this.state.buttonTitle === 'Join') { //nếu giá trị text trong this.state.buttonTitle là text Join
      title = 'Leave' //giá trị Leave (mới) được gán vào Join thay thế cho Join
      this.join() //thực hiện hàm join()
    } else { //ngược lại
      this.leave() //thực hiện hàm leave()
    }
    this.setState({ //biến có thể thay đổi trong event
      buttonTitle: title //giá trị trong title được gán vào buttonTitle
    })
  }

  join() { //gọi hàm join()
    socket.emit('join', { //socket gửi cho server tính hiệu join và ...
      userName: this.state.userName, 
      avatar: this.state.avatar
    })
  }

  leave() { //gọi hàm leave()
    socket.emit('leave', { //socket gửi cho server tín hiệu leave
      userName: this.state.userName
    })
  }

  onChange = event => { //gọi event onChange, sử dụng cho đối tượng có sự thay đổi liên tục
    this.setState({ //khai báo giá trị thay đổi trong event
      message: event.target.value
    })

    this.setState({ 
      changeInput: '<span role="image" aria-label="slightly-smiling-face">&#x1f642</span>'
    })

    socket.emit('typing', { //socket gữi tín hiệu typing cho server
      userName: this.state.userName,
      text: event.target.value
    })
  }

  render() { //nội dung html, front_end trong class
    return (
      <React.Fragment>
        <div className='send-message-field'>
          <div className='input-area'>
          <input className='input' value={this.state.message} onKeyPress={this.onKeyPress} onChange={this.onChange}></input>
          </div>
        </div>
        <div className='send-message-action'>
          <button className='join-leave-btn' onClick={e => this.onClick(e)}>{this.state.buttonTitle}</button>
        </div>
      </React.Fragment>
    )
  }

//   render() {
//     return (
//       <React.Fragment>
//         <div className='send-message-field'>
//           <div className='input-area'>

//             <ReactTextareaAutocomplete
//               className='input'
//               // row="1"
//               data-emojiable="true"
//               value={this.state.message}
//               onKeyPress={this.onKeyPress}
//               onChange={this.onChange}
//               loadingComponent={() => <span>Loading</span>}
//               placeholder='Type your message here ...'
//               trigger={{
//                 ':': {
//                   dataProvider: token =>
//                     emojiIndex.search(token).map(o => ({
//                       colons: o.colons,
//                       native: o.native,
//                     })),
//                   component: ({ entity: { native, colons } }) => (
//                     <div>{`${colons} ${native}`}</div>
//                   ),
//                   output: item => `${item.native}`,
//                 },
//               }}
//             />
//             <div className='emoji-btn-menu' id='emoji-menu-btn'>
//               <button type='button' className='emoji-menu' onClick={e => this.onOffEmoij(e)} id='emoji-menu-btn'>
//                 <i className="far fa-smile fa-2x" id='emoji-menu-btn'></i>
//               </button>
//             </div>

//           </div>
//         </div>
//         <div className='send-message-action'>
//           <button className='join-leave-btn' onClick={e => this.onClick(e)}>{this.state.buttonTitle}</button>
//         </div>
//         {this.state.open ? (<Picker set="emojione" onSelect={this.addEmoji} />) : null}

//       </React.Fragment>
//     )
//   }
}

export default SendMessage
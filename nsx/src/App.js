import React from 'react';
import './App.scss';
import Chat from './components/chat/chat'
import RoomList from './components/room-list/room-list';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Chat></Chat>
        </div>
      </React.Fragment>
    )
  }
}

export default App;

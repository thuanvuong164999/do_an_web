import React, { Component } from 'react';
import './App.scss';
import Chat from './components/chat/chat';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <Chat></Chat>
        </div>
      </React.Fragment>
    )
  }
}

export default App;

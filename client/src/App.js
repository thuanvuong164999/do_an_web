import React from 'react';
import './App.scss';
import Chat from './components/chat/chat'
import MainRouter from './router';


class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          {/* <Chat></Chat> */}
          <MainRouter></MainRouter>
        </div>
      </React.Fragment>
    )
  }
}

export default App;

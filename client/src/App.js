import React from 'react';
import './App.scss';
import MainRouter from './router';


class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <MainRouter></MainRouter>
        </div>
      </React.Fragment>
    )
  }
}

export default App;

import React from 'react';
import './App.scss';
import MainRouter from './router';
import {ListenService} from './services/listen'
import { cookieM } from './services/system';


class App extends React.Component {
  componentDidMount(){
    let self = this
    cookieM.setLang('en')
    ListenService.language.onSwitchLang().subscribe(
      () => {
        
        self.setState({})
      }
    )
  }

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

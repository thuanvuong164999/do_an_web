import React from 'react'
import './sidebar.scss'
import { cookieM, locale } from '../../services/system'

class SideBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lan: 'vi',
            lang: 'on'
        }
    }
    onClick() {
        cookieM.setLang(this.state.lan)
        // console.log(this.state.lan)
        if (this.state.lan === 'vi') {
            this.setState({
                lan: 'en',
            })
        } else {
            this.setState({
                lan: 'vi',
            })
        }
    }

    render() {

        return (
            <React.Fragment>
                <div class="navbar" id="navID">
                    <ul class="side-nav">
                        <li class="nav-item1">
                            <a href="#" class="site"><h2>M.E.R</h2></a></li>
                        <li class="llink">
                            <div class="toggle slide2">
                                <input id="d" type="checkbox" onClick={() => this.onClick()} />
                                <label for="d">
                                    <div class="card"></div>    
                                </label>
                            </div>
                            
                            {/* <div className='language'><p>{locale.lang}</p></div> */}
                        </li>
                        <li class="nav-item">
                            <a href="#" class="llink"><span>Hoang</span></a></li>
                        <li class="nav-item">
                            <a href="#" class="llink">Son</a></li>
                        <li class="nav-item">
                            <a href="#" class="llink">Thuan</a></li>
                        <li class="nav-item">
                            <a href="#" class="llink">An</a></li>
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default SideBar
import React from 'react'
import './sidebar.scss'
import { socket } from '../../services/socket-service/socket-service'
import Cookies from 'universal-cookie'

class SideBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <div class="navbar" id="navID">
                    <ul class="side-nav">
                        <li class="nav-item1">
                            <a href="#" class="site"><h2>M.E.R</h2></a></li>
                        <li class="llink">
    
                            <label class="switch">
                                <input type="checkbox"></input>
                                <span class="slider"></span>
                            </label>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="llink"><span>Hoang</span></a></li>
                        <li class="nav-item">
                            <a href="#" class="llink">Son</a></li>
                        <li class="nav-item">
                            <a href="#" class="llink">Thuan</a></li>
                        <li class="nav-item">
                            <a href="#" class="llink">An</a></li>
                        <li class="llink">
                            <label class="switch">
                                <input type="checkbox"></input>
                                <span class="slider"></span>
                            </label>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default SideBar
import React from 'react'
import './project.scss'

class Project extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className='bg-nav'>
                    <div class="navigation">
                        <input type="checkbox" id="nav-toggle" class="nav-checkbox"></input>
                        <label for="nav-toggle" class="nav-btn">
                            <span class="nav-icon"></span></label>
                        <div class="nav-bg"></div>
                        <div class="nav">
                            <ul class="nav-list">
                                <li class="nav-item"><a href="#" class="nav-link">Hoang</a></li>
                                <li class="nav-item"><a href="#" class="nav-link">Son</a></li>
                                <li class="nav-item"><a href="#" class="nav-link">Thuan</a></li>
                                <li class="nav-item"><a href="#" class="nav-link">information for project</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Project
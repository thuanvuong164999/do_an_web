import React from 'react'
import './project.scss'

class Project extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className='bg-nav'>
                    <div className="navigation">
                        <input type="checkbox" id="nav-toggle" className="nav-checkbox"></input>
                        <label for="nav-toggle" className="nav-btn">
                            <span className="nav-icon"></span></label>
                        <div className="nav-bg"></div>
                        <div className="nav">
                            <ul className="nav-list">
                                <li className="nav-item"><a href="#" class="nav-link">Hoang</a></li>
                                <li className="nav-item"><a href="#" class="nav-link">Son</a></li>
                                <li className="nav-item"><a href="#" class="nav-link">Thuan</a></li>
                                <li className="nav-item"><a href="#" class="nav-link">information for project</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Project
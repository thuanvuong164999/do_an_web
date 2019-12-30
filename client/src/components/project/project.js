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
                            <tr>
                                <td></td>
                                <td>
                                    <ul className="nav-list">
                                    
                                        <li className="nav-item"><a href="#" class="nav1">Information For Project</a></li>
                                        <li className="nav-item"><a href="#" class="nav2">Its Name Is: M.E.R </a></li>
                                        <li className="nav-item"><a href="#" class="nav2">Maybe Education Reality </a></li>
                                        <li className="nav-item"><a href="#" class="nav-link">Lê Minh Hoàng</a></li>
                                        <li className="nav-item"><a href="#" class="nav-link">Huỳnh Kim Sơn</a></li>
                                        <li className="nav-item"><a href="#" class="nav-link">Vương Dũng Thuận</a></li>
                                        <li className="nav-item"><a href="#" class="nav1">From Green Academy</a></li>
                                        <li className="nav-item"><a href="#" class="nav3">Our Lecturer:teacher Phương</a></li>
                                    </ul>
                                </td>
                            </tr>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Project
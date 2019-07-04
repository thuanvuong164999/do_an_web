import React from 'react'
import './room-list.scss'

class RoomList extends React.Component {
    render(){
        return(
            <React.Fragment>
                <div className='room-bg'>
                    <ul>
                       <li>Du an 1</li>
                       <li>Du an 2</li> 
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default RoomList
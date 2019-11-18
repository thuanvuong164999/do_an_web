import React from 'react'
import './user-item.scss'

class UserItem extends React.Component {

    constructor(props){
        super(props)
        // console.log(props)
    }

    render() {
        return (
            <React.Fragment>
                <div className='type-room-icon'>
                    <i className={this.props.value.online + ' fa-circle'} ></i>
                    {this.props.value.userName}
                </div>
            </React.Fragment>
        )
    }
}

export default UserItem
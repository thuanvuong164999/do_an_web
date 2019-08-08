import React from 'react'
import './serch.scss'

class Serch extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className='bg-serch'>
                    <input class="search__input" type="text" placeholder="Search"></input>
                </div>
            </React.Fragment>
        )
    }
}

export default Serch
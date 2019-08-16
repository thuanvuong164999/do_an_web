import React from 'react'
import './serch.scss'

class Serch extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className='bg-search'>
                    <input placeholder='Search' className='box-search'></input>
                    <button className='ic-search'><i class="fas fa-search"></i></button>
                </div>
            </React.Fragment>
        )
    }
}

export default Serch
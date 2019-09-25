import React from 'react'
import './oddly.scss'

class Oddly extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className='loading1'>
                    <div className='loading'>
                        <div className='loading__square'></div>
                        <div className='loading__square'></div>
                        <div className='loading__square'></div>
                        <div className='loading__square'></div>
                        <div className='loading__square'></div>
                        <div className='loading__square'></div>
                        <div className='loading__square'></div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Oddly
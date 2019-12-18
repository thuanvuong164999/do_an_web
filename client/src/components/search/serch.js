import React from 'react'
import './serch.scss'
import { locale } from '../../services/system'

class Search extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className='bg-search'>
                    <input placeholder={locale.search} className='box-search' ></input>
                    <button className='ic-search'><i class="fas fa-search"></i></button>
                </div>
            </React.Fragment>
        )
    }
}

export default Search
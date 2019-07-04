import React from 'react'
import App from '../../App'
import './emoji-menu.scss'

class EmojiMenu extends React.Component {
    constructor(props) {
        super(props)
        //console.log(this.props)
    }
   

    render() {
        return (
            <React.Fragment>
                <div className='React-Menu-Control'>
                    <div className='cover-menu-popup' id='overlay-menu' onClick={e => this.onOffEmoij(e)}>
                        <div className='menu-popup' id='emojiMenu_Popup'>
                            <div className='menu-container'>
                                <div className='menu-title'>
                                    <span className='title'>Emoji Menu</span>
                                </div>
                                <div className='emoji-input-container'>
                                    <i class="fas fa-search"></i>
                                    <input className='input-emoji-name' type='text' placeholder='Search Emoji' ></input>

                                </div>
                                <div className='emoji-container-list'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default EmojiMenu;
import React from 'react'
import './serch.scss'
import {InputGroup, Button, FormControl} from 'react-bootstrap'

class Serch extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className='bg-search'>
                    <InputGroup>
                        <FormControl aria-describedby="basic-addon1"
                            placeholder="Search"
                            className='search-box'
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" className='ic-search'><i class="fas fa-search"></i></Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </React.Fragment>
        )
    }
}

export default Serch
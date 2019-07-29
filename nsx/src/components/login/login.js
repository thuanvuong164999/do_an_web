import React from 'react'
import Card from 'react-bootstrap/Card'
import {Form, Row, Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import './login.scss'
const axios = require('axios');

class LoginPages extends React.Component {
    constructor() {
        super()
        this.state = {
            response: 'Hello'
        }
    }
    componentDidMount() {
        let self = this
        axios.get('http://localhost:5000/api/hello')
        .then(function (response) {
            // handle success
            console.log(response);
            let els = response.data.members.map((key, index) => {
                return (
                    <li key={index}>{key.name} - {key.class}</li>
                )
            })
            console.log(els)
            self.setState({
                response: els
            })
            console.log(self.state)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    {this.state.response}
                </div>
                <div className="main-login">
                    <Card>
                    <Form>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            Email {this.state.response}
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control type="email" placeholder="Email" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                            Password
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control type="password" placeholder="Password" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalCheck">
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Form.Check label="Remember me" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit" href="/home">Sign in</Button>
                            </Col>
                        </Form.Group>
                        </Form>
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}

export default LoginPages
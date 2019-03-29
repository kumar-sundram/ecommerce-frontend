import React from 'react'
import axios from '../config/database'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            redirectList: false
        }
    }

    emailChange = (e) => {
        const email = e.target.value
        this.setState(() => ({ email }))
    }

    passwordChange = (e) => {
        const password = e.target.value
        this.setState(() => ({ password }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(formData)
        //client side validation
        axios.post('/users/login', formData)
            .then((response) => {
                console.log(response.data)
                const { token } = response.data
                console.log(token)
                localStorage.setItem('token', token)
                this.setState(() => ({
                    email: '',
                    password: '',
                    redirectList: true
                }))
            })
            .catch((err) => {

                console.log(err.response.data)
            })
    }
    render() {
        if (this.state.redirectList) {
            return <Redirect to="/products" />
        }
        return (
            <div>
                <h2>Login form</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email <br />
                        <input type="text" value={this.state.email} onChange={this.emailChange} />
                    </label><br />
                    <label>
                        Password <br />
                        <input type="password" value={this.state.password} onChange={this.passwordChange} />
                    </label><br />
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

export default Login
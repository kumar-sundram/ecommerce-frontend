import React from 'react'
import axios from '../config/database'
import { Redirect } from 'react-router-dom'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            noticeMsg: '',
            firstNameError: '',
            emailNameError: '',
            passwordNameError: '',
            redirectList: false
        }
    }

    userNameChange = (e) => {
        const username = e.target.value
        this.setState(() => ({ username }))
    }

    emailChange = (e) => {
        const email = e.target.value
        this.setState(() => ({ email }))
    }

    passwordChange = (e) => {
        const password = e.target.value
        this.setState(() => ({ password }))
    }

    validate = () => {
        let isError = false
        const errors = {
            firstNameError: '',
            emailNameError: '',
            passwordNameError: ''
        }
        if (this.state.username.length < 5) {
            isError = true
            errors.firstNameError = "username at least 4 character"
        }
        if (this.state.email.indexOf("@") === -1) {
            isError = true
            errors.emailNameError = "Require valid email"
        }
        if (this.state.password.length === 0) {
            isError = true
            errors.passwordNameError = "password is empty"
        }
        this.setState({
            ...this.state,
            ...errors
        })
        return isError
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const error = this.validate()
        if (!error) {
            const formData = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
            console.log(formData)
            alert("from submitted")

            //client side validation
            axios.post('/users/register', formData)
                .then((response) => {
                    console.log(response.data)
                    this.setState(() => ({
                        noticeMsg: response.data.notice,
                        username: '',
                        email: '',
                        password: '',
                        redirectList: true
                    }))
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }


    render() {
        if (this.state.redirectList) {
            return <Redirect to="/users/login" />
        }
        return (
            <div>
                <h2>Register form</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        UserName <br />
                        <input type='text' value={this.state.username} onChange={this.userNameChange} />
                    </label><br />
                    <p>{this.state.firstNameError}</p>
                    <label>
                        Email <br />
                        <input type='text' value={this.state.email} onChange={this.emailChange} />
                    </label><br />
                    <p>{this.state.emailNameError}</p>
                    <label>
                        Password <br />
                        <input type='password' value={this.state.password} onChange={this.passwordChange} />
                    </label><br />
                    <p>{this.state.passwordNameError}</p>
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

export default Register
import React from 'react'
import axios from '../config/database';

class AddCategory extends React.Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
    }

    nameChange = (e) => {
        const name = e.target.value
        this.setState(() => ({ name }))
    }

    categorySubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name
        }
        axios.post('/categories', formData, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log(response.data)
                this.setState(() => ({
                    name: ''
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h2>Add Category</h2>
                <form onSubmit={this.categorySubmit}>
                    <label>
                        name: <br />
                        <input type="text" value={this.state.name} onChange={this.nameChange} />
                    </label> <br />
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

export default AddCategory
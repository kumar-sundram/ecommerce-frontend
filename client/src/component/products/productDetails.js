import React from 'react'
import axios from '../config/database'
import { Link } from 'react-router-dom'

class ProductDetails extends React.Component {
    constructor() {
        super()
        this.state = {
            product: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/products/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const product = response.data
                this.setState(() => ({ product }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h2>{this.state.product.name}</h2>
                <p>{this.state.product.description}- Rs:{this.state.product.price}</p>
                <img src={this.state.product.image}></img>

                <Link to="/products" >Back</Link>
            </div>
        )
    }
}

export default ProductDetails
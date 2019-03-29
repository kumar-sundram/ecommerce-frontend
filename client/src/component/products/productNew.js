import React from 'react'
import ProductForm from './productForm'
import axios from '../config/database'
import { Link } from 'react-router-dom'

class ProductNew extends React.Component {

    handleSubmission = (data) => {
        console.log(data)
        axios.post('/products', data, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        }).then((response) => {
            const product = response.data
            console.log(product)
            this.props.history.push(`/products/${product._id}`)
        })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h2>Add Product</h2>
                <ProductForm handleSubmission={this.handleSubmission} />

                <Link to='/products' >Back</Link>
            </div>
        )
    }
}

export default ProductNew


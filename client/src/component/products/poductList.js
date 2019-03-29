import React from 'react'
import axios from '../config/database'
import { Link } from 'react-router-dom'

class ProductList extends React.Component {
    constructor() {
        super()
        this.state = {
            products: []
        }
    }
    componentDidMount() {
        axios.get('/products', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const products = response.data
                console.log(products)
                this.setState(() => ({ products }))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <div>
                <h2>Listing Product - {this.state.products.length} </h2>
                <ul>
                    {this.state.products.map((product) => {
                        return <li key={product._id}><Link to={`/products/${product._id}`}>{product.name}</Link>-{product.description}</li>
                    })}
                </ul>
                <Link to='/products/new'>Add product</Link>
            </div>
        )
    }
}
export default ProductList
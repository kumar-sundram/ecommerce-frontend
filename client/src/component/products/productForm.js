import React from 'react'
import axios from '../config/database'

class ProductForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            categoryData: [],
            category: '',
            description: '',
            price: '',
            stock: '',
            codEligible: '',
            filename: null
        }
    }

    componentDidMount() {
        axios.get('/categories')
            .then((response) => {
                console.log(response.data)
                const categoryData = response.data
                console.log('category', categoryData)
                this.setState(() => ({ categoryData }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    nameChange = (e) => {
        const name = e.target.value
        this.setState(() => ({ name }))
    }

    descriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({ description }))
    }

    priceChange = (e) => {
        const price = e.target.value
        if (e.target.value > 0) {
            this.setState(() => ({ price }))
        }
    }

    stockChange = (e) => {
        const stock = e.target.value
        if (e.target.value > 0) {
            this.setState(() => ({ stock }))
        }
    }

    codHandle = (e) => {
        const codEligible = e.target.value
        this.setState(() => ({ codEligible }))
    }

    ImageChange = (e) => {
        const filename = e.target.files[0]
        this.setState(() => ({ filename }))
    }

    categoryHandle = (e) => {
        const category = e.target.value
        this.setState(() => ({ category }))
    }

    handleSubmission = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('name', this.state.name)
        data.append('description', this.state.description)
        data.append('price', this.state.price)
        data.append('stock', this.state.stock)
        data.append('codEligible', this.state.codEligible)
        data.append('category', this.state.category)
        data.append('image', this.state.filename)
        this.props.handleSubmission(data)
    }
    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmission}>
                    <label>
                        Name:<br />
                        <input type="text" value={this.state.name} onChange={this.nameChange} />
                    </label><br />
                    Category:<br />
                    <select onChange={this.categoryHandle}>
                        <option value="">select</option>
                        {this.state.categoryData.map((categories) => {
                            return <option key={categories._id} value={categories._id}>{categories.name}</option>
                        })}
                    </select><br />
                    <label>
                        Description:<br />
                        <textarea value={this.state.description} onChange={this.descriptionChange} ></textarea>
                    </label><br />
                    <label>
                        Price:<br />
                        <input type='number' value={this.state.price} onChange={this.priceChange} />
                    </label><br />
                    <label>
                        Stock:<br />
                        <input type="number" value={this.state.stock} onChange={this.stockChange} />
                    </label><br />
                    <label>
                        CodEligible :<br />
                        <input type="radio" value="true" onChange={this.codHandle} name="radbutton" />True
                        <input type="radio" value="false" onChange={this.codHandle} name="radbutton" />False
                    </label> <br />
                    <label>
                        Image :<br />
                        <input type="file" name="Image" onChange={this.ImageChange} />

                    </label><br />
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

export default ProductForm


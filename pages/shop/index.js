import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import { Grid, Row, Col, FormGroup } from 'react-bootstrap'
import { getCategories, setCart } from '../../actions/shop'
import BtnMain from '../../components/buttons/btn_main'
import { Router } from '../../routes'
import { getUserInfo } from '../../actions/user'
import { makeCDN, sortByName } from '../../utils'

class Shop extends Component {
    constructor(props) {
        super(props)
        const { dispatch } = props
        dispatch(getUserInfo())
        dispatch(getCategories())
        this.state = {
        	activeCat: 0,
        	product: {}
        }
    }

    setCategory = i => e => {
    	this.setState({activeCat: i, product: {}})
    }

    goToProduct = product => e => {
		this.setState({product})
    }

    getCart = () => {
        const data = window.localStorage.getItem(`cart-${this.props.userId}`);
        return JSON.parse(data ? data : '[]');
    }

    addToCart = product => e => {
    	const { dispatch } = this.props

    	let cart  = this.getCart()
        let check = false

        cart = cart.map(item => {
            if (item.product && item.product.id === product.id) {
                item.count++
                check = true;
            }
            return item;
        });

        if (!check) {
            cart.push({product: product, count: 1});
        }
        
        window.localStorage.setItem(`cart-${this.props.userId}`, JSON.stringify(cart));
        dispatch(setCart(this.getCart()))
    }

    printCategories = (item, i) => {
    	return <div key={i} className="wrap-shop-link">
		            <a href="javascript:;" className={`shop-link ${this.state.activeCat === i ? 'active' : ''}`} onClick={this.setCategory(i)}>
		                <span className="shop-link-text">{item.name}</span>
		            </a>
		        </div>
    }

    printProducts = (item, i) => {
    	return	<Col xs={6} key={i}>
	    			<div className="wrap-product-item">
		                <img className="product-img" src={makeCDN(item.image)} alt="" />
		                <div className="product-info">
		                    <div className="font-bebas"><strong>{item.name}</strong></div>
		                    <div className="font-bebas"><strong className="product-price">${item.price}</strong></div>
		                </div>
		                <div className="product-btn-wrap">
		                    <div className="product-btn-inner">
		                        <FormGroup>
		                            <BtnMain
		                                bsStyle="success"
		                                text="Preview"
		                                onClick={this.goToProduct(item)} />
		                        </FormGroup>
		                        <FormGroup>
		                            <BtnMain
		                                bsStyle="success"
		                                icon={<i className="fas fa-gift"></i>}
		                                text="Add to cart"
		                                onClick={this.addToCart(item)} />
		                        </FormGroup>
		                    </div>
		                </div>
		            </div>
	            </Col>
    }

    printProduct = () => {
    	const { product } = this.state
    	return 	<Row>
                    <Col sm={6}>
                        <img className="img-responsive" src={makeCDN(product.image)} alt="" />
                    </Col>
                    <Col sm={6}>
                        <div className="font-bebas">
                            <h1 className="product-title">{product.name}</h1>
                        </div>
                        <div className="font-bebas">
                            <strong className="product-info-pice">${product.price}</strong>
                        </div>
                        <FormGroup>
                            <span>{product.description}</span>
                        </FormGroup>
                        <BtnMain
                            bsStyle="success"
                            icon={<i className="fas fa-gift"></i>}
                            text="Add to cart"
                            onClick={this.addToCart(product)} />
                    </Col>
                </Row>
    }

    render() {
    	const { categories } = this.props
    	const { products = [] } = categories.length ? categories[this.state.activeCat] : {products: []}

        return (
            <Layout>
            	<div className="pt-15">
                    <div className="pt-66 bg-blue">
                        <Grid className="bg-white pt-15 pb-50">
	                        <Row>
				                <Col sm={3}>
				                    { categories.map((item, i) => this.printCategories(item, i)) }
				                </Col>
				                <Col sm={9}>
				                	<Row>
				                    	{ 	this.state.product.id
				                    		? 	this.printProduct()
				                    		: 	products.map((item, i) => this.printProducts(item, i)) }
				                    </Row>
				                </Col>
				            </Row>
                        </Grid>
                    </div>
                </div>
        	</Layout>
        );
    }
}

const mapStateToProps = ({shop, user}) => 
    (
        {
            categories: sortByName(shop.categories),
            userId: user.data.id,
        }
    )

export default connect(mapStateToProps)(Shop)
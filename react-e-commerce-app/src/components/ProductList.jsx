import { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            selectedproductId: null,
            error: null
        };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        axios.get('http://127.0.0.1:5000/products')
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ error: 'Error fetching products. Please try again later.' });
            });
    };

    deleteProduct = (productId) => {
        axios.delete(`http://127.0.0.1:5000/products/${productId}`)
            .then(() => {
                this.fetchProducts(); // Refresh the list after deletion
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                this.setState({ error: 'Error deleting product. Please try again.' });
            });
    };

    render() {

        const { error, products } = this.state;

        return (
            <Container>
                {error && <Alert variant="danger">{error}</Alert>}
                <h3>Products</h3>
                <ListGroup>
                    {products.map(product => (
                        <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                            <Link to={`/edit-customer/${product.id}`} className="text-primary">
                                {product.product_name}
                            </Link>
                            <Button variant="outline-danger" size="sm"
                                onClick={() => this.deleteProduct(product.id)}>
                                Delete
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

export default ProductList;
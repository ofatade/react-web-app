import { Component } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, Modal } from 'react-bootstrap';

class ProductForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product_name: '',
            price: '',
            errors: {},
            isLoading: false,
            error: null,
            showSuccessModal: false
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0) {

            this.setState({ isLoading: true, error: null });

            const productData = {
                name: this.state.product_name.trim(),
                email: this.state.price.trim(),
            };

            axios.post('http://127.0.0.1:5000/products', productData)
                .then(() => {
                    this.setState({
                        showSuccessModal: true,
                        isLoading: false
                    });
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    this.setState({ error: error.toString(), isLoading: false });
                });
        } else {
            this.setState({ errors });
        }
    };

    validateForm = () => {
        const { product_name, price } = this.state;
        const errors = {};
        if (!product_name) errors.customer_name = 'Name is required'; // Corrected key
        if (!price) errors.email = 'Email is required';
        return errors;
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    closeModal = () => {
        this.setState({
            showSuccessModal: false,
            product_name: '',
            price: '',
            errors: {},
        });
    };

    render() {

        const { product_name, price, isLoading, showSuccessModal, error, errors } = this.state;

        return (
            <Container>
                {isLoading && <Alert variant="info">Submitting Customer Data...</Alert>}
                {error && <Alert variant="danger">Error Submitting Customer: {error}</Alert>}

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>Product</Form.Label>
                        <Form.Control type="text" name="product_name" value={product_name} onChange={this.handleChange} />
                        {errors.product_name && <div style={{ color: 'red' }}>{errors.product_name}</div>} {/* Corrected key */}
                    </Form.Group>

                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={price} onChange={this.handleChange} />
                        {errors.price && <div style={{ color: 'red' }}>{errors.price}</div>}
                    </Form.Group>


                    <Button variant="primary" type="submit">Submit</Button>
                </Form>

                <Modal show={showSuccessModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        The product has been added!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        );
    }
}

export default ProductForm;

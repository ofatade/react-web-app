import { Component } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, Modal } from 'react-bootstrap';

class CustomerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customer_name: '',
            email: '',
            phone: '',
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

            const customerData = {
                name: this.state.customer_name.trim(),
                email: this.state.email.trim(),
                phone: this.state.phone.trim()
            };

            axios.post('http://127.0.0.1:5000/customers', customerData)
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
        const { customer_name, email, phone } = this.state;
        const errors = {};
        if (!customer_name) errors.customer_name = 'Name is required'; // Corrected key
        if (!email) errors.email = 'Email is required';
        if (!phone) errors.phone = 'Phone is required';
        return errors;
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    closeModal = () => {
        this.setState({
            showSuccessModal: false,
            customer_name: '',
            email: '',
            phone: '',
            errors: {},
        });
    };

    render() {

        const { customer_name, email, phone, isLoading, showSuccessModal, error, errors } = this.state;

        return (
            <Container>
                {isLoading && <Alert variant="info">Submitting Customer Data...</Alert>}
                {error && <Alert variant="danger">Error Submitting Customer: {error}</Alert>}

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="customer_name" value={customer_name} onChange={this.handleChange} />
                        {errors.customer_name && <div style={{ color: 'red' }}>{errors.customer_name}</div>} {/* Corrected key */}
                    </Form.Group>

                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={email} onChange={this.handleChange} />
                        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                    </Form.Group>

                    <Form.Group controlId="formGroupPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="tel" name="phone" value={phone} onChange={this.handleChange} />
                        {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
                    </Form.Group>

                    <Button variant="primary" type="submit">Submit</Button>
                </Form>

                <Modal show={showSuccessModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        The customer has been added!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        );
    }
}

export default CustomerForm;

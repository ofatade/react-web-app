import { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            selectedCustomerId: null,
            error: null
        };
    }

    componentDidMount() {
        this.fetchCustomers();
    }

    fetchCustomers = () => {
        axios.get('http://127.0.0.1:5000/customers')
            .then(response => {
                this.setState({ customers: response.data });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ error: 'Error fetching customers. Please try again later.' });
            });
    };

    deleteCustomer = (customerId) => {
        axios.delete(`http://127.0.0.1:5000/customers/${customerId}`)
            .then(() => {
                this.fetchCustomers(); // Refresh the list after deletion
            })
            .catch(error => {
                console.error('Error deleting customer:', error);
                this.setState({ error: 'Error deleting customer. Please try again.' });
            });
    };

    render() {

        const { error, customers } = this.state;

        return (
            <Container>
                {error && <Alert variant="danger">{error}</Alert>}
                <h3>Customers</h3>
                <ListGroup>
                    {customers.map(customer => (
                        <ListGroup.Item key={customer.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                            <Link to={`/edit-customer/${customer.id}`} className="text-primary">
                                {customer.customer_name}
                            </Link>
                            <Button variant="outline-danger" size="sm"
                                onClick={() => this.deleteCustomer(customer.id)}>
                                Delete
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

export default CustomerList;
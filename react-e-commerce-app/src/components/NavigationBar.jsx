import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function NavigationBar() {
    return (
        <Navbar bg="light" expand="md">
            <Navbar.Brand href="/">E-Commerce App!!</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/" activeClassName="active">
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/customers" activeClassName="active">
                        Customers
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/add-customer" activeClassName="active">
                        Add Customer
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/product-list" activeClassName="active">
                        Product List
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/add-product" activeClassName="active">
                        Add Product
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar;
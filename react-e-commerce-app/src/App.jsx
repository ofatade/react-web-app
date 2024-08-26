import NavigationBar from './components/NavigationBar';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  return (
    <>
      <NavigationBar />
      <CustomerForm />
      <CustomerList />
      <ProductForm />
      <ProductList />
    </>
  )
}

export default App

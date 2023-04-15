import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Appheader from './components/AppHeader';
import Home from './components/Home';
import Contact from './components/Contact';
import Customer from './components/Customer';
import Addcustomer from './components/AddCustomer';
import Editcustomer from './components/EditCustomer';
import Error from './components/Error';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Registeration from './components/Registeration';
import Login from './components/Login';
import UserList from './components/UserList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Appheader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='contact' element={<Contact />} />
          <Route path='customer' element={<Customer />} />
          <Route path='customer/add' element={<Addcustomer />} />
          <Route path='customer/edit/:customerId' element={<Editcustomer />} />
          <Route path='register' element={<Registeration />} />
          <Route path='login' element={<Login />} />
          <Route path='user' element={<UserList />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Customer = () => {
    const navigate = useNavigate();
    const [customerList, setCustomerList] = useState(null);

    const [haveAdd, setHaveAdd] = useState(false);
    const [haveEdit, setHaveEdit] = useState(false);
    const [haveDelete, setHaveDelete] = useState(false);

    useEffect(() => {
        getRoleAccess();
        fetch('http://localhost:8000/customer')
            .then(res => {
                return res.json();
            })
            .then(data => setCustomerList(data))
            .catch(err => {
                console.log(err.message);
            });
    }, [])

    const getRoleAccess = () => {
        let userRole = localStorage.getItem('userRole') !== null ? localStorage.getItem('userRole') : '';
        fetch(`http://localhost:8000/roleAccess?role=${userRole}&menu=customer`)
            .then(res => {
                if (!res.ok) {
                    toast.warning("You are not authorized to access this menu");
                    navigate('/')
                }
                return res.json();
            })
            .then(data => {
                if(data.length > 0){
                    let obj = data[0];
                    setHaveAdd(obj.haveAdd);
                    setHaveEdit(obj.haveEdit);
                    setHaveDelete(obj.haveDelete);
                }else{
                    toast.warning("You are not authorized to access this menu");
                    navigate('/')
                }
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    const removeUser = (id) => {
        if (window.confirm('Really want remove this customer ?')) {
            fetch(`http://localhost:8000/customer/${id}`, { method: "DELETE" })
                .then(res => {
                    if (!res.ok) {
                        toast.error('Something went wrong.');
                        return;
                    }
                    toast.success('Removed successfully.');
                    navigate(0);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err.message);
                })
        }
    }
    const addCustomer = () => {
        if(haveAdd){
            navigate('/customer/create');
        }
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>Customer List</h2>
                </div>
                <div className="card-body">
                    <div>
                        {/* <Link className="btn btn-success" to='/customer/add'>Add Customer (+)</Link> */}
                        <button className="btn btn-success" onClick={addCustomer}>Add Customer (+)</button>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Area</td>
                                <td>CreditLimit</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customerList && customerList.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.area}</td>
                                            <td>{item.creditLimit}</td>
                                            <td>
                                                <Link to={`/customer/edit/${item.id}`} className="btn btn-primary">Edit</Link>
                                                <button className="btn btn-danger" onClick={() => removeUser(item.id)}>Remove</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export default Customer;
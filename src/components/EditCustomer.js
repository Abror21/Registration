import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const Editcustomer = () => {

    const navigate = useNavigate();
    const { customerId } = useParams();

    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [creditLimit, setCreditLimit] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/customer/' + customerId)
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setArea(data.area);
                setCreditLimit(data.creditLimit)
            })
            .catch(err => console.log(err.message))
    }, [])

    const handleEditSubmit = e => {
        e.preventDefault();
        const editedCustomer = { name, area, creditLimit };
        fetch('http://localhost:8000/customer/' + customerId, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedCustomer),
        })
            .then(res => {
                if (!res.ok) {
                    toast.error("Something went wrong");
                    return;
                }
                toast.success("Updated successfully.");
                navigate('/customer');
            })
            .catch(err => {
                console.log(err.message);
                toast.error(err.message);
            })
    }

    return (
        <div>
            <form className="container" onSubmit={handleEditSubmit}>
                <div className="row">
                    <div className="offset-lg-2 col-lg-8">
                        <div className="card">
                            <div className="card-header">
                                <h2>Edit Customer</h2>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input className="form-control" value={name} onChange={e => setName(e.target.value)}></input>
                                </div>
                                <div className="form-group">
                                    <label>Area</label>
                                    <select value={area} className="form-select" onChange={e => setArea(e.target.value)}>
                                        <option>Select Area</option>
                                        <option value="Alabama">Alabama</option>
                                        <option value="Colorado">Colorado</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Indiana">Indiana</option>
                                        <option value="Montana">Montana</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Creditlimit</label>
                                    <input className="form-control" value={creditLimit} onChange={e => setCreditLimit(e.target.value)}></input>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-success" type="submit">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Editcustomer;
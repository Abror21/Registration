import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

const Addcustomer = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [creditLimit, setCreditLimit] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        const newUser = {
            // id: Date.now(),
            name,
            area,
            creditLimit
        }
        fetch('http://localhost:8000/customer', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
            .then(res => {
                toast.success('Saved successfully')
                navigate('/customer');
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div>
            <form className="container" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="offset-lg-2 col-lg-8">
                        <div className="card">
                            <div className="card-header">
                                <h2>Create Customer</h2>
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
                                    <input value={creditLimit} className="form-control" onChange={e => setCreditLimit(e.target.value)}></input>
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

export default Addcustomer;
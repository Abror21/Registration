import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserList = () => {
    const navigate = useNavigate();

    const [userList, setUserList] = useState([]);
    const [roleList, setRoleList] = useState([]);
    const [showList, setShowList] = useState(true);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [isActive, setIsActive] = useState(false);


    useEffect(() => {
        let userRole = localStorage.getItem('userRole') !== null ? localStorage.getItem('userRole') : '';
        if (userRole != 'admin') {
            navigate('/');
        }
        fetch("http://localhost:8000/user")
            .then(res => res.json())
            .then(data => setUserList(data))
            .catch((err) => console.log(err));
        loadRole()
    }, [showList]);

    const handleSubmit = e => {
        e.preventDefault();
        let updatedUser = { role, isActive };
        fetch('http://localhost:8000/user/' + id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        })
            .then(res => {
                toast.success("Updated successfully.")
                setShowList(true)
            })
            .catch(err => console.log(err.message))
    }

    const updateUser = (id) => {
        setShowList(false);
        fetch('http://localhost:8000/user/' + id)
            .then(res => {
                if (!res.ok) return false;
                return res.json();
            })
            .then(data => {
                setId(data.id)
                setRole(data.role)
                setIsActive(data.isActive)
            })
            .catch(err => console.log(err.message))
    }
    const loadRole = () => {
        fetch('http://localhost:8000/role')
            .then(res => res.json())
            .then(data => setRoleList(data))
            .catch(err => console.log(err.message))
    }

    return (
        <div className="container">
            {
                showList &&
                <div className="card">
                    <div className="card-header">
                        <h2>User List</h2>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <td>Username</td>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Role</td>
                                    <td>Status</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userList &&
                                    userList.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                            <td>{item.isActive === true ? "Active" : "Inactive"}</td>
                                            <td><button onClick={() => updateUser(item.id)} className="btn btn-primary">Update</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }

            <div>
                {!showList &&
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="offset-lg-2 col-lg-8">
                                <div className="card">
                                    <div className="card-header">
                                        <h2>Update User</h2>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>User Name: {name}</label>
                                        </div>
                                        <div className="form-group">
                                            <label>Role</label>
                                            <select value={role} onChange={e => setRole(e.target.value)} className="form-select">
                                                <option value="">Select Role</option>
                                                {
                                                    roleList &&
                                                    roleList.map(user => (
                                                        <option key={user.id} value={user.id}>{user.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="form-check">
                                            <label>Active?</label>
                                            <input checked={isActive} onChange={e => setIsActive(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-success me-1" type="submit">Update</button>
                                        <button onClick={() => setShowList(true)} className="btn btn-danger" type="button">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}

export default UserList;
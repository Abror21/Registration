import { useEffect, useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useInput } from "../hooks/use-input";
import Input from "./Input";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
    }, []);

    const {
        inputChange: idInputChange,
        inputBlur: idInputBlur,
        inputTouch: idInputTouch,
        value: id,
        inputIsValid: idIsValid,
        inputIsError: idInputIsError
    } = useInput(id => id.trim().length > 3);
    const {
        inputChange: passwordInputChange,
        inputBlur: passwordInputBlur,
        inputTouch: passwordInputTouch,
        value: password,
        inputIsValid: passwordIsValid,
        inputIsError: passwordInputIsError
    } = useInput(id => id.trim().length > 3);

    const handleSubmit = (e) => {
        e.preventDefault();
        idInputTouch();
        passwordInputTouch();
        if (idIsValid && passwordIsValid) {
            fetch(`http://localhost:8000/user?id=${id}&password=${password}`)
                .then(res => {
                    if (!res.ok) {
                        toast.error('Login failed.')
                    }
                    return res.json()
                })
                .then(data => {
                    if (data.length > 0) {
                        let user = data[0];
                        if (user.isActive === false) {
                            toast.error('User in Inactive state, please contact admin for activation.')
                        } else {
                            localStorage.setItem('userId', id);
                            localStorage.setItem('userRole', user.role);
                            navigate('/');
                        }
                    } else {
                        toast.error('Login Failed')
                    }
                })
        }else{
            toast.warning('Please enter valid data & proceed.'  );
        }
    }

    return (
        <div>
            <form className="container" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="offset-lg-2 col-lg-8">
                        <div className="card">
                            <div className="card-header">
                                <h2>User Login</h2>
                            </div>
                            <div className="card-body">
                                <Input
                                    type="text"
                                    label={["User Id", <span className="text-danger">*</span>]}
                                    inputIsError={idInputIsError}
                                    value={id}
                                    inputChange={idInputChange}
                                    inputBlur={idInputBlur}
                                    errorMessage="Id should be at least 4 caracter."
                                />
                                <Input
                                    type="password"
                                    label={["Password", <span className="text-danger">*</span>]}
                                    inputIsError={passwordInputIsError}
                                    value={password}
                                    inputChange={passwordInputChange}
                                    inputBlur={passwordInputBlur}
                                    errorMessage="Password should be at least 4 caracter."
                                />
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-success" type="submit">Login</button>
                                <Link className="btn btn-primary" to="/register">New User?</Link>
                            </div>

                        </div>

                    </div>
                </div>

            </form>
        </div>
    );
}

export default Login;
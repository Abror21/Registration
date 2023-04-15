import { useState, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useInput } from "../hooks/use-input";
import Input from "./Input";

const Registeration = () => {
const navigate = useNavigate();

    const {
        inputChange: idInputChange,
        inputBlur: idInputBlur,
        inputTouch: idInputTouch,
        value: id,
        isExist: idIsExist,
        inputIsValid: idIsValid,
        inputIsError: idInputIsError
    } = useInput((id) => id.trim().length > 3);
    const {
        inputChange: nameInputChange,
        inputBlur: nameInputBlur,
        inputTouch: nameInputTouch,
        value: name,
        inputIsValid: nameIsValid,
        inputIsError: nameInputIsError
    } = useInput((name) => name.trim().length !== 0);
    const {
        inputChange: emailInputChange,
        inputBlur: emailInputBlur,
        inputTouch: emailInputTouch,
        value: email,
        inputIsValid: emailIsValid,
        inputIsError: emailInputIsError
    } = useInput((email) => email.includes('@'));
    const {
        inputChange: passwordInputChange,
        inputBlur: passwordInputBlur,
        inputTouch: passwordInputTouch,
        value: password,
        inputIsValid: passwordIsValid,
        inputIsError: passwordInputIsError
    } = useInput((password) => password.trim().length > 3);
    const {
        inputChange: mobileInputChange,
        value: mobile
    } = useInput();
    const {
        inputChange: addressInputChange,
        value: address
    } = useInput();

    let isActive = true;
    let role = '';
    const regObj = { id, name, email, mobile, password, address, isActive, role };

    const handleSubmit = (e) => {
        e.preventDefault();
        idInputTouch();
        nameInputTouch();
        emailInputTouch();
        passwordInputTouch();

        if (idIsValid && nameIsValid && emailIsValid && passwordIsValid) {
            fetch('http://localhost:8000/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(regObj)
            })
                .then(res => {
                    toast.success('Registered successfully', 'Please contact admin for activation');
                    navigate('/login');
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err.message);
                })
        } else {
            toast.warning('Please enter valid data & proceed.');
        }
    }

    return (
        <div>
            <div>
                <form className="container" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="offset-lg-2 col-lg-8">
                            <div className="card">
                                <div className="card-header">
                                    <h2>User Regsiteration</h2>
                                </div>
                                <div className="card-body">
                                    <Input
                                        type="text"
                                        label={["User Id", <span className="text-danger">*</span>]}
                                        inputIsError={idInputIsError}
                                        value={id}
                                        inputChange={e => idInputChange(e, true)}
                                        inputBlur={idInputBlur}
                                        errorMessage="Id should be at least 4 caracter."
                                        isExist={idIsExist}
                                    />
                                    <Input
                                        type="text"
                                        label={["Name", <span className="text-danger">*</span>]}
                                        inputIsError={nameInputIsError}
                                        value={name}
                                        inputChange={nameInputChange}
                                        inputBlur={nameInputBlur}
                                        errorMessage="Name should be at least 1 caracter."
                                    />
                                    <Input
                                        type="email"
                                        label={["Email", <span className="text-danger">*</span>]}
                                        inputIsError={emailInputIsError}
                                        value={email}
                                        inputChange={emailInputChange}
                                        inputBlur={emailInputBlur}
                                        errorMessage='Email should include "@".'
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
                                    <Input
                                        type="number"
                                        label="Mobile"
                                        value={mobile}
                                        inputChange={mobileInputChange}
                                    />
                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea
                                            className="form-control"
                                            value={address}
                                            onChange={addressInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-success" type="submit" >Register</button>
                                    <Link className="btn btn-primary" to="/login">Already Registered?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registeration;
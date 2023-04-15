import React from 'react'

const Input = ({type, label, inputIsError, value, inputChange, inputBlur, errorMessage, isExist}) => {
    return (
        <div className="form-group">
            <label className={`${inputIsError || isExist ? 'text-danger' : ''}`}>{label}</label>
            <input
                type={type}
                className={`form-control ${inputIsError || isExist ? 'border-danger' : ''}`}
                value={value}
                onChange={inputChange}
                onBlur={inputBlur}
            />
            {inputIsError && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {isExist && <p style={{ color: 'red' }}>Username already exists.</p>}
        </div>
    )
}

export default Input;
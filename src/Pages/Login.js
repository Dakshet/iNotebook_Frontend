import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BASE_URL from '../Services/helper.js';

const Login = ({ showAlert }) => {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${BASE_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })

        const json = await response.json();

        // console.log(json);

        // const log = localStorage.setItem("token", json.toten);
        // console.log(log)


        if (json.success) {
            localStorage.setItem("token", json.token);
            showAlert("Logged Account Successfully!", "success")
            navigate("/")
        }
        else {
            showAlert(json.Error, "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className='mt-5'>
            <h2>Login page</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login

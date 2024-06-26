import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = ({ showAlert }) => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.password === credentials.cpassword) {

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            })

            const json = await response.json();

            // console.log(json)

            if (json.success) {
                localStorage.setItem("token", json.token);
                showAlert("Created Account Successfully!", "success")
                navigate("/")
            }
            else {
                showAlert(json.Error, "danger")
            }
        }
        else {
            showAlert("Enter the correct confirm password!", "danger")
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
            <h2>SignUp page</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} minLength={3} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={4} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={4} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup

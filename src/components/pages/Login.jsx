import React, { useState } from 'react';
import useLocalStorage from "../../hooks/useLocalStorage";

async function loginUser(credentials) {
    return fetch(
        process.env.REACT_APP_URL_USER_AUTH, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }
    )
    .then(data => data.json());
}

export default function Login() {
    const [email, setEmail] = useState();
    const [token, setToken] = useLocalStorage("auth_token", "");

    const handleSubmit = async e => 
    {
        e.preventDefault();
        const login_response = await loginUser(
            {
                email: email
            }
        );

        if (login_response.passed) {
            setToken(login_response.payload.token);

            // display 6 char input to validate email auth
        } else {
            // display error message
        }
    }

    return (
        <div>
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Log in to Todolist</p>
                        <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    </label>
                    <div>
                    <button type="submit">Log in</button>
                    <hr></hr>
                    Don't have an account?
                    <button type="submit">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
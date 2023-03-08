import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { POST, TOKEN_KEY } from "../services/fetcher";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleUpdateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        POST(isLogin ? "/auth/login" : "/auth/register", form)
            .then(data => {
                if (data.token) {
                    localStorage.setItem(TOKEN_KEY, data.token);
                }
                alert(data.message || "Nice!");
                navigate("/");
            })
            .catch(error => alert("Oh noes!\n" + error));
    };

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7">
                <form className="bg-light p-3 shadow rounded-2">
                    <h6>
                        Currently <span className="text-secondary">{isLogin ? "logging in" : "registering"}</span>.{" "}
                        <span className="bg-secondary p-2 rounded-2 shadow" onClick={() => setIsLogin(!isLogin)}>
                            Toggle
                        </span>
                    </h6>
                    <label>Email:</label>
                    <input onChange={handleUpdateForm} name="email" value={form["email"]} className="form-control" type="email" />
                    <label>Password:</label>
                    <input onChange={handleUpdateForm} name="password" value={form["password"]} className="form-control" type="password" placeholder="If you type hunter2 all we see is *******" />

                    {form["email"] && form["password"] && (
                        <div onClick={handleLogin} className="btn btn-primary mt-2">
                            {isLogin ? "Log in" : "Register"}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

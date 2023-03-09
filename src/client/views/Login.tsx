import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { POST, TOKEN_KEY } from "../services/fetcher";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
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
                navigate("/");
            })
            .catch(error => alert("Oh noes!\n" + error));
    };

    const submitOnReturn = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7">
                <form className="bg-light p-3 shadow rounded-2">
                    <h6>
                        Currently <span className="text-secondary">{isLogin ? "logging in" : "registering"}</span>.{" "}
                        <span className="bg-secondary text-light p-2 rounded-2 shadow" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Need to register?" : "Need to login?"}
                        </span>
                    </h6>

                    {!isLogin && (
                        <>
                            <label>Name:</label>
                            <input placeholder="Bender B. Rodríguez" onChange={handleUpdateForm} name="name" value={form["name"]} className="form-control" type="text" />
                        </>
                    )}

                    <label>Email:</label>
                    <input placeholder="bender@planetexpress.earth" onChange={handleUpdateForm} name="email" value={form["email"]} className="form-control" type="email" />

                    <label>Password:</label>
                    <input
                        onKeyDown={submitOnReturn}
                        onChange={handleUpdateForm}
                        name="password"
                        value={form["password"]}
                        className="form-control"
                        type="password"
                        placeholder="No, you typed hunter2, all we see is *******"
                    />

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

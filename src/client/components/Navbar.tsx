import * as React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="bg-info">
            <Link className="btn btn-secondary text-light border border-primary border-1 m-2" to={"/"}>
                Home
            </Link>
            <Link className="btn btn-secondary text-light border border-primary border-1 m-2" to={"/login"}>
                Login
            </Link>
        </div>
    );
}

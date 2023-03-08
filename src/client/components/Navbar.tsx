import * as React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="bg-primary">
            <Link className="btn btn-outline-info m-2" to={"/"}>
                Home
            </Link>
            <Link className="btn btn-outline-info m-2" to={"/login"}>
                Login
            </Link>
        </div>
    );
}

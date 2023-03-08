import React, { useState } from "react";
import { POST } from "../services/fetcher";

const Input = () => {
    const [item, setItem] = useState("");

    const handleSubmit = () => {
        POST("/api/items", { content: item })
            .then(res => {
                alert(res.message);
                console.log(res);
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="border border-secondary border-2 row p-3 mb-4 bg-light rounded-3 shadow justify-content-center">
            <div className="col-12 col-md-11">
                <input className="my-2 text-info form-control" placeholder='"Make todo list"' type="text" value={item} onChange={e => setItem(e.target.value)} />
            </div>
            <div className="col-12 col-md-1">
                <button onClick={handleSubmit} className="my-2 btn btn-info">
                    Add!
                </button>
            </div>
        </div>
    );
};

export default Input;

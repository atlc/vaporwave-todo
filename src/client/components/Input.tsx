import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { POST } from "../services/fetcher";

const Input = ({ reload }: { reload: () => void }) => {
    const nav = useNavigate();
    const [item, setItem] = useState("");
    const [alertText, setAlertText] = useState("");

    const handleErrorMessage = (message: string) => {
        setAlertText(message);
        setTimeout(() => {
            setAlertText("");
        }, 7500);
    };

    const handleSubmit = () => {
        if (!item) {
            handleErrorMessage("Cannot add 'nothing' to the list!");
            return;
        }

        POST("/api/items", { content: item })
            .then(() => {
                setItem("");
                reload();
            })
            .catch(e => {
                if (e.toLowerCase().includes("auth")) {
                    nav("/login");
                } else {
                    handleErrorMessage(e);
                }
            });
    };

    const submitOnReturn = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div className="border border-secondary border-2 row justify-content-end p-3 mb-4 bg-light rounded-3 shadow justify-content-center">
            {alertText && <div className="alert alert-danger">{alertText}</div>}
            <div className="col-12 col-md-11">
                <input
                    onKeyDown={submitOnReturn}
                    className="my-2 text-info form-control border border-info border-1 shadow"
                    placeholder='"Make todo list"'
                    type="text"
                    value={item}
                    onChange={e => setItem(e.target.value)}
                />
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

import React, { useState } from "react";
import { Item } from "../../types";
import { DELETE, PUT } from "../services/fetcher";

const TodoItem = ({ content, is_complete, id }: Item) => {
    const [isActive, setIsActive] = useState(false);

    const handleDelete = () => {
        DELETE(`/api/items/${id}`)
            .then(data => alert(data.message))
            .catch(error => alert(error));
    };

    const handleToggle = () => {
        PUT(`/api/items/${id}/toggle`, { current_status: is_complete })
            .then(data => alert(data.message))
            .catch(error => alert(error));
    };

    return (
        <>
            <p className="text-info" onClick={() => setIsActive(!isActive)}>
                {is_complete ? "✅" : "⏳"} {content}
            </p>
            {isActive && (
                <p className="mx-2">
                    <button onClick={handleToggle} className="btn btn-sm btn-warning mx-2">
                        Mark as {!is_complete ? "✅" : "⏳"}?
                    </button>
                    <button onClick={handleDelete} className="btn btn-sm btn-danger mx-2">
                        🗑️?
                    </button>
                </p>
            )}
        </>
    );
};

export default TodoItem;

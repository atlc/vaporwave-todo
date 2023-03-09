import React, { useState } from "react";
import { Item } from "../../types";
import { DELETE, PUT } from "../services/fetcher";

interface TodoProps extends Item {
    reload: () => void;
}

const TodoItem = ({ content, is_complete, id, reload }: TodoProps) => {
    const handleDelete = () => {
        DELETE(`/api/items/${id}`).then(reload).catch(alert);
    };

    const handleToggle = () => {
        PUT(`/api/items/${id}/toggle`, { current_status: is_complete }).then(reload).catch(alert);
    };

    return (
        <>
            <p className="text-info">
                <span className="mx-2" onClick={handleToggle}>
                    {is_complete ? "🗹" : "☐"}
                </span>
                <span className={`mx-2 ${is_complete && "strike"}`}>{content}</span>
                {is_complete ? (
                    <span onClick={handleDelete} className="border border-2 border-secondary rounded-3 mx-3">
                        🗑️?
                    </span>
                ) : null}
            </p>
        </>
    );
};

export default TodoItem;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "../../types";
import Input from "../components/Input";
import TodoItem from "../components/TodoItem";
import { GET } from "../services/fetcher";

export default function Home() {
    const nav = useNavigate();
    const [items, setItems] = useState<Item[]>([]);

    function getItems() {
        GET("/api/items")
            .then(items => setItems(items))
            .catch(error => {
                alert(error);
                nav("/login");
            });
    }

    useEffect(() => {
        GET("/auth/verify")
            .then(getItems)
            .catch(() => nav("/login"));
    }, []);

    return (
        <div className="px-2">
            <Input reload={getItems} />
            <div className="row border border-secondary p-3 border-2 bg-light rounded-3 shadow-lg mt-2">
                {items.length === 0 && (
                    <p style={{ opacity: 0.5 }} className="text-center text-info fw-light">
                        No Todo List Items Found!
                    </p>
                )}
                {items.length > 0 && items.map(item => <TodoItem key={`item-${item.id}`} reload={getItems} {...item} />)}
            </div>
        </div>
    );
}

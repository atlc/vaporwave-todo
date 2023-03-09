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
        getItems();
    }, []);

    return (
        <div className="px-2">
            <Input reload={getItems} />
            <div className="row border border-secondary border-3  bg-light p-3 rounded-3 shadow-lg mt-2">
                {items.map(item => (
                    <TodoItem key={`item-${item.id}`} reload={getItems} {...item} />
                ))}
            </div>
        </div>
    );
}

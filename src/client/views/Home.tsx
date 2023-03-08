import React, { useState, useEffect } from "react";
import { Item } from "../../types";
import Input from "../components/Input";
import TodoItem from "../components/TodoItem";
import { GET } from "../services/fetcher";

export default function Home() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        GET("/api/items")
            .then(items => setItems(items))
            .catch(error => alert(error));
    }, []);

    return (
        <div className="px-2">
            <Input />
            <div className="row border border-secondary border-2  bg-light p-3 rounded-3 shadow mt-2">
                {items.map(item => (
                    <TodoItem key={`item-${item.id}`} {...item} />
                ))}
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';

const CrudComponent = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [editItem, setEditItem] = useState({ id: null, value: '' });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await fetch('/api/items');
        const data = await response.json();
        setItems(data);
    };

    const handleCreate = async () => {
        if (!newItem) return;
        await fetch('/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newItem }),
        });
        setNewItem('');
        fetchItems();
    };

    const handleUpdate = async () => {
        if (!editItem.value) return;
        await fetch(`/api/items/${editItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: editItem.value }),
        });
        setEditItem({ id: null, value: '' });
        fetchItems();
    };

    const handleDelete = async (id) => {
        await fetch(`/api/items/${id}`, {
            method: 'DELETE',
        });
        fetchItems();
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">CRUD Application</h1>
            <div className="my-4">
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add new item"
                    className="border p-2"
                />
                <button onClick={handleCreate} className="bg-blue-500 text-white p-2 ml-2">Add</button>
            </div>
            <ul>
                {items.map(item => (
                    <li key={item.id} className="flex justify-between items-center">
                        <span>{item.name}</span>
                        <div>
                            <button onClick={() => setEditItem({ id: item.id, value: item.name })} className="bg-yellow-500 text-white p-1 mx-1">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white p-1">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            {editItem.id && (
                <div className="my-4">
                    <input
                        type="text"
                        value={editItem.value}
                        onChange={(e) => setEditItem({ ...editItem, value: e.target.value })}
                        placeholder="Edit item"
                        className="border p-2"
                    />
                    <button onClick={handleUpdate} className="bg-green-500 text-white p-2 ml-2">Update</button>
                </div>
            )}
        </div>
    );
};

export default CrudComponent;
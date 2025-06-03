import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const CrudComponent = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '' });
    const [editItem, setEditItem] = useState({ id: null, name: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/items`);
            if (response.data.success) {
                setItems(response.data.data);
            }
        } catch (error) {
            setError('Failed to fetch items');
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newItem.name.trim()) return;
        try {
            const response = await axios.post(`${API_BASE_URL}/items`, newItem);
            if (response.data.success) {
                setNewItem({ name: '', description: '' });
                fetchItems();
                setError('');
            }
        } catch (error) {
            setError('Failed to create item');
            console.error('Error creating item:', error);
        }
    };

    const handleUpdate = async () => {
        if (!editItem.name.trim()) return;
        try {
            const response = await axios.put(`${API_BASE_URL}/items/${editItem.id}`, {
                name: editItem.name,
                description: editItem.description
            });
            if (response.data.success) {
                setEditItem({ id: null, name: '', description: '' });
                fetchItems();
                setError('');
            }
        } catch (error) {
            setError('Failed to update item');
            console.error('Error updating item:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            const response = await axios.delete(`${API_BASE_URL}/items/${id}`);
            if (response.data.success) {
                fetchItems();
                setError('');
            }
        } catch (error) {
            setError('Failed to delete item');
            console.error('Error deleting item:', error);
        }
    };

    const startEdit = (item) => {
        setEditItem({
            id: item.id,
            name: item.name,
            description: item.description || ''
        });
    };

    const cancelEdit = () => {
        setEditItem({ id: null, name: '', description: '' });
    };

    return (
        <div className="max-w-4xl mx-auto">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            
            {/* Create Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        placeholder="Item name"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        placeholder="Item description"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={handleCreate}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                    Add Item
                </button>
            </div>

            {/* Edit Form */}
            {editItem.id && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={editItem.name}
                            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                            placeholder="Item name"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                            type="text"
                            value={editItem.description}
                            onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                            placeholder="Item description"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="mt-4 space-x-2">
                        <button
                            onClick={handleUpdate}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                        >
                            Update
                        </button>
                        <button
                            onClick={cancelEdit}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Items List */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Items</h2>
                {loading ? (
                    <div className="text-center py-4">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">No items found</div>
                ) : (
                    <div className="space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="border border-gray-200 rounded-md p-4 flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                    {item.description && (
                                        <p className="text-gray-600 mt-1">{item.description}</p>
                                    )}
                                    <p className="text-xs text-gray-400 mt-2">
                                        Created: {new Date(item.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => startEdit(item)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CrudComponent;
import React, { useState } from 'react';
import './Admin.css';  // Link your CSS file here

// Define interfaces for the product structure
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

const AdminPanel: React.FC = () => {
    // Dummy product data for demonstration purposes
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: 'Product 1', price: 100, image: 'https://via.placeholder.com/300' },
        { id: 2, name: 'Product 2', price: 200, image: 'https://via.placeholder.com/300' },
        { id: 3, name: 'Product 3', price: 150, image: 'https://via.placeholder.com/300' },
    ]);

    // State for form inputs
    const [newProduct, setNewProduct] = useState<Product>({ id: 0, name: '', price: 0, image: '' });

    // Handle adding a new product
    const handleAddProduct = () => {
        setProducts([...products, { ...newProduct, id: products.length + 1 }]);
        setNewProduct({ id: 0, name: '', price: 0, image: '' }); // Reset the form
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setNewProduct({
            ...newProduct,
            [field]: field === 'price' ? parseFloat(e.target.value) : e.target.value,
        });
    };

    // Handle product deletion
    const handleDelete = (id: number) => {
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <div className="admin-panel">
            {/* Admin Navigation Bar */}
            <div className="admin-navigation-bar">
                <div className="admin-logo">Admin Panel</div>
                <div className="admin-menu">
                    <div className="admin-menu-item">Dashboard</div>
                    <div className="admin-menu-item">Products</div>
                </div>
            </div>

            {/* Admin Sidebar */}
            <div className="admin-sidebar">
                <a href="#">Dashboard</a>
                <a href="#">Manage Products</a>
                <a href="#">Orders</a>
                <a href="#">Settings</a>
            </div>

            {/* Dashboard Section */}
            <div className="dashboard-overview">
                <div className="dashboard-title">Dashboard</div>
                <div className="dashboard-stats">
                    <div className="stat-card">Total Products: {products.length}</div>
                    <div className="stat-card">Orders: 0</div>
                    <div className="stat-card">Sales: $0</div>
                </div>
            </div>

            {/* Product Listing Section */}
            <div className="product-listing">
                <div className="product-listing-title">Product Listing</div>
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-item">
                            <img src={product.image} alt={product.name} />
                            <div className="product-name">{product.name}</div>
                            <div className="product-price">${product.price}</div>
                            <div className="action-buttons">
                                <button className="edit-button">Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Product Form */}
            <div className="add-product-form">
                <div className="add-product-title">Add New Product</div>
                <div className="form-group">
                    <label className="form-label">Product Name</label>
                    <input
                        type="text"
                        className="form-input"
                        value={newProduct.name}
                        onChange={(e) => handleChange(e, 'name')}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-input"
                        value={newProduct.price}
                        onChange={(e) => handleChange(e, 'price')}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Product Image URL</label>
                    <input
                        type="text"
                        className="form-input"
                        value={newProduct.image}
                        onChange={(e) => handleChange(e, 'image')}
                    />
                </div>
                <button className="form-button" onClick={handleAddProduct}>Add Product</button>
            </div>
        </div>
    );
};

export default AdminPanel;

import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axiosConfig';
import '../styles/view-seller-product.css';
import { useSelector } from 'react-redux';

const ViewSellerProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = useSelector((state) => state.auth.user);
    const userId = user.userId;
    const navigate = useNavigate();

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.put(`/seller/delete-product/${productId}`, { sellerId: userId });
                toast.success('Product deleted successfully!');
                setProducts(products.filter(product => product._id !== productId));
            } catch (err) {
                console.error('Error deleting product:', err);
                toast.error('Error deleting product. Please try again.');
            }
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get(`/seller/view-products/${userId}`);
                // console.log(response.data.products);
                setProducts(response.data.products);
            } catch (err) {
                setError("Error fetching products. Please try again later.");
                toast.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [userId]);

    if (loading) {
        return <div className="loading-message">Loading products...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (products.length === 0) {
        return <div className="no-products-message">No products found.</div>;
    }

    return (
        <div className="view-product-container">
            <h2>Your Products</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <Link to={`/product/${product._id}`} key={product._id} className="product-card-link">
                        <div className="product-card">
                            <img src={product.imgUrl} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>Price: ₹{product.price}</p>
                            <p>Category: {product.category}</p>
                            <p>Stock: {product.stock}</p>
                            <div className="product-actions">
                                <button onClick={(e) => { e.preventDefault(); navigate(`/edit-product/${product._id}`); }}>Edit</button>
                                <button onClick={(e) => { e.preventDefault(); handleDelete(product._id); }}>Delete</button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ViewSellerProduct;
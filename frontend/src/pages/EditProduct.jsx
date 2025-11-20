import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../api/axiosConfig';
import '../styles/edit-product.css';

const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const userId = user?.userId;

    const [productData, setProductData] = useState({
        name: '',
        color: '',
        price: '',
        category: '',
        stock: '',
        imgUrl: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            toast.error('Please log in as a seller to edit products.');
            navigate('/login');
            return;
        }

        const fetchProduct = async () => {
            try {
                const response = await api.get(`/seller/view-products/${userId}`);
                const products = response.data.products;
                const productToEdit = products.find(p => p._id === productId);

                if (productToEdit) {
                    setProductData({
                        name: productToEdit.name,
                        color: productToEdit.color,
                        price: productToEdit.price,
                        category: productToEdit.category,
                        stock: productToEdit.stock,
                        imgUrl: productToEdit.imgUrl,
                    });
                } else {
                    setError('Product not found or you are not authorized to edit it.');
                    toast.error('Product not found or unauthorized.');
                }
            } catch (err) {
                console.error('Error fetching product details:', err);
                setError('Error fetching product details. Please try again later.');
                toast.error('Error fetching product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId, userId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (productData.price <= 0) {
            toast.error('Price must be a positive number.');
            return;
        }

        if (productData.stock < 0) {
            toast.error('Stock cannot be negative.');
            return;
        }

        setLoading(true);
        try {
            console.log(productData, "productData");
            await api.put(`/seller/edit-product/${productId}`, { ...productData, sellerId: userId });
            toast.success('Product updated successfully!');
            navigate('/view-seller-products');
        } catch (err) {
            console.error('Error updating product:', err);
            setError('Error updating product. Please try again.');
            toast.error('Error updating product.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading-message">Loading product details...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="edit-product-container">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit} className="edit-product-form">
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="color">Color</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={productData.color}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={productData.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imgUrl">Image URL</label>
                    <input
                        type="text"
                        id="imgUrl"
                        name="imgUrl"
                        value={productData.imgUrl}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Product'}
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
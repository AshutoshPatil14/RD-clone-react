import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { toast } from 'react-hot-toast';
import '../styles/search-results.css'; // We will create this CSS file next
import BrandLoader from "../components/BrandLoader";

const SearchResultsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) {
        setLoading(false);
        setProducts([]);
        return;
      }
      try {
        setLoading(true);
        const response = await api.get(`/products/search?query=${searchQuery}`);
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch search results');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  if (loading) {
    return <BrandLoader />;
  }

  return (
    <div className="search-results-page">
      <h1>Search Results for "{searchQuery}"</h1>
      {products.length === 0 ? (
        <div className="no-results">No products found matching your search.</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
              <img src={product.imgUrl || '/images/placeholder.png'} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Color: {product.color}</p>
              <span>₹{new Intl.NumberFormat('en-IN').format(product.price)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;

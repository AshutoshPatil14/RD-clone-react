import axios from 'axios';

const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await axios.post('/api/add-to-cart', { productId, quantity });
    console.log('Product added to cart:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};

export default addToCart;
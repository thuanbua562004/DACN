import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/api';

// Gọi API để lấy danh sách sản phẩm
export const fetchProducts = createAsyncThunk('products/getProducts', async (category) => {
  const response = await api.getProduct();
  return response.data;
});

// Gọi sản phẩm chi tiết (chấp nhận id làm đối số)
export const fetchProductsDetail = createAsyncThunk('products/getProductsDetail', async (id) => {
  const response = await api.getProductDetail(id);
  return response.data;
});

// Gọi sản phẩm chi tiết (chấp nhận id làm đối số)
export const fetchCart = createAsyncThunk('fetchCart/fetchCart', async (id_user) => {
  const response = await api.getCart(id_user);
  return response.data;
});
// Gọi API để xóa sản phẩm khỏi giỏ hàng
export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async ({ userId, itemId }) => {
  const response = await api.delItemCart(userId, itemId);
  return response.data;
});
//  Gọi api tăng số lượng
export const incrementQuantity = createAsyncThunk('cart/incrementQuantity', async ({userId,id_pro,quantity}) => {
  const response = await api.crementQuantity(id_pro, quantity,userId);  
  console.log(quantity)
  return id_pro;
});

export const decrementQuantity = createAsyncThunk('cart/decrementQuantity', async ({userId,id_pro,quantity}) => {
  const response = await api.crementQuantity(id_pro, quantity,userId);  
  return id_pro;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [], // Danh sách sản phẩm
    productDetail: null, // Chi tiết sản phẩm
    product_category: {
      id:"",
      name:"",
      products: []
    }
    ,
    cart: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Lấy danh sách sản phẩm
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        
        const product_category = {};
        action.payload.forEach((product) => {
          const category = product.details.loai; 
      
          if (!product_category[category]) {
            product_category[category] = {
              name: category === "ao" ? "Áo" : "Quần",
              products: []
            };
          }
          product_category[category].products.push(product);
        });
        state.product_category = product_category;
        console.log("Danh mục sản phẩm đã tạo:", product_category);
      })
      
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Lấy sản phẩm chi tiết
      .addCase(fetchProductsDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productDetail = action.payload;
      })
      .addCase(fetchProductsDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //// lay gio hang
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Xóa sản phẩm khỏi giỏ hàng
      .addCase(deleteCartItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Lọc bỏ mặt hàng đã xóa khỏi giỏ hàng
        state.cart = state.cart.filter(item => item._id !== action.payload._id);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Tăng số lượng sản phẩm trong giỏ hàng
      .addCase(incrementQuantity.fulfilled, (state, action) => {
        const productId = action.payload;
        const product = state.cart.find(item =>
          item.details.some(detail => detail._id === productId)
        );

        if (product) {
          const detail = product.details.find(detail => detail._id === productId);
          if (detail) {
            detail.number += 1;
          }
        }
      })


      .addCase(decrementQuantity.fulfilled, (state, action) => {
        const productId = action.payload;
        const product = state.cart.find(item =>
          item.details.some(detail => detail._id === productId)
        );

        if (product) {
          const detail = product.details.find(detail => detail._id === productId);
          if (detail && detail.number > 1) {
            detail.number -= 1; // Giảm số lượng, không giảm dưới 1
          }
        }
      });



  },
});

export default productsSlice.reducer;

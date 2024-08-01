import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0,
    },
    reducers:{
        addProduct:(state,action)=>{
            state.quantity+=1;
            state.products.push(action.payload);//Payload should be product 
            state.total+=action.payload.price*action.payload.quantity;
        },
        updateCart: (state, action) => {
            state.products = action.payload.products;//payload should be cart
            state.quantity = action.payload.quantity;
            state.total = calculateTotalPrice(state.products);
        },
        removeProduct: (state, action) => {
            const removedProductId = action.payload._id; // Payload should be the product 
            state.quantity-=1;
            state.products = state.products.filter(
              (product) => product._id !== removedProductId
            );
            state.total-=action.payload.price*action.payload.quantity;
          },
        removeCart:(state)=>{
          state.products=[];
          state.quantity=0;
          state.total=0;
        }
    }
})
const calculateTotalPrice = (products) => {
    let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += (products[i].quantity*products[i].price);
  }
  return total;
}
export const {addProduct,updateCart,removeProduct,removeCart} = cartSlice.actions;
export default cartSlice.reducer;

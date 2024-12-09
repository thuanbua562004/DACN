import axios from '../service/axios';

const register = (email , password, id="") => {
    return axios.post("/user",{email,password,id});
}


const getUser = (email, password) => {
    return axios.get("/user", { params: { email: email ,password :password} } );
};

const updateUser = (id, name , phone , address , dateBirth ) => {
    return axios.put('/user', {id, name, phone, address, dateBirth});
}

const getProduct = () => {
    return axios.get("/product");
}

const getProductDetail = (id) => {
    return axios.get(`/product/${id}`);
}

const addProductToCart = (user_id , id_color_size, color , productId, imgProduct,nameProduct,number,price,size) => {
    return axios.post("/add-cart" ,{
        userId: user_id,
        id_color_size: id_color_size,
        color: color,
        productId: productId, 
        imgProduct: imgProduct,
        nameProduct: nameProduct, 
        number: number, 
        price: price, 
        size: size 
      });
}

const delItemCart = (userId, id_color_size) => {
    console.log(userId, id_color_size);
    return axios.delete("/delItems-cart", {
        data: {
                userid: userId,
                color_size: id_color_size
            }
    });
}

const getCart = (id)=>{
    return axios.post("/cart", {id});
}
const delCart = (id)=>{
    return axios.delete("/del-cart", {  data: {
        userid: id
    }});
}

/// update quantity cart

const crementQuantity = (id_color_size,number,userId ) => {
    return axios.put("/update-cart", {
        userid: userId,
        color_size: id_color_size,
        number: number
    });
}

const checkOut =(id,address,methodPayload,totalPrice,phone,listProduct ,note)=>{
    return axios.post("/buy",{
        id: id,
        address: address,
        method: methodPayload,
        totalPrice: totalPrice,
        phone: phone,
        note: note,
        listProduct: listProduct
    });
}
const vnPay =(id,amount)=>{
    return axios.post("/order/create_payment_url",{
        id:id,
        amount:amount
    });
}
const getHistory =(id)=>{
    return axios.get(`/buy/${id}`);
}
const getVoucher =(code)=>{
    return axios.get(`/voucher/${code}`);
}

const addComment =(content,images,email,id_product)=>{
    return axios.post('/comment',{
    content: content,
    images: images || "",
    email: email,
    id_product: id_product
    });
}
const deleteComment = (id_comment, id_product) => {
    return axios.delete('/comment', {
      data: {
        id_comment: id_comment,
        id_product: id_product,
      }
    });
  };
  
export default { getUser, updateUser,getProduct ,getProductDetail
    ,register,addProductToCart,getCart,delItemCart,checkOut,
    crementQuantity,delCart,vnPay,getHistory, getVoucher,addComment,
    deleteComment};

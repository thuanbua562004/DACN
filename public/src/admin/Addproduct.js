import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../service/api"
function AddProduct() {
  const [listcate, setListCate] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("")
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [variants, setVariants] = useState([
    { color: "", imageUrl: "", sizes: [{ size: "", quantity: 0 }] },
  ]); // Default product variant

  // Fetch category list
  const getCategory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/category");
      setListCate(response.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  // Handle variant color change
  const handleVariantChange = (variantIndex, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex][field] = value;
    setVariants(updatedVariants);
  };

  // Handle size change for a variant
  const handleSizeChange = (variantIndex, sizeIndex, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].sizes[sizeIndex][field] = value;
    setVariants(updatedVariants);
  };

  // Add a new size for a variant
  const handleAddSize = (variantIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].sizes.push({ size: "", quantity: 0 });
    setVariants(updatedVariants);
  };

  // Add a new variant (color)
  const handleAddVariant = () => {
    setVariants([
      ...variants,
      { color: "", imageUrl: "", sizes: [{ size: "", quantity: 0 }] },
    ]);
  };

  // Handle image upload for a specific variant
  const handleImageChange = (e, variantIndex) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].imageUrl = reader.result; // Set preview for that variant
        setVariants(updatedVariants);

        const formData = new FormData();
        formData.append("image", file);
        axios
          .post("http://localhost:5000/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            updatedVariants[variantIndex].imageUrl = response.data.filePath;
            setVariants(updatedVariants);
            setUploading(false);
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
            setUploading(false);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async() => {
    if (!productName || !description || !category || variants.some(variant => !variant.color || !variant.imageUrl)) {
      alert("Vui lòng điền đầy đủ thông tin, bao gồm màu sắc và ảnh cho mỗi biến thể!");
      return;
    }
    try {
      const payload = {
        productName,
        price,
        info: description,
        category,
        variants,
      };
      console.log("Payload to be sent:", payload);
    
      const response = await axios.post("http://localhost:5000/api/product", payload);
      if(response){
        window.location.href("/")
      }
      console.log("Product created successfully:", response.data);
    } catch (e) {
      console.error("Error creating product:", e.response?.data || e.message);
    }
    
  
  };

  return (
<div className="container mt-5">
  <h2 className="text-center mb-4">Thêm Sản Phẩm</h2>
  <div className="row">
    {/* Left Column */}
    <div className="col-md-12">
      <div className="form-group mb-4">
        <label htmlFor="name" className="form-label">Tên Sản Phẩm</label>
        <input
          id="name"
          type="text"
          className="form-control"
          placeholder="Nhập tên sản phẩm"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="description" className="form-label">Giá</label>
        <input
          type="number"
          className="form-control"
          rows="4"
          placeholder="Nhập giá sản phẩm"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="description" className="form-label">Mô tả</label>
        <textarea
          id="description"
          className="form-control"
          rows="4"
          placeholder="Nhập mô tả sản phẩm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="category" className="form-label">Danh mục</label>
        <select
          id="category"
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>Chọn danh mục</option>
          {listcate.map((item, index) => (
            <option key={index} value={item.loai}>{item.loai}</option>
          ))}
        </select>
      </div>
    </div>

    {/* Right Column */}
    <div className="col-md-12">
      <h3 className="mb-4">Biến thể</h3>
      {variants.map((variant, variantIndex) => (
        <div
          key={variantIndex}
          className="border p-4 mb-4 rounded shadow-sm"
        >
          {/* Màu sắc */}
          <div className="mb-4">
            <label className="form-label">Màu sắc</label>
            <input
              type="text"
              className="form-control"
              value={variant.color}
              onChange={(e) =>
                handleVariantChange(variantIndex, "color", e.target.value)
              }
              required
            />
          </div>

          {/* Image upload */}
          <div className="mb-4">
            <label className="form-label">Chọn ảnh</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleImageChange(e, variantIndex)}
              accept="image/*"
            />
            {/* Preview image */}
            {variant.imageUrl && (
              <div className="mt-3">
                <h5>Xem trước ảnh:</h5>
                <img
                  src={variant.imageUrl}
                  alt="Preview"
                  style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: "8px" }}
                />
              </div>
            )}
          </div>

          {/* Sizes */}
          <div className="mb-4">
            <h5>Kích cỡ</h5>
            {variant.sizes.map((size, sizeIndex) => (
              <div key={sizeIndex} className="d-flex mb-2" style={{ gap: "10px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Kích cỡ"
                  value={size.size}
                  onChange={(e) =>
                    handleSizeChange(variantIndex, sizeIndex, "size", e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Số lượng"
                  value={size.quantity}
                  onChange={(e) =>
                    handleSizeChange(variantIndex, sizeIndex, "quantity", e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={() => handleAddSize(variantIndex)}
            >
              Thêm kích cỡ
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-success mb-4"
        onClick={handleAddVariant}
      >
        Thêm màu sắc
      </button>
    </div>
  </div>

  <div className="text-center">
    <button
      className="btn btn-primary mt-3"
      onClick={handleSubmit}
    >
      Thêm sản phẩm
    </button>
  </div>
</div>

  );
}

export default AddProduct;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateProduct() {
  const [listcate, setListCate] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [variants, setVariants] = useState([]);
  const { productId } = useParams();
    const [product ,setProduct] = useState([])
  // Fetch category list
  const getCategory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/category");
      setListCate(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch product details
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/product/${productId}`
      );
      setProduct(response.data[0])
      console.log(response.data[0].details.name)
      setProductName(response.data[0].details.name);
      setPrice(response.data[0].details.price);
      setDescription(response.data[0].details.info);
      setCategory(response.data[0].details.loai);
      setVariants(response.data[0].details.imgForColor  );
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    getCategory();
    fetchProductDetails();
  }, [productId]);

  // Handle variant and size changes
  const handleVariantChange = (variantIndex, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex][field] = value;
    setVariants(updatedVariants);
  };

  const handleSizeChange = (variantIndex, sizeIndex, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].sizes[sizeIndex][field] = value;
    setVariants(updatedVariants);
  };

  const handleAddSize = (variantIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].sizes.push({ size: "", quantity: 0 });
    setVariants(updatedVariants);
  };

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      { color: "", imageUrl: "", sizes: [{ size: "", quantity: 0 }] },
    ]);
  };

  const handleImageChange = (e, variantIndex) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].imageUrl = reader.result;
        setVariants(updatedVariants);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const _id = productId
    if (
      !productName ||
      !description ||
      !category ||
      variants.some((variant) => !variant.color || !variant.imageUrl)
    ) {
      alert(
        "Vui lòng điền đầy đủ thông tin, bao gồm màu sắc và ảnh cho mỗi biến thể!"
      );
      return;
    }

    try {
        console.log("va",variants)
      const payload = {
        _id,
        productName,
        price,
        info: description,
        category,
        variants,
      };

      const response = await axios.put(
        `http://localhost:5000/api/product`,
        payload
      );
      alert("Sản phẩm đã được cập nhật thành công!");
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error.message);
      alert("Có lỗi xảy ra khi cập nhật sản phẩm.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cập Nhật Sản Phẩm</h2>
      <div className="row">
        {/* General Product Information */}
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
            <label htmlFor="price" className="form-label">Giá</label>
            <input
              type="number"
              className="form-control"
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
              required
            >
              <option value="" disabled>Chọn danh mục</option>
              {listcate.map((item, index) => (
                <option key={index} value={item.loai}>{item.loai}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Variants Section */}
        <div className="col-md-12">
          <h3 className="mb-4">Biến thể</h3>
          {variants.map((variant, variantIndex) => (
            <div
              key={variantIndex}
              className="border p-4 mb-4 rounded shadow-sm"
            >
              <div className="mb-4">
                <label htmlFor={`color-${variantIndex}`} className="form-label">Màu sắc</label>
                <input
                  id={`color-${variantIndex}`}
                  type="text"
                  className="form-control"
                  placeholder="Nhập màu sắc"
                  value={variant.color}
                  onChange={(e) =>
                    handleVariantChange(variantIndex, "color", e.target.value)
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor={`image-${variantIndex}`} className="form-label">Chọn ảnh</label>
                <input
                  id={`image-${variantIndex}`}
                  type="file"
                  className="form-control"
                  onChange={(e) => handleImageChange(e, variantIndex)}
                  accept="image/*"
                />
                {variant.imageUrl && (
                  <div className="mt-3">
                    <h5>Xem trước ảnh:</h5>
                    <img
                      src={variant.imageUrl}
                      alt={`Preview for ${variant.color}`}
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <h5>Kích cỡ</h5>
                {variant.sizes.map((size, sizeIndex) => (
                  <div
                    key={sizeIndex}
                    className="d-flex mb-2"
                    style={{ gap: "10px" }}
                  >
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

      {/* Submit Button */}
      <div className="text-center">
        <button
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
        >
          Cập nhật sản phẩm
        </button>
      </div>
    </div>
  );
}

export default UpdateProduct;

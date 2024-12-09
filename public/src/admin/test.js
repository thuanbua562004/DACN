import React, { useState } from "react";

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [variants, setVariants] = useState([
    { color: "", sizes: [{ size: "", quantity: 0 }] },
  ]);

  const handleAddVariant = () => {
    setVariants([...variants, { color: "", sizes: [{ size: "", quantity: 0 }] }]);
  };

  const handleAddSize = (variantIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].sizes.push({ size: "", quantity: 0 });
    setVariants(newVariants);
  };

  const handleVariantChange = (variantIndex, field, value) => {
    const newVariants = [...variants];
    newVariants[variantIndex][field] = value;
    setVariants(newVariants);
  };

  const handleSizeChange = (variantIndex, sizeIndex, field, value) => {
    const newVariants = [...variants];
    newVariants[variantIndex].sizes[sizeIndex][field] = value;
    setVariants(newVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, category, variants };

    try {
      console.log(productData);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Không thể thêm sản phẩm. Vui lòng thử lại sau.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Thêm Sản Phẩm</h2>

      {/* Tên sản phẩm */}
      <div>
        <label>Tên Sản Phẩm:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Danh mục */}
      <div>
        <label>Danh Mục:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      {/* Variants */}
      <div>
        <h3>Biến thể</h3>
        {variants.map((variant, variantIndex) => (
          <div key={variantIndex} style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "10px" }}>
            {/* Màu sắc */}
            <label>Màu sắc:</label>
            <input
              type="text"
              value={variant.color}
              onChange={(e) =>
                handleVariantChange(variantIndex, "color", e.target.value)
              }
              required
            />

            {/* Sizes */}
            <div>
              <h4>Kích cỡ:</h4>
              {variant.sizes.map((size, sizeIndex) => (
                <div key={sizeIndex} style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    placeholder="Kích cỡ"
                    value={size.size}
                    onChange={(e) =>
                      handleSizeChange(
                        variantIndex,
                        sizeIndex,
                        "size",
                        e.target.value
                      )
                    }
                    required
                  />
                  <input
                    type="number"
                    placeholder="Số lượng"
                    value={size.quantity}
                    onChange={(e) =>
                      handleSizeChange(
                        variantIndex,
                        sizeIndex,
                        "quantity",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
              ))}
              <button type="button" onClick={() => handleAddSize(variantIndex)}>
                Thêm kích cỡ
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddVariant}>
          Thêm màu sắc
        </button>
      </div>

      {/* Nút thêm sản phẩm */}
      <button type="submit">Thêm Sản Phẩm</button>
    </form>
  );
};

export default AddProductForm;

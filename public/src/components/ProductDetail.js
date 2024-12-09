import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsDetail } from '../redux/slice/sliceApi';
import { faCar, faRotateBack, faRuler } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tablsize from '../tablesize.png';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import api from '../service/api';
import Product from '../components/product-4'
import axios from 'axios';

function ProductDetail() {
  const [color, setcolor] = useState('')
  const [imageIntro, setimageIntro] = useState("")
  const [size, setsize] = useState('')
  const [sizeProduct ,setSizeProduct] = useState([])
  const [number, setnumber] = useState(1)
  const [image, setImage] = useState('');
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const email = localStorage.getItem('email');
  const [stageComment, setStageComment] = useState([]);
  const { status, error, productDetail } = useSelector((state) => state.posts);



  const getComment = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/comment/${id}`);
      if (response && response.data && response.data.comments) {
        setStageComment(response.data.comments);
        console.log(response.data.comments);
      } else {
        console.log('No comments found or unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Could not fetch comments');
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductsDetail(id));
      getComment();
      filterSize();
    }
  }, [dispatch, id]);


  async function handlerAddCart() {
    const nameProduct = productDetail[0].details.name;
    const imgProduct = imageIntro;
    const productId = productDetail[0].details.id;
    const price = productDetail[0].details.price;
    const id_color_size = `${id}_${color}_${size}`;
    const user_id = localStorage.getItem('id');
    if (color === "" || size === "") {
      toast.error("Chưa chọn màu hoặc size");
      return;
    }
    try {
      const res = await api.addProductToCart(user_id, id_color_size, color, productId, imgProduct, nameProduct, number, price, size);
      if (res.status == 200) {
        toast.success("Thêm sản phẩm vào giỏ hàng thành công");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 501) {
        toast.error("Sản phẩm đã có trong giỏ hàng!");
      } else {
        toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng");
      }
    }
  }
  const filterSize = () => {
    if (!imageIntro) {
      console.log("imageIntro is not set.");
      return;
    }

    const firstSize = productDetail?.[0];
    if (!firstSize || !firstSize.details || !firstSize.details.imgForColor) {
      console.log("No details or imgForColor available.");
      return;
    }

    const listSize = firstSize.details.imgForColor.filter(item => item.imageUrl === imageIntro);
    setSizeProduct(listSize)
    console.log(listSize)
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);
    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      return response.data.filePath; // Return the image URL after successful upload
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Image upload failed');
    }
  };

  const handleSaveComment = async () => {
    if (!comment || !image) {
      toast.error('Please add both comment and image.');
      return;
    }
    try {
      const imageUrl = await handleImageUpload();
      const response = await api.addComment(comment, imageUrl, email, id);
      if (response.status === 201) {
        toast.success('Bình luận đã được gửi!');
        setComment("");
        window.location.reload();

      }
    } catch (error) {
      toast.error('Có lỗi khi gửi bình luận.');
    }
  };
  const deleteComment = async (id_comment) => {
    const deleteComments = await api.deleteComment(id_comment, id)
    if (deleteComments.status === 200) {
      toast.success('Bình luận đã được xóa!');
      const newComments = stageComment.filter((comment) => comment._id !== id_comment);
      setStageComment(newComments);
    }
  }

  if (status === 'loading') {
    return (
      <div className="container d-flex justify-content-center align-items-center h-75" style={{ height: "150px" }}>
        <div className="text-danger fs-1">
          Loading....
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!productDetail) {
    return <div>Product not found.</div>;
  }
  const product = productDetail[0].details;
  return (
    <>
      <ToastContainer position="top-center" autoClose={500} />
      <div className="container my-4 py-3" style={{ backgroundColor: "#f2f2f2" }}>
        <div className="row g-4">
          {/* Product Image Section */}
          <div className="col-12 col-md-6">
            <div id="productCarousel" className="carousel slide" data-bs-touch="true" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={imageIntro ? imageIntro : product.imgForColor[0].imageUrl} className="d-block w-100" alt="Product" />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon bg-danger rounded-circle" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon bg-danger rounded-circle" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="col-12 col-md-6">
            <h1 className="fs-5 text-black">{product.name}</h1>
            <hr />
            <h5 className="text-danger fs-3">{product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h5>
            <p className="fs-6">
              <FontAwesomeIcon icon={faRotateBack} /> Đổi trả dễ dàng &nbsp;
              <FontAwesomeIcon icon={faCar} /> Chính hãng 100% &nbsp;
              <FontAwesomeIcon icon={faCar} /> Giao toàn quốc
            </p>

            {/* Color Selection */}
            <div className="mt-3">
              <strong>Màu Sắc:</strong> {color}
              <div className="d-flex mt-2 gap-2">
                {product.imgForColor.map((colorOption) => (
                  <button
                    key={colorOption.color} // Ensure each button has a unique key
                    onClick={() => {
                      setcolor(colorOption.color);
                      setimageIntro(colorOption.imageUrl);
                      filterSize();
                    }}
                    className={`btn btn-circle ${color === colorOption.color ? 'border border-dark' : ''}`} // Add active class based on selected color
                    style={{
                      width: 35,
                      height: 35,
                      padding: 0,
                      borderRadius: '50%',
                      backgroundColor: 'transparent',
                    }}
                  >
                    <img
                      src={colorOption.imageUrl}
                      alt={colorOption.color}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>


            {/* Size Selection */}
            <div className="d-flex gap-2 mt-2">
              {sizeProduct != null && sizeProduct.length > 0? (
                sizeProduct[0].sizes.map((sz) => (
                  <button
                    onClick={() => setsize(sz.size)}
                    key={sz.size}
                    className={`btn btn-outline-secondary ${sz.quantity > 0 ? '' : 'disabled'}`}
                  >
                    {sz.size}
                  </button>
                ))
              ) : (
                <p>Vui lòng chọn màu trước !</p>
              )}
            </div>


            {/* Quantity Selector */}
            <div className="mt-3">
              <strong>Số Lượng:</strong>
              <div className="d-flex mt-2">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setnumber(Math.max(1, number - 1))}
                >
                  -
                </button>
                <input
                  type="text"
                  value={number}
                  readOnly
                  className="form-control text-center mx-2"
                  style={{ width: "50px" }}
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setnumber(number + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 d-flex gap-3">
              <button className="btn btn-danger w-100">Mua Ngay</button>
              <button onClick={handlerAddCart} className="btn btn-outline-secondary w-100">
                Thêm Vào Giỏ
              </button>
            </div>
          </div>
        </div>

        <hr />

        {/* Product Info Section */}
        <div className="mt-4">
          <h4>Thông Tin Sản Phẩm</h4>
          <p>{product.info}</p>
          {/* <img src={pro.details.img3 ? pro.details.img3 : pro.details.img1} className="img-fluid my-4 w-75" alt="Product Detail" /> */}
          <p>
            Hướng dẫn sử dụng sản phẩm Teelab:
            - Ngâm áo vào NƯỚC LẠNH có pha giấm hoặc phèn chua từ trong 2 tiếng đồng hồ
            - Giặt ở nhiệt độ bình thường, với đồ có màu tương tự.
            - Không dùng hóa chất tẩy.
            - Hạn chế sử dụng máy sấy và ủi (nếu có) thì ở nhiệt độ thích hợp.

            Chính sách bảo hành:
            - Miễn phí đổi hàng cho khách mua ở TEELAB trong trường hợp bị lỗi từ nhà sản xuất, giao nhầm hàng, bị hư hỏng trong quá trình vận chuyển hàng.
            - Sản phẩm đổi trong thời gian 3 ngày kể từ ngày nhận hàng
            - Sản phẩm còn mới nguyên tem, tags và mang theo hoá đơn mua hàng, sản phẩm chưa giặt và không dơ bẩn, hư hỏng bởi những tác nhân bên ngoài cửa hàng sau khi mua hàng.
          </p>
        </div>

        <hr />

        {/* Comments Section */}
        <div className="container-fluid mt-4">
          <h4 className="mb-3">Bình Luận</h4>
          <div
            className="toggle-comments text-primary fw-bold py-2 px-3 rounded shadow-sm"
            style={{
              cursor: "pointer",
              display: "inline-block",
              backgroundColor: "#e9ecef",
              transition: "background-color 0.3s",
            }}
            data-bs-toggle="collapse"
            data-bs-target="#commentSection"
            aria-expanded="false"
            aria-controls="commentSection"
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d3d3d3")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e9ecef")}
          >
            Xem Bình Luận Sản Phẩm
          </div>


          <div className="collapse mt-3" id="commentSection">
            {/* Display comments */}
            {stageComment.length > 0 ? (
              stageComment.map((item) => (
                <div key={item._id} className="card p-3 mb-3">
                  <div className="d-flex">
                    <img
                      src={item.images}
                      alt="User"
                      className="rounded-circle me-3"
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                    <div>
                      <p className="mb-1">
                        <strong className="text-primary">{item.email}:</strong> {item.content}
                      </p>
                      {item.email === email && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteComment(item._id)}
                        >
                          Xóa
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">Không có bình luận nào cho sản phẩm này.</p>
            )}

            {/* Comment Form */}
            {email ? (
              <div className="mt-4">
                <label htmlFor="commentInput" className="form-label">Thêm Bình Luận</label>
                <textarea
                  id="commentInput"
                  className="form-control mb-3"
                  rows="3"
                  placeholder="Nhập bình luận của bạn..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>

                <label htmlFor="uploadImage" className="form-label">Tải Lên Hình Ảnh</label>
                <input
                  id="uploadImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control mb-3"
                />

                <button
                  onClick={handleSaveComment}
                  className="btn w-100"
                  style={{ backgroundColor: "#28a745", color: "white", border: "none", fontWeight: "bold" }}
                >
                  Gửi Bình Luận
                </button>

              </div>
            ) : (
              <p className="text-danger mt-3">Bạn cần đăng nhập để thêm bình luận.</p>
            )}
          </div>
        </div>

      </div>
      <div class="container">
        <h5 className='mt-3'>Xem Thêm Sản Phẩm</h5>
        <div className="d-grid product-grid">
          <Product />
        </div>

      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Bảng Size
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <img
                className="w-100 image-flush"
                src={tablsize}
                alt=""
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng !
              </button>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default ProductDetail
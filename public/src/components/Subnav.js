import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../redux/slice/sliceApi';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Subnav() {
    const dispatch = useDispatch();
    const { items: posts, status, error } = useSelector((state) => state.posts);
    const [keySearch, setKeySearch] = useState('');
    const [loading, setLoading] = useState(true); // Trạng thái loading

    // Lấy dữ liệu sản phẩm khi component được render
    useEffect(() => {
        dispatch(fetchProducts()).then(() => setLoading(false));
    }, [dispatch]);

    // Lọc sản phẩm theo từ khóa tìm kiếm
    const filteredProducts = posts.filter(product =>
        product.details.name.toLowerCase().includes(keySearch.toLowerCase())
    );

    return (
        <>
            <div className="container">
                <hr style={{ margin: "0px" }} />
                <ul className="nav justify-content-center bg-white flex-wrap" style={{ height: "auto", alignItems: "center" }}>

                    <li className="nav-item mx-3">
                        <a className="nav-link text-black" href="/product" tabIndex="-1" aria-disabled="true">More</a>
                    </li>
                    <li className="nav-item mx-3 item-search text-white align-items-center">
                        <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal1" className='text-danger'>
                            <FontAwesomeIcon icon={faSearch} />
                        </a>
                    </li>
                </ul>

                <hr style={{ margin: "0px" }} />

                {/* Modal tìm kiếm */}
                <div className="modal fade" id="exampleModal1" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    <i className="bi bi-search" /> Tìm Kiếm
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập từ khóa tìm kiếm..."
                                            aria-label="Search"
                                            id="searchInput"
                                            onChange={(e) => setKeySearch(e.target.value)}
                                            value={keySearch}
                                            style={{ outline: 'none', boxShadow: 'none', borderColor: 'inherit' }}
                                        />
                                    </div>
                                </form>

                                {/* Hiển thị loading hoặc kết quả */}
                                {loading ? (
                                    <p>Đang tải sản phẩm...</p>
                                ) : (
                                    filteredProducts.length > 0 ? (
                                        <div id="searchResults" className="mt-3">
                                            <TransitionGroup>
                                                {filteredProducts.map((item) => (
                                                    <a href={`/product/${item._id}`} key={item._id} style={{ textDecoration: "none", color: "black" }}>
                                                        <CSSTransition timeout={300} classNames="fade">
                                                            <div className="search-result-item d-flex align-items-center mb-3">
                                                                <img
                                                                    src={item.details.imgForColor[0].imageUrl}
                                                                    alt="Image"
                                                                    className="img-fluid rounded-circle me-3"
                                                                    style={{ width: '100px', height: '100px' }}
                                                                />
                                                                <div className="d-flex flex-column">
                                                                    <div className="justify-content-between align-items-center mb-2">
                                                                        <h6 className="mb-0">{item.details.name}</h6>
                                                                        <span className="text-success">{item.details.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CSSTransition>
                                                    </a>
                                                ))}
                                            </TransitionGroup>
                                        </div>
                                    ) : (
                                        <p>Không tìm thấy sản phẩm nào.</p>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Subnav;

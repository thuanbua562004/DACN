import React, { useEffect, useState } from 'react';
import Api from '../service/api';

function Profile(props) {
    const [jsonuser, setJsonuser] = useState(null);
    const pass = localStorage.getItem('pass');
    const email = localStorage.getItem('email');

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await Api.getUser(email, pass);
                setJsonuser(response.data);
            } catch (e) {
                console.log('Error:', e);
            }
        };

        getUser();
    }, [email, pass]);

    if (!jsonuser) return <p>Loading...</p>;

    return (
        <div className="container">
            <div className="row d-flex" style={{ justifyContent: "center" }}>
                <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 layout-top-spacing">
                    <div className="user-profile mt-2">
                        <div className="widget-content widget-content-area">
                            <div className="d-flex justify-content-between">
                                <h3 className="">Hồ Sơ</h3>
                                <a href='/profile-update' className="mt-2 edit-profile ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={15}
                                        height={15}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-edit-3"
                                    >
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                    </svg>
                                </a>
                            </div>
                            <div className="text-center user-info">
                                <img className="w-25 h-25 img-fluid rounded-circle mb-4"
                                    src={jsonuser.details.img? jsonuser.details.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUE7jXHro7BdwC8kOvXnqQ7m1SwUP6MH6iK_ZLmKKjiG8tkhq7q_tytzMTXBtGsSRp0Y&usqp=CAU"}
                                    alt="User Profile"
                                />
                                <p className="">{jsonuser.details?.name || "Tên người dùng"}</p>
                            </div>
                            <div className="user-info-list">
                                <ul className="contacts-block list-unstyled">
                                    <a className='item-link text-danger' href='/history'>
                                        <li className="contacts-block__item">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-shopping-cart me-3"
                                            >
                                                <circle cx="9" cy="21" r="1"></circle>
                                                <circle cx="20" cy="21" r="1"></circle>
                                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                            </svg>
                                            Đơn Hàng
                                        </li>
                                    </a>
                                    <li className="contacts-block__item">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-calendar me-3"
                                        >
                                            <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
                                            <line x1={16} y1={2} x2={16} y2={6} />
                                            <line x1={8} y1={2} x2={8} y2={6} />
                                            <line x1={3} y1={10} x2={21} y2={10} />
                                        </svg>
                                        {jsonuser.details?.dateBirth || "Ngày sinh"}
                                    </li>
                                    <li className="contacts-block__item">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-map-pin me-3"
                                        >
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx={12} cy={10} r={3} />
                                        </svg>
                                        {jsonuser.details?.address || "Địa chỉ"}
                                    </li>
                                    <li className="contacts-block__item">
                                        <a href={`mailto:${jsonuser.details?.email || 'example@mail.com'}`}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-mail me-3"
                                            >
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                <polyline points="22,6 12,13 2,6" />
                                            </svg>
                                            {jsonuser.details?.email || "Email"}
                                        </a>
                                    </li>
                                    <li className="contacts-block__item">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-phone me-3"
                                        >
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                        {jsonuser.details?.phoneNumber || "Số điện thoại"}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;

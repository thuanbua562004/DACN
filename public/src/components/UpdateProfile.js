import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Api from '../service/api';
import { ToastContainer, toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';

function UpdateProfile() {
    const [tinhThanh, setTinhThanh] = useState([]);
    const [huyen, setHuyen] = useState([]);
    const [xa, setXa] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [dateBirth, setDateBirth] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const id = localStorage.getItem("id");
    const navigate = useNavigate();
    useEffect(() => {
        const getTinh = async () => {
            try {
                const res = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                setTinhThanh(res.data.data);
            } catch (error) {
                console.error("Error fetching Tỉnh/Thành:", error);
            }
        };
        getTinh();
    }, []);

    const getHuyen = async (idTinh) => {
        try {
            const res = await axios.get(`https://esgoo.net/api-tinhthanh/2/${idTinh}.htm`);
            setHuyen(res.data.data);
        } catch (error) {
            console.error("Error fetching Quận/Huyện:", error);
        }
    };

    const getXa = async (idHuyen) => {
        try {
            const res = await axios.get(`https://esgoo.net/api-tinhthanh/3/${idHuyen}.htm`);
            setXa(res.data.data);
        } catch (error) {
            console.error("Error fetching Phường/Xã:", error);
        }
    };

    const getAddress = async (idXa) => {
        try {
            const res = await axios.get(`https://esgoo.net/api-tinhthanh/5/${idXa}.htm`);
            setDetailAddress(res.data.data.full_name);
        } catch (error) {
            console.error("Error fetching address:", error);
        }
    };

    const handleUpdateUser = async (event) => {
        event.preventDefault(); 
        if (name == "" || phone == "" || dateBirth == "" || detailAddress == "") {
            toast.error("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        
        try {
            const res = await Api.updateUser(id, name?name:null, phone?phone:null, detailAddress?detailAddress:null, dateBirth?dateBirth:null);
            if (res.status === 200) {
                console.log("User information updated successfully", res);
                toast.success("Thông tin người dùng đã được cập nhật thành công!");
                navigate('/profile');
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                alert("Error updating user information");
            }
        }
    };

    return (
     <>
        <ToastContainer />
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card shadow-lg">
                        <div className="card-body text-center">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUE7jXHro7BdwC8kOvXnqQ7m1SwUP6MH6iK_ZLmKKjiG8tkhq7q_tytzMTXBtGsSRp0Y&usqp=CAU"
                                className="img-fluid rounded-circle mb-4"
                                alt="User avatar"
                                style={{ width: '120px', height: '120px' }}
                            />
                            <h4 className="mb-4">Cập Nhật Thông Tin</h4>
                            <form onSubmit={handleUpdateUser}>
                                <div className="form-group row mb-3">
                                    <label className="col-sm-4 col-form-label text-sm-right">Họ Tên</label>
                                    <div className="col-sm-8">
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập họ tên của bạn"
                                        />
                                    </div>
                                </div>

                                {/* Số Điện Thoại */}
                                <div className="form-group row mb-3">
                                    <label className="col-sm-4 col-form-label text-sm-right">Số Điện Thoại</label>
                                    <div className="col-sm-8">
                                        <input
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            type="tel"
                                            className="form-control"
                                            placeholder="Nhập số điện thoại"
                                        />
                                    </div>
                                </div>

                                {/* Ngày Sinh */}
                                <div className="form-group row mb-3">
                                    <label className="col-sm-4 col-form-label text-sm-right">Ngày Sinh</label>
                                    <div className="col-sm-8">
                                        <input
                                            value={dateBirth}
                                            onChange={(e) => setDateBirth(e.target.value)}
                                            type="date"
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                {/* Địa Chỉ */}
                                <div className="form-group row mb-3">
                                    <label className="col-sm-4 col-form-label text-sm-right">Địa Chỉ</label>
                                    <div className="col-sm-8">
                                        <div className="form-group mb-2">
                                            <label htmlFor="city" className="form-label">Tỉnh thành</label>
                                            <select
                                                onChange={(e) => getHuyen(e.target.value)}
                                                id="city"
                                                className="form-control"
                                            >
                                                <option value="">Chọn Tỉnh thành</option>
                                                {tinhThanh.map((tinh) => (
                                                    <option key={tinh.id} value={tinh.id}>{tinh.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="district" className="form-label">Quận huyện</label>
                                            <select
                                                id="district"
                                                className="form-control"
                                                onChange={(e) => getXa(e.target.value)}
                                                disabled={huyen.length === 0}
                                            >
                                                <option value="">Chọn Quận huyện</option>
                                                {huyen.map((h) => (
                                                    <option key={h.id} value={h.id}>{h.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="ward" className="form-label">Phường xã</label>
                                            <select
                                                onChange={(e) => getAddress(e.target.value)}
                                                id="ward"
                                                className="form-control"
                                                disabled={xa.length === 0}
                                            >
                                                <option value="">Chọn Phường xã</option>
                                                {xa.map((x) => (
                                                    <option key={x.id} value={x.id}>{x.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block mt-3">
                                        Cập Nhật Thông Tin
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div></>
    );
}

export default UpdateProfile;

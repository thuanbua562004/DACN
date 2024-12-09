import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddAdress({ sendDataToParent }) {

    const [tinhThanh, setTinhThanh] = useState([]);
    const [huyen, setHuyen] = useState([]);
    const [xa, setXa] = useState([]);
    const [detailAddress, setDetailAddress] = useState("");

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

    // Sử dụng useEffect để gửi dữ liệu khi detailAddress thay đổi
    useEffect(() => {
        if (detailAddress) {
            sendDataToParent(detailAddress);
            console.log("Gửi dữ liệu lên component cha:", detailAddress);
        }
    }, [detailAddress]);

    return (
        <div className="form-group row mb-3">
            <label className="col-sm-8 col-form-label text-sm-right text-danger">Địa chỉ nhận hàng:</label>
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
    );
}

export default AddAdress;

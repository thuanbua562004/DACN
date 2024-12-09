const React = require('react');

class About extends React.Component {
    render(){
        return(
            <>
           <div className="container mt-5" style={{width:"70%"}}>
       <h1 className=" fs-3 mb-4">Chính sách Đổi trả</h1>

    <div className="card mb-4">
        <div className="card-body">
            <h5 className="card-title">1. CHÍNH SÁCH ĐỔI SẢN PHẨM</h5>
            <p className="card-text">– Áp dụng 01 lần đổi /1 đơn hàng với các đơn hàng mua online và các đơn hàng mua tại cửa hàng.</p>
            <p className="card-text">– Sản phẩm đổi trong thời gian 3 ngày kể từ ngày mua hàng trên hoá đơn (đối với khách mua hàng trực tiếp tại cửa hàng), 3 ngày kể từ ngày nhận hàng (Đối với khách mua online).</p>
            <p className="card-text">– Sản phẩm còn mới nguyên tem, tags và mang theo hoá đơn mua hàng, sản phẩm chưa giặt và không dơ bẩn, hư hỏng bởi những tác nhân bên ngoài cửa hàng sau khi mua hàng.</p>
            <p className="card-text">– Không áp dụng đối với các sản phẩm là phụ kiện.</p>
        </div>
    </div>

    <div className="card mb-4">
        <div className="card-body">
            <h5 className="card-title">2. PHƯƠNG THỨC ĐỔI SẢN PHẨM</h5>
            <p className="card-text"><strong>Điều kiện áp dụng</strong></p>
            <p className="card-text">– Sản phẩm lỗi kỹ thuật: Sản phẩm rách, bung keo, …</p>

            <p className="card-text"><strong>Trường hợp không được giải quyết</strong></p>
            <p className="card-text">– Sản phẩm đã qua sử dụng.</p>

            <p className="card-text">Đối với sản phẩm lỗi kỹ thuật, cần phản hồi đến Appstore trong vòng 3 ngày, kể từ ngày mua hàng trên hoá đơn đối với khách mua trực tiếp tại cửa hàng, 3 ngày kể từ ngày nhận hàng đối với khách mua online.</p>
        </div>
    </div>

    <div className="card mb-4">
        <div className="card-body">
            <h5 className="card-title">3. CHI PHÍ ĐỔI HÀNG</h5>
            <p className="card-text">– Miễn phí đổi hàng cho khách mua ở Appstore trong trường hợp bị lỗi từ nhà sản xuất, giao nhầm hàng, bị hư hỏng trong quá trình vận chuyển hàng.</p>
            <p className="card-text">– Trong trường hợp không vừa size hay khách hàng không ưng sản phẩm, không muốn nhận hàng, phiền khách hàng trả ship hoàn đơn hàng về.</p>
        </div>
    </div>
</div> 
            </>
        )
    }
}
export default About
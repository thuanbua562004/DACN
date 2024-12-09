const React = require('react');

class Intro extends React.Component {
    render() {
        return(
            <div className="container-lg mt-1 mx-auto">
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src="./image/f.webp"
                            className="d-block w-85 w-md-75 img-fluid mx-auto"
                            alt="Slide 1"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="./image/slider_1.webp"
                            className="d-block w-85 w-md-75 img-fluid mx-auto"
                            alt="Slide 2"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="./image/f.webp"
                            className="d-block w-85 w-md-75 img-fluid mx-auto"
                            alt="Slide 3"
                        />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon bg-black" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon bg-black" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        )
    }
}
export default Intro
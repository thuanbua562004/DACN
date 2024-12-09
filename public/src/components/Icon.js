import { faPhone,faMap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
function Icon (){
    return(
<>
<div className="fixed-icons">
  <a  data-bs-toggle="modal" data-bs-target="#exampleModal" href="#" className="map-icon">
    <FontAwesomeIcon icon={faMap} />
  </a>
  <a href="tel:+123456789" className="phone-icon">
  <FontAwesomeIcon icon={faPhone} />
  </a>
</div>



{/* ///modal */}
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
                  Vị Trí
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14186.213171199563!2d106.62565533989482!3d10.806030224140091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292976c117ad%3A0x5b3f38b21051f84!2zSOG7jWMgVmnhu4duIEjDoG5nIEtow7RuZyBWaeG7h3QgTmFtIENTMg!5e1!3m2!1svi!2s!4v1729827341685!5m2!1svi!2s"
                width={450}
                height={450}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
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
export default Icon
import style from './styleCarDetail.module.css';
import classNames from 'classnames';
import Header from '../../components/header/header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Spinner from 'react-bootstrap/Spinner';
import benefitIcon from '../../assets/bifareIcon.png';
import body_typeIcon from '../../assets/body_typeIcon.png';
import fuelIcon from '../../assets/fuelIcon.png';
import capacityIcon from '../../assets/capacityIcon.png';
import doorsIcon from '../../assets/doorsIcon.png';
import mileageIcon from '../../assets/mileageIcon.png';
import seatsIcon from '../../assets/seatsIcon.png';
import tractionIcon from '../../assets/tractionIcon.png';
import transmissionIcon from '../../assets/transmissionIcon.png';
Modal.setAppElement('#root');

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cars/${id}`)
      .then((response) => {
        setCar(response.data);
        setSelectedImage(response.data.images[0]); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching car:', error);
        setLoading(false);
      });
  }, [id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePrevImage = () => {
    const currentIndex = car.images.indexOf(selectedImage);
    const prevIndex =
      (currentIndex - 1 + car.images.length) % car.images.length;
    setSelectedImage(car.images[prevIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = car.images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % car.images.length;
    setSelectedImage(car.images[nextIndex]);
  };

  
  return loading ? (
    <div className={classNames(style['loading-spinner'])}>
      <Spinner animation="border" variant="success" />
    </div>
  ) : !car ? (
    <p>404</p>
  ) : (
    <>
      <Header />
      <section className={classNames(style['section-car'], 'container')}>
        <h2 className={classNames(style['section-car__header'])}>
          {car.brand} {car.model}
        </h2>
        <section className={classNames(style['section-car__content'])}>
          <section className={classNames(style['section-car__content-left'])}>
            <img
              src={selectedImage}
              alt={`${car.brand} ${car.model}`}
              className={classNames(style['section-car__main-image'])}
              onClick={openModal}
            />
            <div className={classNames(style['section-car__thumbnails'])}>
              {car.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${car.brand} ${car.model} ${index + 1}`}
                  className={classNames(style['section-car__thumbnail'], {
                    [style['active-thumbnail']]: selectedImage === image,
                  })}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </section>
          <section className={classNames(style['section-car__content-right'])}>
            <section
              className={classNames(style['section-car__right-details'])}
            >
              <ul
                className={classNames(style['section-car__right-details_list'])}
              >
                <li
                  className={classNames(
                    style['section-car__right-details_list__item']
                  )}
                >
                  <img
                    className={classNames(
                      style['section-car__right-details_list__item-img']
                    )}
                    src={transmissionIcon}
                    alt=""
                  />
                  <div
                    className={classNames(
                      style['section-car__right-details_list__item-div']
                    )}
                  >
                    <h5
                      className={classNames(
                        style['section-car__right-details_list__item-header']
                      )}
                    >
                      Cutia de viteze
                    </h5>
                    <p
                      className={classNames(
                        style['section-car__right-details_list__item-text']
                      )}
                    >
                      {car.transmission}
                    </p>
                  </div>
                </li>
                <li
                  className={classNames(
                    style['section-car__right-details_list__item']
                  )}
                >
                  <img
                    className={classNames(
                      style['section-car__right-details_list__item-img']
                    )}
                    src={body_typeIcon}
                    alt=""
                  />
                  <div
                    className={classNames(
                      style['section-car__right-details_list__item-div']
                    )}
                  >
                    <h5
                      className={classNames(
                        style['section-car__right-details_list__item-header']
                      )}
                    >
                      Tip caroserie
                    </h5>
                    <p
                      className={classNames(
                        style['section-car__right-details_list__item-text']
                      )}
                    >
                      {car.body_type}
                    </p>
                  </div>
                </li>
                <li
                  className={classNames(
                    style['section-car__right-details_list__item']
                  )}
                >
                  <img
                    className={classNames(
                      style['section-car__right-details_list__item-img']
                    )}
                    src={fuelIcon}
                    alt=""
                  />
                  <div
                    className={classNames(
                      style['section-car__right-details_list__item-div']
                    )}
                  >
                    <h5
                      className={classNames(
                        style['section-car__right-details_list__item-header']
                      )}
                    >
                      Combustibil
                    </h5>
                    <p
                      className={classNames(
                        style['section-car__right-details_list__item-text']
                      )}
                    >
                      {car.fuel_type}
                    </p>
                  </div>
                </li>
                <li
                  className={classNames(
                    style['section-car__right-details_list__item']
                  )}
                >
                  <img
                    className={classNames(
                      style['section-car__right-details_list__item-img']
                    )}
                    src={tractionIcon}
                    alt=""
                  />
                  <div
                    className={classNames(
                      style['section-car__right-details_list__item-div']
                    )}
                  >
                    <h5
                      className={classNames(
                        style['section-car__right-details_list__item-header']
                      )}
                    >
                      Tip Tracțiune
                    </h5>
                    <p
                      className={classNames(
                        style['section-car__right-details_list__item-text']
                      )}
                    >
                      {car.drive_type}
                    </p>
                  </div>
                </li>
              </ul>
              <ul
                className={classNames(
                  style['section-car__right-details_list-right']
                )}
              >
                <li
                  className={classNames(
                    style['section-car__right-details_list__item']
                  )}
                >
                  <img
                    className={classNames(
                      style['section-car__right-details_list__item-img']
                    )}
                    src={capacityIcon}
                    alt=""
                  />
                  <div
                    className={classNames(
                      style['section-car__right-details_list__item-div']
                    )}
                  >
                    <h5
                      className={classNames(
                        style['section-car__right-details_list__item-header']
                      )}
                    >
                      Сapacitatea
                    </h5>
                    <p
                      className={classNames(
                        style['section-car__right-details_list__item-text']
                      )}
                    >
                      {car.engine_capacity} cm<sup>3</sup>
                    </p>
                  </div>
                </li>
                <li
                  className={classNames(
                    style['section-car__right-details_list__item']
                  )}
                >
                  <img
                    className={classNames(
                      style['section-car__right-details_list__item-img']
                    )}
                    src={mileageIcon}
                    alt=""
                  />
                  <div
                    className={classNames(
                      style['section-car__right-details_list__item-div']
                    )}
                  >
                    <h5
                      className={classNames(
                        style['section-car__right-details_list__item-header']
                      )}
                    >
                      Parcurs
                    </h5>
                    <p
                      className={classNames(
                        style['section-car__right-details_list__item-text']
                      )}
                    >
                      {car.mileage} km
                    </p>
                  </div>
                </li>
                <li
                  className={classNames(
                    style['section-car__right-details_list__item']
                  )}
                >
                  <img
                    className={classNames(
                      style['section-car__right-details_list__item-img']
                    )}
                    src={seatsIcon}
                    alt=""
                  />
                  <div
                    className={classNames(
                      style['section-car__right-details_list__item-div']
                    )}
                  >
                    <h5
                      className={classNames(
                        style['section-car__right-details_list__item-header']
                      )}
                    >
                      Număr locuri
                    </h5>
                    <p
                      className={classNames(
                        style['section-car__right-details_list__item-text']
                      )}
                    >
                      {car.doors}
                    </p>
                  </div>
                </li>
                <li
                  className={classNames(
                    style['section-car__right-details_list__item']
                  )}
                >
                  <img
                    className={classNames(
                      style['section-car__right-details_list__item-img']
                    )}
                    src={doorsIcon}
                    alt=""
                  />
                  <div
                    className={classNames(
                      style['section-car__right-details_list__item-div']
                    )}
                  >
                    <h5
                      className={classNames(
                        style['section-car__right-details_list__item-header']
                      )}
                    >
                      Numărul de uși
                    </h5>
                    <p
                      className={classNames(
                        style['section-car__right-details_list__item-text']
                      )}
                    >
                      {car.seats}
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            <section className={classNames(style['section-car__right-card'])}>
              <h3
                className={classNames(style['section-car__right-card_model'])}
              >
                {car.brand} {car.model} {car.fuel_type}
              </h3>
              <h5
                className={classNames(style['section-car__right-card_price'])}
              >
                {car.price} €
              </h5>
            </section>
          </section>
        </section>
        <section className={classNames(style['section-car__hero'])}>
          <section className={classNames(style['section-car__hero-left'])}>
            <section className={classNames(style['section-car__description'])}>
              <p className={classNames(style['section-car__description_text'])}>
                Cod produs:{' '}
                <span
                  className={classNames(
                    style['section-car__description_text-span']
                  )}
                >
                  {car.product_code}
                </span>
              </p>
              <p className={classNames(style['section-car__description_text'])}>
                {car.brand} {car.model}, {car.power} C.P. {car.fuel_type},
                {car.transmission}, Anul {car.year}
              </p>
            </section>
            <div className={style['benefits-list']}>
              {car.benefits.map((benefit, index) => (
                <div key={index} className={style['benefit-item']}>
                  <img
                    className={style['benefit-icon']}
                    src={benefitIcon}
                    alt="Benefit Icon"
                  />
                  <p className={style['benefit-text']}>{benefit}</p>
                </div>
              ))}
            </div>
            <section className={classNames(style['section-car__bottom'])}>
              <h5 className={classNames(style['section-car__bottom-header'])}>Opțiuni de finanțare</h5>
              <ul className={classNames(style['section-car__bottom-list'])}>
                <li className={classNames(style['section-car__bottom-item'])}>
                  <p className={classNames(style['section-car__bottom-item-text'])}>Leasing</p>
                </li>
                <li className={classNames(style['section-car__bottom-item'])}> 
                  <p className={classNames(style['section-car__bottom-item-text'])}>Credit</p>
                </li>
                <li className={classNames(style['section-car__bottom-item'])}>
                  <p className={classNames(style['section-car__bottom-item-text'])}>Calculator Leasing: începând de la 535 €/lunar, avans - 6 090 </p>
                </li>
                <li className={classNames(style['section-car__bottom-item'])}>
                  <p className={classNames(style['section-car__bottom-item-text'])}>Euro, perioada - 60 luni.</p>
                </li>
              </ul>
            </section>
          </section>
          <section className={classNames(style['section-car__hero-right'])}>
            <h5 className={classNames(style['section-car__hero-right_header'])}>
              Avantaje pentru clienți
            </h5>
            <ul className={classNames(style['section-car__hero-right_list'])}>
              <li className={classNames(style['section-car__hero-right_item'])}>
                <div
                  className={classNames(
                    style['section-car__hero-right_item-wrapper']
                  )}
                >
                  <img
                    className={classNames(
                      style['section-car__hero-right_item-image']
                    )}
                    src={benefitIcon}
                    alt=""
                  />
                  <p
                    className={classNames(
                      style['section-car__hero-right_item-header']
                    )}
                  >
                    Mașină disponibilă imediat!
                  </p>
                </div>
                <p
                  className={classNames(
                    style['section-car__hero-right_item-text']
                  )}
                >Toate vehiculele sunt în stoc și gata pentru livrare rapidă.</p>
              </li>
              <li className={classNames(style['section-car__hero-right_item'])}>
                <div
                  className={classNames(
                    style['section-car__hero-right_item-wrapper']
                  )}
                >
                  <img
                    className={classNames(
                      style['section-car__hero-right_item-image']
                    )}
                    src={benefitIcon}
                    alt=""
                  />
                  <p
                    className={classNames(
                      style['section-car__hero-right_item-header']
                    )}
                  >Verificare tehnică detaliată!   </p>
                </div>
                <p
                  className={classNames(
                    style['section-car__hero-right_item-text']
                  )}
                >Fiecare automobil este supus unui control riguros al calității înainte de vânzare.</p>
              </li>
              <li className={classNames(style['section-car__hero-right_item'])}>
                <div
                  className={classNames(
                    style['section-car__hero-right_item-wrapper']
                  )}
                >
                  <img
                    className={classNames(
                      style['section-car__hero-right_item-image']
                    )}
                    src={benefitIcon}
                    alt=""
                  />
                  <p
                    className={classNames(
                      style['section-car__hero-right_item-header']
                    )}
                  >Istoric complet și verificabil!
</p>
                </div>
                <p
                  className={classNames(
                    style['section-car__hero-right_item-text']
                  )}
                >Asigurăm transparență totală privind parcursul și istoricul vehiculului.</p>
              </li>
            </ul>
          </section>
        </section>
      </section>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={style['modal']}
        overlayClassName={style['overlay']}
      >
        <button onClick={closeModal} className={style['modal-close-button']}>
          &times;
        </button>
        <div className={style['modal-content']}>
          <button
            onClick={handlePrevImage}
            className={style['modal-prev-button']}
          >
            &lt;
          </button>
          <img
            src={selectedImage}
            alt={`${car.brand} ${car.model}`}
            className={style['modal-image']}
          />
          <button
            onClick={handleNextImage}
            className={style['modal-next-button']}
          >
            &gt;
          </button>
        </div>
        <div className={style['modal-thumbnails']}>
          {car.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${car.brand} ${car.model} ${index + 1}`}
              className={classNames(style['modal-thumbnail'], {
                [style['active-thumbnail']]: selectedImage === image,
              })}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </Modal>

      <Footer />
    </>
  );
}

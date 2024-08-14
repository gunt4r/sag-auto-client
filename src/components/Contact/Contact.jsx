import style from './styleContact.module.css';
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';
import map from '../../assets/map.png';
import phone from '../../assets/phoneIcon.png';
import mapMarker from '../../assets/mapIcon.png';
import mail from '../../assets/mailIcon.png';
import { FaInstagram,FaTiktok } from "react-icons/fa";
export default function Contact() {
  return (
    <>
      <section className={classNames(style['section-contact'])}>
        <Container className="py-5">
          <Row className={classNames(style['section-contact__row',"text-center"])}>
            <Col  className={classNames(style['section-contact__col-large',"section-contact__col"])}>
              <h5 className={classNames(style['section-contact__header'])}>
                Unde ne aflăm?
              </h5>
              <img
                src={map}
                alt="map"
                className={classNames(style['section-contact__map'])}
              />
            </Col>
            <Col  className={classNames(style['section-contact__col-small',"section-contact__col"])}>
              <h5
                className={classNames(style['section-contact__header-right'])}
              >
                Contacte
              </h5>
              <section
                className={classNames(
                  style['section-header__information-wrapper']
                )}
              >
                <section
                  className={classNames(style['section-header__information'])}
                >
                  <img
                    className={classNames(
                      style['section-header__information-icons']
                    )}
                    src={phone}
                    alt="phone"
                  />
                  <p
                    className={classNames(
                      style['section-header__information-text']
                    )}
                  >
                    +373 69 742 597
                  </p>
                </section>
                <section
                  className={classNames(style['section-header__information'])}
                >
                  <img
                    className={classNames(
                      style['section-header__information-icons']
                    )}
                    src={mapMarker}
                    alt="mapMarker"
                  />
                  <p
                    className={classNames(
                      style['section-header__information-text']
                    )}
                  >
                    Str. Stefan cel Mare{' '}
                  </p>
                </section>
                <section
                  className={classNames(style['section-header__information'])}
                >
                  <img
                    className={classNames(
                      style['section-header__information-icons']
                    )}
                    src={mail}
                    alt="phone"
                  />
                  <p
                    className={classNames(
                      style['section-header__information-text']
                    )}
                  >
                    sagaauto@gmail.com
                  </p>
                </section>
              </section>
              <h5
                className={classNames(style['section-contact__header-right__bottom'])}
              >
                Social Media
              </h5>
              <section className={classNames(style['section-contact__icons-wrapper'])}><a href="https://www.instagram.com/saga_auto?igsh=dnAwcW5kMzJyczI0"><FaInstagram className={classNames(style['icon'])} /></a>
              <a href="https://www.tiktok.com/@sagautos?_t=8oeAEjA8i8b&_r=1"><FaTiktok className={classNames(style['icon'])} /></a></section>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

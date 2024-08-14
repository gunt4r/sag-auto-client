import style from './styleFooter.module.css';
import classNames from 'classnames';
import logo from '../../assets/logoFooter.png';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import phone from '../../assets/phone.svg';
import mapMarker from '../../assets/mapMarker.svg';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {  scroller } from 'react-scroll';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (section) => {
    if (location.pathname === '/') {
      scroller.scrollTo(section, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    } else {
      navigate(`/?section=${section}`);
      window.location.reload();
    }
  };

  return (
    <>
      <footer className={classNames(style.footer)}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-center text-md-start mb-3">
              <div className={classNames(style['section-footer__logo'])}>
                <img
                  src={logo}
                  alt="logo"
                  className={classNames(style['section-footer__logo-icon'])}
                />
                <p className={classNames(style['section-footer__logo-text'])}>
                  SAG
                  <span
                    className={classNames(style['section-footer__logo-divider'])}
                  >
                    -
                  </span>
                  AUTO
                </p>
              </div>
              <div className={classNames(style['section-footer__contact'])}>
                <div className={classNames(style['section-header__information-wrapper'])}>
                  <div className={classNames(style['section-header__information'])}>
                    <img
                      className={classNames(style['section-header__information-icons'])}
                      src={phone}
                      alt="phone"
                    />
                    <p className={classNames(style['section-header__information-text'])}>
                      +373 69 742 597
                    </p>
                  </div>
                  <div className={classNames(style['section-header__information'])}>
                    <img
                      className={classNames(style['section-header__information-icons'])}
                      src={mapMarker}
                      alt="mapMarker"
                    />
                    <p className={classNames(style['section-header__information-text'])}>
                      Str. Stefan cel Mare
                    </p>
                  </div>
                </div>
              </div>
              <div className={classNames(style['section-footer__social-icons'])}>
                <a href="https://www.instagram.com/saga_auto?igsh=dnAwcW5kMzJyczI0">
                  <FaInstagram />
                </a>
                <a href="https://www.tiktok.com/@sagautos?_t=8oeAEjA8i8b&_r=1">
                  <FaTiktok />
                </a>
              </div>
            </div>

            <div className="col-md-8 d-flex" style={{ gap: "var(--footer-gap-between-sections)" , paddingTop:"50px"}}>
              <section className={classNames(style['section-footer__center'])}>
                <h3>Linkuri</h3>
                <ul>
                  <li className={classNames(style["section-footer__links"])}>
                    <RouterLink to="/" onClick={() => scrollToSection('CarList')}>Automobile</RouterLink>
                  </li>
                  <li className={classNames(style["section-footer__links"])}>
                    <RouterLink to="/" onClick={() => scrollToSection('Contact')}>Contacte</RouterLink>
                  </li>
                  <li className={classNames(style["section-footer__links"])}>
                    <RouterLink to="/" onClick={() => scrollToSection('CreditLeasing')}>Creditare si leasing</RouterLink>
                  </li>
                </ul>
              </section>
              <section className={classNames(style['section-footer__right'])}>
                <h3>Rețele sociale</h3>
                <ul>
                  <li className={classNames(style["section-footer__social-items"])}>
                    <RouterLink to="/" onClick={() => scrollToSection('Reviews')}>Recenzii</RouterLink>
                  </li>
                </ul>
              </section>
            </div>
          </div>
              <div className={classNames(style['section-footer__social-icons-mobile'])}>
                <a href="https://www.instagram.com/saga_auto?igsh=dnAwcW5kMzJyczI0">
                  <FaInstagram />
                </a>
                <a href="https://www.tiktok.com/@sagautos?_t=8oeAEjA8i8b&_r=1">
                  <FaTiktok />
                </a>
              </div>
        </div>
      </footer>
      <div className={classNames(style['section-footer__bottom'])}>
        <p className={classNames(style['footerContentText'])}>
          © 2024 Saga Auto. Toate drepturile rezervate.
        </p>
      </div>
    </>
  );
}

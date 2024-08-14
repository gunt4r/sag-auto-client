import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import Header from '../../components/header/header.jsx';
import Banner from '../../components/Banner/Banner.jsx';
import CarList from '../../components/CarList/CarList.jsx';
import About from '../../components/About/About.jsx';
import Benefits from '../../components/Benefits/Benefits.jsx';
import Partners from '../../components/Partners/Partners.jsx';
import Contact from '../../components/Contact/Contact.jsx';
import Reviews from '../../components/Reviews/Reviews.jsx';
import Footer from "../../components/Footer/Footer.jsx"
import style from './styleHome.module.css';
import classNames from 'classnames';
import './styleHome.module.css';

const HomePage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const section = params.get('section');

  useEffect(() => {
    if (section) {
      console.log("Scrolling to section:", section);
      setTimeout(() => {
        scroller.scrollTo(section, {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart'
        });
      }, 500); // Увеличиваем задержку до 500 мс
    }
  }, [section]);

  return (
    <section className={classNames(style['home-page'])}>
      <Header />
      <Banner />
      
      <Element name="CarList">
        <CarList />
      </Element>
      
      <Element name="CreditLeasing">
      <section className={classNames(style['section-info'], 'container')}>
        <h4 className={classNames(style['section-info__header'])}>
          Creditare și Leasing
        </h4>
        <p className={classNames(style['section-info__header-subtitle'])}>
          Oferim condiții avantajoase de creditare și leasing pentru
          achiziționarea unui automobil. Colaborăm cu bănci <br /> și instituții
          financiare de încredere pentru a găsi cea mai bună soluție de plată
          pentru <br /> dumneavoastră. Specialiștii noștri vă vor ajuta cu
          documentația și răspunsurile la întrebări.
        </p>
        <section className={classNames(style['section-info__card'])}>
          <h5 className={classNames(style['section-info__card-header'])}>
            Creditare
          </h5>
          <section className={classNames(style['section-info__card-content'])}>
            <section className={classNames(style['section-info__card-left'])}>
              <h5
                className={classNames(style['section-info__card-left__title'])}
              >
                Acte necesare
              </h5>
              <p className={classNames(style['section-info__card-left__text'])}>
                Pentru a depune o cerere de credit,{' '}
                <span className={style['fw-bold']}>
                  este suficient să prezentați buletinul de identitate
                </span>
                , dacă lucrați oficial în Republica Moldova. <br /> <br /> Dacă
                lucrați în străinătate, va fi necesar să prezentați documente
                care să ateste veniturile, cum ar fi{' '}
                <span className={style['fw-bold']}>
                  fișe de salariu, transferuri efectuate pe numele dvs.
                </span>
                , intrări de salariu pe cont sau un contract de muncă. <br />{' '}
                <br /> Pentru persoanele fără venituri oficiale, poate fi
                necesar{' '}
                <span className={style['fw-bold']}>
                  un garant sau o proprietate pe numele lor
                </span>
                . <br /> <br /> Pentru solicitanții cu vârsta{' '}
                <span className={style['fw-bold']}>între 18 și 21 de ani</span>,
                este obligatoriu să aibă un garant (fidejusor).
              </p>
            </section>
            <section className={classNames(style['section-info__card-right'])}>
              <h5
                className={classNames(style['section-info__card-right__title'])}
              >
                Condiții
              </h5>
              <p
                className={classNames(
                  style['section-info__card-right__subtitle']
                )}
              >
                Dobânda creditului variază în funcție de suma solicitată și
                compania aleasă, în medie pornind{' '}
                <span className={style['fw-bold']}>de la 12% anual.</span>
              </p>
              <p
                className={classNames(style['section-info__card-right__text'])}
              >
                Avansul la automobile depinde de preț:
                <li
                  className={classNames(
                    style['section-info__card-right__item']
                  )}
                >
                  Până la 20.000 €:{' '}
                  <span className={style['fw-bold']}>avans 0%</span>{' '}
                </li>
                <li
                  className={classNames(
                    style['section-info__card-right__item']
                  )}
                >
                  20.000 € - 30.000 €:{' '}
                  <span className={style['fw-bold']}>avans 10%</span>{' '}
                </li>
                <li
                  className={classNames(
                    style['section-info__card-right__item'],
                    style['section-info__card-right__item--last']
                  )}
                >
                  Peste 30.000 €:{' '}
                  <span className={style['fw-bold']}>avans 25%</span>
                </li>
                Perioada de creditare:{' '}
                <span className={style['fw-bold']}>
                  de la 12 la 60 de luni.
                </span>
              </p>
            </section>
          </section>
        </section>
        <section className={classNames(style['section-info__card'])}>
          <h5 className={classNames(style['section-info__card-header'])}>
            Leasing
          </h5>
          <section className={classNames(style['section-info__card-content'])}>
            <section className={classNames(style['section-info__card-left'])}>
              <h5
                className={classNames(style['section-info__card-left__title'])}
              >
                Acte necesare
              </h5>
              <p className={classNames(style['section-info__card-left__text'])}>
                Pentru a depune o cerere de leasing, la fel ca și în cazul
                creditării, este necesar{' '}
                <span className={style['fw-bold']}>
                  buletinul de identitate
                </span>
                , dacă lucrați oficial în țară. Dacă lucrați în străinătate, vor
                fi necesare
                <span className={style['fw-bold']}>
                  fișe de salariu, transferuri bancare pe numele dvs., dovezi
                  ale intrărilor de salariu în cont sau un contract de muncă.
                </span>
                <br /> <br />
                Automobilul rămâne în proprietatea companiei de leasing până{' '}
                <span className={style['fw-bold']}>
                  la achitarea integrală
                </span>{' '}
                a acestuia. Leasingul este oferit doar pentru automobilele cu o
                vechime{' '}
                <span className={style['fw-bold']}>de până la 10 ani</span>.
                Toate celelalte, care depășesc 10 ani, sunt eligibile doar prin
                procedura de creditare.
              </p>
            </section>
            <section className={classNames(style['section-info__card-right'])}>
              <h5
                className={classNames(style['section-info__card-right__title'])}
              >
                Condiții
              </h5>

              <p
                className={classNames(style['section-info__card-right__text'])}
              >
                <span className={style['fw-bold']}>Procentul de leasing</span>{' '}
                variază în funcție de autoturismul ales și suma acordată, în
                medie fiind de{' '}
                <span className={style['fw-bold']}>7-9% anual</span>. <br />{' '}
                <br /> Avansul începe{' '}
                <span className={style['fw-bold']}>de la 20%</span>, cu
                posibilitatea majorării la cererea clientului. <br /> <br />
                Perioada de leasing poate fi{' '}
                <span className={style['fw-bold']}>
                  de la 12 până la 60 de luni
                </span>
                .
              </p>
            </section>
          </section>
        </section>
      </section>
      </Element>
      
      <Element name="About">
        <About />
      </Element>
      
      <Element name="Benefits">
        <Benefits />
      </Element>
      
      <Element name="Contact">
        <Contact />
      </Element>
      
      <Element name="Partners">
        <Partners />
      </Element>
      
      <Element name="Reviews">
        <Reviews />
      </Element>
      
      <Footer />
    </section>
  );
};

export default HomePage;

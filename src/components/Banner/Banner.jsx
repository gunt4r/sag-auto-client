import carImage from '../../assets/car.png';
import classNames from 'classnames';
import style from './styleBanner.module.css';
import mobileImage from "../../assets/carMobile.png"
const Banner = () => {
  return (
    <>
      <section className={classNames(style['section-banner'])}>
        <section className={classNames(style['section-banner__content-text'])}>
          <h1
            className={classNames(style['section-banner__content-text-title'])}
          >
           Găsește mașina ideală cu Sag-Auto!
          </h1>
          <p
            className={classNames(
              style['section-banner__content-text-subtitle']
            )}
          >
            O gamă largă de autoturisme verificate, <br/> cu condiții avantajoase și livrare rapidă.
          </p>
          <p
            className={classNames(
              style['section-banner__content-text-bottom']
            )}
          >
            Adaugă confort condusului tău
          </p>
        </section>
        <section className={classNames(style['section-banner__image'])}>
          <img
            src={carImage}
            alt="car"
            className={classNames(style['section-banner__content-image'])}
          />
           <img
            src={mobileImage}
            alt="car"
            className={classNames(style['section-banner__content-image__mobile'])}
          />
        </section>
      </section>
    </>
  );
};

export default Banner;

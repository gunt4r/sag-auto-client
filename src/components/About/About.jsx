import style from './styleAbout.module.css';
import classNames from 'classnames';
import { FaInstagram,FaTiktok } from "react-icons/fa";

// import instagramIcon from "../../assets/instagramIcon.png";
// import telegramIcon from "../../assets/telegramIcon.png";
// import emailIcon from "../../assets/emailIcon.png";

export default function About() {
    return (
        <section className={classNames(style['section-about'])}>
            <div className={style['section-about__car-image']}></div>
            <div className={style['section-about__content']}>
                <h1 className={classNames(style['section-about__header'])}>Despre noi</h1>
                <p className={classNames(style['section-about__text'])}>Bine ați venit la Sag Auto — partenerul dumneavoastră de încredere în lumea automobilelor! Ne specializăm în cumpărarea și vânzarea de automobile, oferindu-le clienților noștri o gamă largă de vehicule de calitate la prețuri accesibile. La Saga Auto prețuim onestitatea, transparența și un nivel ridicat de servicii. Echipa noastră de profesioniști este întotdeauna gata să vă ajute să găsiți mașina ideală, care să corespundă nevoilor și bugetului dumneavoastră. Fie că este vorba de cumpărarea unei mașini noi sau de vânzarea celei vechi, facem procesul ușor și confortabil.</p>
                <p className={classNames(style['section-about__text'])}>Urmăriți-ne pentru a fi mereu la curent cu toate noutățile și promoțiile noastre!</p>
                <div className={style['social-icons']}>
                   <a href="https://www.instagram.com/saga_auto?igsh=dnAwcW5kMzJyczI0"> <FaInstagram className={classNames(style["section-about_icons"])}/></a>
                    <a href="https://www.tiktok.com/@sagautos?_t=8oeAEjA8i8b&_r=1"> <FaTiktok className={classNames(style["section-about_icon-tiktok"])}/></a>
                </div>
            </div>
        </section>
    );
}

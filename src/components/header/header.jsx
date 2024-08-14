import logo from "../../assets/Logo.png"
import classNames from "classnames"
import style from "./styleHeader.module.css"
import phone from "../../assets/phone.svg"
import mapMarker from "../../assets/mapMarker.svg"
import {Link} from "react-router-dom"
const Header = () => {
    return (
        <section className={classNames(style["section-header"])}>
            <section className={classNames(style["section-header__content"])}>
                <Link to="/">
                <section className={classNames(style["section-header__logo"])}>
                    <img src={logo} alt="logo" className={classNames(style["section-header__logo-icon"])} />
                    <p className={classNames(style["section-header__logo-text"])}>SAG<span className={classNames(style["section-header__logo-divider"])}>-</span>AUTO</p>
                </section>
                </Link>
                <section className={classNames(style["section-header__information-wrapper"])}>
                    <section className={classNames(style["section-header__information"])}>
                    <img className={classNames(style["section-header__information-icons"])} src={phone} alt="phone" />
                    <p className={classNames(style["section-header__information-text"])}>+373 69 742 597</p>
                    </section>
                    <section className={classNames(style["section-header__information"])}>
                    <img className={classNames(style["section-header__information-icons"])} src={mapMarker} alt="mapMarker" />
                    <p className={classNames(style["section-header__information-text"])}>Str. Stefan cel Mare </p>
                    </section>
                </section>
            </section>
        </section>
    )
}
export default Header;
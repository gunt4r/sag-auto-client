import style from './styleBenefits.module.css';
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';
import dedicationIcon from '../../assets/dedicatie.png'; 
import excellenceIcon from '../../assets/excelenta.png'; 
import innovationIcon from '../../assets/inovatie.png'; 
import flexibilityIcon from '../../assets/flexibilitate.png'; 
export default function Benefits() {
  return (
    <>
      <section className={classNames(style['section-benefits'])}>
        <h5 className={classNames(style['section-benefits__header'])}>Avantajele noastre</h5>
        <section className={classNames(style['section-benefits__content'])}>
        <Container className="py-5">
            <Row className="text-center">
                <Col md={3} sm={6} className={classNames(style["section-benefits__content-card"],"mb-4")}>
                    <img src={dedicationIcon} alt="Dedication" className="mb-3" />
                    <h4 className={classNames(style["section-benefits__content-header"])}>Dedicație</h4>
                    <p className={classNames(style["section-benefits__content-text"])}>Pentru noi, fiecare client este valoros. Ne angajăm să înțelegem nevoile fiecăruia și să transformăm dorințele în realitate. Ne asumăm responsabilitatea pentru recomandările și soluțiile pe care le oferim.</p>
                </Col>
                <Col md={3} sm={6} className={classNames(style["section-benefits__content-card"],"mb-4")}>
                    <img src={excellenceIcon} alt="Excelență" className="mb-3" />
                    <h4 className={classNames(style["section-benefits__content-header"])}>Excelență</h4>
                    <p className={classNames(style["section-benefits__content-text"])}>Ne străduim să depășim așteptările clienților, oferind informații complete și de încredere despre automobilele disponibile sau pe care doriți să le achiziționați. Ne asigurăm că fiecare interacțiune este marcată de profesionalism.</p>
                </Col>
                <Col md={3} sm={6} className={classNames(style["section-benefits__content-card"],"mb-4")}>
                    <img src={innovationIcon} alt="Inovație" className="mb-3" />
                    <h4 className={classNames(style["section-benefits__content-header"])}>Inovație</h4>
                    <p className={classNames(style["section-benefits__content-text"])}>Implementăm constant cele mai recente tehnologii și tendințe, dezvoltând noi strategii pentru a îmbunătăți procesele de vânzare, cumpărare și schimb de automobile. Ne concentrăm pe optimizarea și diversificarea abordărilor noastre.</p>
                </Col>
                <Col md={3} sm={6} className={classNames(style["section-benefits__content-card"],"mb-4")}>
                    <img src={flexibilityIcon} alt="Flexibilitate" className="mb-3" />
                    <h4 className={classNames(style["section-benefits__content-header"])}>Flexibilitate</h4>
                    <p className={classNames(style["section-benefits__content-text"])}>Ne adaptăm nevoilor clienților noștri, iar echipa noastră bine pregătită și dedicată se angajează să ofere întotdeauna cele mai bune soluții. Ne concentrăm pe obținerea unor rezultate pozitive în fiecare aspect al activității noastre.</p>
                </Col>
            </Row>
        </Container>
        </section>
      </section>
    </>
  );
}

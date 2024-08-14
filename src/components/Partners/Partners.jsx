import style from './stylePartners.module.css';
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';
import microPartner from '../../assets/microPartner.png';
import expressPartner from '../../assets/expressPartner.png';
export default function Partners() {
  return (
    <>
      <section className={classNames(style['section-partners'])}>
        <h5 className={classNames(style['section-partners__header'])}>
          Partenerii noștri
        </h5>
        <section className={classNames(style['section-partners__content'])}>
          <Container className="py-5">
            <Row className="text-center">
              <Col
    lg={6}
                md={12}
                sm={12}
                className={classNames(
                  style['section-partners__content-card'],
                  'mb-4'
                )}
              >
                <img src={expressPartner}  alt="Express" className={classNames(style['section-partners__image-express'],"mb-3")} />
              </Col>
              <Col
                lg={6}
                md={12}
                sm={12}
                className={classNames(
                  style['section-partners__content-card'],
                  'mb-4'
                )}
              >
                <img src={microPartner} className={classNames(style['section-partners__image-micro'],"mb-3")} alt="Micro" />
              </Col>
            </Row>
          </Container>
        </section>
      </section>
    </>
  );
}

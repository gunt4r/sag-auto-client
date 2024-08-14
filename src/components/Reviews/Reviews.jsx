/* eslint-disable react/prop-types */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './styleReviews.module.css';
import firstImage from '../../assets/reviewsFirstImage.png';
import secondImage from '../../assets/reviewsSecondImage.png';
import thirdImage from '../../assets/reviewsThirdImage.png';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const reviews = [
  {
    id: 1,
    name: 'Ioan Popescu',
    text: 'Am cumpărat o mașină prin Saga Auto — totul a decurs rapid și fără probleme. Foarte mulțumit de serviciu!',
    img: firstImage,
    title: "“ Serviciu excelent! ”"
  },
  {
    id: 2,
    name: 'Maria Popescu',
    text: 'Am vândut mașina prin Saga Auto. Echipa este excelentă, au făcut totul profesionist. Recomand!',
    img: secondImage,
    title: "“ Abordare profesionistă ”"
  },
  {
    id: 3,
    name: 'Alexandru Mihăilescu',
    text: 'Am găsit mașina electrică perfectă cu ajutorul Saga Auto. Mulțumesc pentru ajutor și consultanță!',
    img: thirdImage,
    title: "“ Alegerea perfectă ”"
  },
  {
    id: 4,
    name: 'Ioan Popescu',
    text: 'Am cumpărat o mașină prin Saga Auto — totul a decurs rapid și fără probleme. Foarte mulțumit de serviciu!',
    img: firstImage,
    title: "“ Serviciu excelent! ”"
  },
  {
    id: 5,
    name: 'Maria Popescu',
    text: 'Am vândut mașina prin Saga Auto. Echipa este excelentă, au făcut totul profesionist. Recomand!',
    img: secondImage,
    title: "“ Abordare profesionistă ”"
  },
];

const NextArrow = ({ onClick }) => (
  <div className={`${styles.customArrow} ${styles.nextArrow}`} onClick={onClick}>
    <MdOutlineKeyboardArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className={`${styles.customArrow} ${styles.prevArrow}`} onClick={onClick}>
    <MdOutlineKeyboardArrowLeft />
  </div>
);

const Review = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.reviewCarousel}>
      <h2>Recenzii</h2>
      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <h5>{review.title}</h5>
            <p>{review.text}</p>
            <div className={styles.reviewer}>
              <img src={review.img} alt={review.name} />
              <h3>{review.name}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Review;

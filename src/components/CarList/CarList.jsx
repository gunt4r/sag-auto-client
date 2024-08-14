import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import style from './styleCarList.module.css';
import { useNavigate } from 'react-router-dom';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [visibleCars, setVisibleCars] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cars');
        const fetchedCars = response.data.map((car) => ({
          ...car,
          price: Number(car.price),
        }));
        setCars(fetchedCars);
        setVisibleCars(fetchedCars.slice(0, 5));
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const handleShowAll = () => {
    setShowAll(true);
    setVisibleCars(cars);
  };

  const handleSortByPrice = (order) => {
    setSortOrder(order);
    const sortedCars = [...cars].sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setVisibleCars(sortedCars.slice(0, showAll ? sortedCars.length : 5));
  };

  return (
    <div className={classNames(style['section-cars'], 'container')}>
      <div className={classNames(style['section-cars__header'])}>
        <div className={classNames(style['section-cars__header-left'])}>
          <h2 className={classNames(style['section-cars__header-left_text'])}>
            Automobile
          </h2>
        </div>
        <div className={classNames(style['section-cars__header-right'])}>
          <button
            className={classNames(style['section-cars__header-right_button'], {
              [style.active]: sortOrder === 'asc',
              [style.inactive]: sortOrder !== 'asc',
            })}
            onClick={() => handleSortByPrice('asc')}
          >
            Preț crescător
          </button>
          <button
            className={classNames(style['section-cars__header-right_button'], {
              [style.active]: sortOrder === 'desc',
              [style.inactive]: sortOrder !== 'desc',
            })}
            onClick={() => handleSortByPrice('desc')}
          >
            Preț descrescător
          </button>
        </div>
      </div>
      <div className={classNames(style['section-cars__list'], 'row', 'justify-content-center')}>
        {visibleCars.map((car) => (
          <div key={car.id} className="col-sm-12 col-md-6 col-xl-4 col-xxl-3 mb-4">
            <div
              className={classNames(style['section-cars__list-card'])}
              onClick={() => navigate(`/car/${car.id}`)}
            >
              <img
                className={classNames(style['section-cars__list-card_image'])}
                src={car.images[0]}
                alt={`${car.brand} ${car.model}`}
              />
              <h3 className={classNames(style['section-cars__list-card_text'])}>
                {car.brand} {car.model}
              </h3>
              <p
                className={classNames(
                  style['section-cars__list-card_text-subtitle']
                )}
              >
                {car.mileage} km, {car.engine_capacity} cm<sup>3</sup>, {car.power} cp, {car.transmission}, {car.drive_type}
              </p>
              <p
                className={classNames(style['section-cars__list-card_price'])}
              >
                {car.price} €
              </p>
              <button
                onClick={() => navigate(`/cars/${car.id}`)}
                className={classNames(style['section-cars__list-card_button'])}
              >
                Deschide
              </button>
            </div>
          </div>
        ))}
      </div>
      {!showAll && cars.length > 5 && (
        <button
          className={classNames(style['section-cars__list-show'])}
          onClick={handleShowAll}
        >
          Vezi toate
        </button>
      )}
    </div>
  );
};

export default CarsList;

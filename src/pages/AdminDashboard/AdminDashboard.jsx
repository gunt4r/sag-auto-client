import { useState, useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Button, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from "./styleAdminDashboard.module.css";
export default function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [newCarModalIsOpen, setNewCarModalIsOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
  const [newCar, setNewCar] = useState({
    brand: '',
    model: '',
    power: '',
    engine_capacity: '',
    transmission: '',
    body_type: '',
    mileage: '',
    fuel_type: '',
    seats: '',
    drive_type: '',
    doors: '',
    year: '',
    images: [],
    benefits: [''],
    price: ''
  });

  Modal.setAppElement('#root');

  useEffect(() => {
    axios.get('http://localhost:5000/api/cars', {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    })
    .then(response => setCars(response.data))
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (car) => {
    const benefits = car.benefits.map(benefit => {
        if (typeof benefit === 'object' && benefit !== null) {
            return benefit.text;
        }
        return benefit; 
    });
    setEditingCar({ ...car, benefits });
    setEditModalIsOpen(true);
  };

  const handleDelete = (id) => {
    setCarToDelete(id);
    setDeleteModalIsOpen(true);
  };

  const confirmDelete = async () => {
    if (!carToDelete) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5000/api/cars/${carToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCars(cars.filter(car => car.id !== carToDelete));
      setDeleteModalIsOpen(false);
      setCarToDelete(null);
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleNewCarChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  const handleNewCarFileChange = (e) => {
    setNewCar({ ...newCar, images: Array.from(e.target.files) });
  };

  const handleAddBenefit = () => {
    setNewCar({
      ...newCar,
      benefits: [...newCar.benefits, '']
    });
  };

  const handleRemoveBenefit = (index) => {
    setNewCar({
      ...newCar,
      benefits: newCar.benefits.filter((_, i) => i !== index)
    });
  };

  const handleBenefitChange = (index, value) => {
    const updatedBenefits = [...newCar.benefits];
    updatedBenefits[index] = value;
    setNewCar({ ...newCar, benefits: updatedBenefits });
  };

  const handleNewCarSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(newCar).forEach((key) => {
        if (key === 'benefits') {
            formData.append(key, JSON.stringify(newCar[key])); 
        } else if (key === 'images') {
            newCar.images.forEach(image => formData.append('images', image));
        } else {
            formData.append(key, newCar[key]);
        }
    });

    try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.post('http://localhost:5000/api/cars', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        setCars([...cars, response.data]);
        setNewCar({
            brand: '',
            model: '',
            power: '',
            engine_capacity: '',
            transmission: '',
            body_type: '',
            mileage: '',
            fuel_type: '',
            seats: '',
            drive_type: '',
            doors: '',
            year: '',
            images: [],
            benefits: [''],
            price: ''
        });
        setNewCarModalIsOpen(false);
    } catch (error) {
        console.error('Error adding car:', error);
    }
  };

  const handleEditCarFileChange = (e) => {
    const newImages = Array.from(e.target.files);
    setEditingCar({ ...editingCar, images: [...editingCar.images, ...newImages] });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const updatedCar = {
        ...editingCar,
        benefits: editingCar.benefits.filter(benefit => benefit.trim() !== ''), 
    };

    const formData = new FormData();
    Object.keys(updatedCar).forEach((key) => {
        if (key === 'benefits') {
            formData.append(key, JSON.stringify(updatedCar[key]));
        } else if (key === 'images' && Array.isArray(updatedCar.images)) {
            updatedCar.images.forEach(image => formData.append('images', image));
        } else {
            formData.append(key, updatedCar[key]);
        }
    });

    try {
        const token = localStorage.getItem('adminToken');
        await axios.put(`http://localhost:5000/api/cars/${editingCar.id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        const response = await axios.get('http://localhost:5000/api/cars', {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        setCars(response.data);
        setEditModalIsOpen(false);
        setEditingCar(null);
    } catch (error) {
        console.error('Saving error:', error);
    }
    window.location.reload()
  };


  const handleRemoveImage = async (index) => {
    if (!editingCar) return;

    try {
        const token = localStorage.getItem('adminToken');
        const carId = editingCar.id;
        await axios.delete(`http://localhost:5000/api/cars/${carId}/images/${index}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const updatedImages = editingCar.images.filter((_, i) => i !== index);
        setEditingCar({ ...editingCar, images: updatedImages });

        setCars(prevCars =>
            prevCars.map(car =>
                car.id === editingCar.id ? { ...car, images: updatedImages } : car
            )
        );
    } catch (error) {
        console.error('Error removing image:', error);
    }
};



  const closeModals = () => {
    setEditModalIsOpen(false);
    setDeleteModalIsOpen(false);
    setNewCarModalIsOpen(false);
    setEditingCar(null);
    setCarToDelete(null);
    setNewCar({
      brand: '',
      model: '',
      power: '',
      engine_capacity: '',
      transmission: '',
      body_type: '',
      mileage: '',
      fuel_type: '',
      seats: '',
      drive_type: '',
      doors: '',
      year: '',
      images: [],
      benefits: [''],
      price: ''
    });
  };

  const handleContextMenu = (event) => {
    event.preventDefault(); // Предотвращаем открытие контекстного меню
};
  return (
    <div className="container" onContextMenu={handleContextMenu}>
      <h2 className="my-4">Gestionarea automobilelor</h2>
      <Button variant="primary" onClick={() => setNewCarModalIsOpen(true)}>Adaugă o nouă mașină</Button>
      <div className="row my-4">
        {cars.map(car => (
          <div key={car.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={car.images && car.images[0]} alt={`${car.brand} ${car.model}`} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{car.brand} {car.model}</h5>
                <p className="card-text">Product Code: {car.product_code}</p>
                <p className="card-text">Benefits: {Array.isArray(car.benefits) && car.benefits.length > 0
    ? car.benefits.join(', ')
    : 'No benefits listed'}</p>
                <Button variant="warning" onClick={() => handleEdit(car)}>Modifică</Button>
                <Button variant="danger" onClick={() => handleDelete(car.id)} className="ms-2 ">Șterge</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={editModalIsOpen} onRequestClose={closeModals}>
        {editingCar && (
          <div className="edit-form">
            <div className="modal-header">
              <h2 className={style["modal-title__edit"]}>Editarea {editingCar.brand} {editingCar.model}</h2>
              <Button variant="close" onClick={closeModals}></Button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <InputGroup className="mb-3">
                  <InputGroup.Text>Brand</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={editingCar.brand}
                    onChange={(e) => setEditingCar({ ...editingCar, brand: e.target.value })}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Model</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="model"
                    value={editingCar.model}
                    onChange={(e) => setEditingCar({ ...editingCar, model: e.target.value })}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Cai putere</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="power"
                    value={editingCar.power}
                    onChange={(e) => setEditingCar({ ...editingCar, power: e.target.value })}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Capacitate motor</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="engine_capacity"
                    value={editingCar.engine_capacity}
                    onChange={(e) => setEditingCar({ ...editingCar, engine_capacity: e.target.value })}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Transmisie</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="transmission"
                    value={editingCar.transmission}
                    onChange={(e) => setEditingCar({ ...editingCar, transmission: e.target.value })}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Tip caroserie (sedan,etc.) </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="body_type"
                    value={editingCar.body_type}
                    onChange={(e) => setEditingCar({ ...editingCar, body_type: e.target.value })}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Kilometraj</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="mileage"
                    value={editingCar.mileage}
                    onChange={(e) => setEditingCar({ ...editingCar, mileage: e.target.value })}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Tipul combustibil</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="fuel_type"
                    value={editingCar.fuel_type}
                    onChange={(e) => setEditingCar({ ...editingCar, fuel_type: e.target.value })}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Locuri</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="seats"
                    value={editingCar.seats}
                    onChange={(e) => setEditingCar({ ...editingCar, seats: e.target.value })}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Tip tracțiune</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="drive_type"
                    value={editingCar.drive_type}
                    onChange={(e) => setEditingCar({ ...editingCar, drive_type: e.target.value })}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Uși</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="doors"
                    value={editingCar.doors}
                    onChange={(e) => setEditingCar({ ...editingCar, doors: e.target.value })}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>An</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="year"
                    value={editingCar.year}
                    onChange={(e) => setEditingCar({ ...editingCar, year: e.target.value })}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Preț</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="price"
                    value={editingCar.price}
                    onChange={(e) => setEditingCar({ ...editingCar, price: e.target.value })}
                    required
                  />
                </InputGroup>
                <h5>Beneficii:</h5>
                {editingCar.benefits.map((benefit, index) => (
                  <InputGroup className="mb-3" key={index}>
                    <Form.Control
                      type="text"
                      value={benefit}
                      onChange={(e) => {
                        const updatedBenefits = [...editingCar.benefits];
                        updatedBenefits[index] = e.target.value;
                        setEditingCar({ ...editingCar, benefits: updatedBenefits });
                      }}
                      placeholder={`Benefit ${index + 1}`}
                    />
                    <Button variant="danger" onClick={() => {
                      const updatedBenefits = editingCar.benefits.filter((_, i) => i !== index);
                      setEditingCar({ ...editingCar, benefits: updatedBenefits });
                    }}>Șterge</Button>
                  </InputGroup>
                ))}
                <Button variant="success" onClick={() => {
                  setEditingCar({
                    ...editingCar,
                    benefits: [...editingCar.benefits, '']
                  });
                }}>Adaugă</Button>

                <InputGroup className="mb-3">
                  <InputGroup.Text>Imagini</InputGroup.Text>
                  <Form.Control
                    type="file"
                    name="images"
                    multiple
                    onChange={handleEditCarFileChange}
                  />
                </InputGroup>
                <div className="current-images">
                  <h5>Imagini:</h5>
                  {editingCar.images && editingCar.images.map((image, index) => (
                    image && (
                      <div key={index} className="image-preview">
                        <img 
                          src={typeof image === 'string' ? image : URL.createObjectURL(image)} 
                          alt="Car Image" 
                          className={style['image-preview__image']} 
                          onError={(e) => e.target.style.display = 'none'} // Скрыть, если изображение не загрузилось
                        />
                        <Button 
                          variant="danger" 
                          onClick={() => handleRemoveImage(index)}
                        >
                          Șterge
                        </Button>
                      </div>
                    )
                  ))}
                </div>
              </div>
              <div className="modal-footer mt-3">
                <Button variant="secondary" className='me-3 mt-3' onClick={closeModals}>Închide</Button>
                <Button variant="primary" className='mt-3' type="submit">Salvează</Button>
              </div>
            </form>
          </div>
        )}
      </Modal>

      <Modal isOpen={deleteModalIsOpen} style={{
    content: {
      width: '320px', 
      height: '220px',
      margin: 'auto',
      padding: '20px',
      borderRadius: '10px'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)' 
    }
  }} onRequestClose={closeModals}>
        <div className="modal-header">
          <h2>Confirmare ștergere</h2>
          <Button variant="close"  onClick={closeModals}></Button>
        </div>
        <div className="modal-body">
          <p>Dorești să ștergi această mașină?</p>
        </div>
        <div className="modal-footer">
          <Button variant="secondary" style={{ marginRight: '10px' }} onClick={closeModals}>Nu</Button>
          <Button variant="danger" onClick={confirmDelete}>Da</Button>
        </div>
      </Modal>

      <Modal isOpen={newCarModalIsOpen} onRequestClose={closeModals}>
        <div className="modal-header">
          <h2 className={style['modal-title__new']}>Adaugă o nouă mașină</h2>
          <Button variant="close" onClick={closeModals}></Button>
        </div>
        <form onSubmit={handleNewCarSubmit}>
          <div className="modal-body">
            <InputGroup className="mb-3">
              <InputGroup.Text>Brand</InputGroup.Text>
              <Form.Control
                type="text"
                name="brand"
                value={newCar.brand}
                onChange={handleNewCarChange}
                placeholder="Brand"
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Model</InputGroup.Text>
              <Form.Control
                type="text"
                name="model"
                value={newCar.model}
                onChange={handleNewCarChange}
                placeholder="Model"
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Cai putere</InputGroup.Text>
              <Form.Control
                type="text"
                name="power"
                value={newCar.power}
                onChange={handleNewCarChange}
                placeholder="Cai putere"
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Capacitate motor</InputGroup.Text>
              <Form.Control
                type="text"
                name="engine_capacity"
                value={newCar.engine_capacity}
                onChange={handleNewCarChange}
                placeholder="Capacitate motor"
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Transmisie</InputGroup.Text>
              <Form.Control
                type="text"
                name="transmission"
                value={newCar.transmission}
                onChange={handleNewCarChange}
                placeholder="Transmisie"
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text> Tip caroserie</InputGroup.Text>
              <Form.Control
                type="text"
                name="body_type"
                value={newCar.body_type}
                onChange={handleNewCarChange}
                placeholder="Tip caroserie"
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Kilometraj</InputGroup.Text>
              <Form.Control
                type="text"
                name="mileage"
                value={newCar.mileage}
                onChange={handleNewCarChange}
                placeholder="Kilometraj"
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Tip combustibil</InputGroup.Text>
              <Form.Control
                type="text"
                name="fuel_type"
                value={newCar.fuel_type}
                onChange={handleNewCarChange}
                placeholder="Tip combustibil"
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Locuri</InputGroup.Text>
              <Form.Control
                type="text"
                name="seats"
                value={newCar.seats}
                onChange={handleNewCarChange}
                placeholder="Locuri"
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Tip tracțiune</InputGroup.Text>
              <Form.Control
                type="text"
                name="drive_type"
                value={newCar.drive_type}
                onChange={handleNewCarChange}
                placeholder="Tip tracțiune"
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Uși</InputGroup.Text>
              <Form.Control
                type="text"
                name="doors"
                value={newCar.doors}
                onChange={handleNewCarChange}
                placeholder="Uși"
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>An</InputGroup.Text>
              <Form.Control
                type="text"
                name="year"
                value={newCar.year}
                onChange={handleNewCarChange}
                placeholder="An"
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Preț</InputGroup.Text>
              <Form.Control
                type="text"
                name="price"
                value={newCar.price}
                onChange={handleNewCarChange}
                placeholder="Preț"
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Imagini</InputGroup.Text>
              <Form.Control
                type="file"
                name="images"
                multiple
                onChange={handleNewCarFileChange}
                required
              />
            </InputGroup>
            <div className="benefits-list">
              <h5>Beneficii:</h5>
              {newCar.benefits.map((benefit, index) => (
                <InputGroup className="mb-3" key={index}>
                  <Form.Control
                    type="text"
                    value={benefit}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                    placeholder={`Benefit ${index + 1}`}
                  />
                  <Button variant="danger" onClick={() => handleRemoveBenefit(index)}>Șterge</Button>
                </InputGroup>
              ))}
              <Button variant="success" className={style["add-benefit"]} onClick={handleAddBenefit}>Adaugă</Button>
            </div>
          </div>
          <div className="modal-footer">
            <Button variant="secondary" style={{ marginRight: '10px' }} onClick={closeModals}>Închide</Button>
            <Button variant="primary" type="submit">Adaugă mașină</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


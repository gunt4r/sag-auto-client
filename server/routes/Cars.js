/* eslint-disable no-undef */
import express from 'express';
import Car from '../models/Car.js';
import multer from "multer"
import path from 'path';
import fs from "fs"
import AuthenticateToken from '../middleware/auth.js';

const router = express.Router();

const uploadPath = path.join(process.cwd(), '/server/uploads');
if(!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath);
}
console.log(uploadPath)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
  });
const upload = multer({storage });  

const GenerateUniqueProductCode = async () =>{
    let code
    let isUnique = false

    while(!isUnique) {
        code = (Math. floor(Math. random() * (999999 - 100000 + 1)) + 100000).toString()

        const car = await Car.findOne({where: {product_code: code}})
        if(!car) {
            isUnique = true
        }
    }
    return code.toString()

}
// Show all the cars 
router.get("/", async (req, res) => {
    const cars = await Car.findAll();
    res.json(cars);
});
// Show one car by id 
router.get("/:id", async (req, res) => {
    const car = await Car.findOne({ where: { id: req.params.id } });
    res.json(car);
});
// Add a car 

router.post("/", AuthenticateToken, upload.array('images', 20), async (req, res) => {
    const { brand, model, power, engine_capacity, transmission, body_type, mileage, fuel_type, seats, drive_type, doors, year, price, benefits } = req.body;
    const images = req.files.map(file => `../../../server/uploads/${file.filename}`);

    let parsedBenefits;
    if (Array.isArray(benefits)) {
        parsedBenefits = benefits;
    } else if (typeof benefits === 'string') {
        try {
            parsedBenefits = JSON.parse(benefits);
        } catch (error) {
            parsedBenefits = [benefits];
        }
    } else {
        parsedBenefits = [];
    }

    try {
        const code = await GenerateUniqueProductCode();
        const car = await Car.create({
            product_code: code,
            brand,
            model,
            power,
            engine_capacity,
            transmission,
            body_type,
            mileage,
            fuel_type,
            seats,
            drive_type,
            doors,
            year,
            images,
            benefits: parsedBenefits, // Убедитесь, что это массив строк
            price
        });
        res.send(car);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500).send('Something went wrong');
    }
});

// Change a car
router.put('/:id', AuthenticateToken, upload.array('images'), async (req, res) => {
    const { id } = req.params;
    const {
        brand, model, power, engine_capacity, transmission,
        body_type, mileage, fuel_type, seats, drive_type,
        doors, year, benefits, price
    } = req.body;

    let images = req.files ? req.files.map(file => `../../../server/uploads/${file.filename}`) : [];

    try {
        const car = await Car.findByPk(id);

        if (car) {
            if (images.length > 0) {
                images = [...car.images, ...images];
            } else {
                images = car.images;
            }

            await car.update({
                brand, model, power, engine_capacity, transmission,
                body_type, mileage, fuel_type, seats, drive_type,
                doors, year, benefits: JSON.parse(benefits), images, price
            });

            res.json(car);
        } else {
            res.status(404).send('Car not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});
//Delete a car
router.delete("/:id",AuthenticateToken, async (req, res) => {
    try {
        const car = await Car.destroy({
            where: { id: req.params.id },
        })
        if(car){
            return res.sendStatus(200)
        } else {
            return res.sendStatus(404,"Car not found")
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(500).send('Something went wrong');
    }
})
router.delete('/:id/images/:imageIndex', AuthenticateToken, async (req, res) => {
    try {
        const { id, imageIndex } = req.params;
        const car = await Car.findByPk(id);

        if (!car) {
            return res.status(404).send('Car not found');
        }

        if (imageIndex < 0 || imageIndex >= car.images.length) {
            return res.status(400).send('Invalid image index');
        }

        const updatedImages = car.images.filter((_, index) => index != imageIndex);
        car.images = updatedImages;
        await car.save();

        res.status(200).send('Image reference deleted from database');
    } catch (error) {
        console.error('Error deleting image reference:', error);
        res.status(500).send('Internal server error');
    }
});

    
export default router
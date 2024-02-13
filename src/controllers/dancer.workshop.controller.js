import { DancerWorkshopDB } from "../databases/dancer.workshop.database.js";

const createDancerWorkshop = async (req, res) => {
    const { title, description, date, hour, duration, city, price, requiredDanceLevel, personMax } = req.body;

    const response = await DancerWorkshopDB.createDancerWorkshop(
        title, description, date, hour, duration, city, price, requiredDanceLevel, personMax
    );
    const result = response.result;

    return res.status(201).json({ message: "OK", dancerWorkshops: result });
};

const readDancerWorkshops = async (req, res) => {
    const response = await DancerWorkshopDB.readDancerWorkshops();
    const result = response.result;

    return res.status(200).json({ message: "Request OK", dancerWorkshops: result });
};

const readOneDancerWorkshop = async (req, res) => {
    const dancerWorkshopId = req.params.dancerWorkshopId;

    const response = await DancerWorkshopDB.readOneDancerWorkshop(dancerWorkshopId);
    const result = response.result;

    const dancerWorkshop = {
        dancerWorkshopId,
        title: result[0].title,
        description: result[0].description,
        date: result[0].date,
        hour: result[0].hour,
        duration: result[0].duration,
        city: result[0].city,
        price: result[0].price,
        requiredDanceLevel: result[0].required_dance_level,
        personMax: result[0].person_max,
    };

    return res.status(200).json({ message: "Request OK", dancerWorkshop });
};

const updateDancerWorkshop = async (req, res) => {
    const { title, description, date, hour, duration, city, price, requiredDanceLevel, personMax, dancerWorkshopId } = req.body;

    const response = await DancerWorkshopDB.updateDancerWorkshop(
        title, description, date, hour, duration, city, price, requiredDanceLevel, personMax, dancerWorkshopId
    );

    if (response.error) {
        return res.status(500).json({ message: response.error });
    }

    return res.status(200).json({ message: `Dancer Workshop number ${dancerWorkshopId} has been edited` });
};

const deleteOneDancerWorkshop = async (req, res) => {
    const dancerWorkshopId = req.params.dancerWorkshopId;

    const response = await DancerWorkshopDB.deleteOneDancerWorkshop(dancerWorkshopId);

    const error = response.error; // soit string soit null

    if (error) {
        return res.status(500).json({ message: error });
    } else {
        return res.status(200).json({ message: "Dancer Workshop deleted" });
    }
};


export const DancerWorkshopController = {
    createDancerWorkshop,
    readDancerWorkshops,
    readOneDancerWorkshop,
    updateDancerWorkshop,
    deleteOneDancerWorkshop,
};

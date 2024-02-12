import { CategoryWorkshopDB } from "../databases/category.workshop.database.js";

const createCategoryWorkshop = async (req, res) => {
    const { name, description } = req.body;

    const response = await CategoryWorkshopDB.createCategoryWorkshop(name, description);
    const result = response.result;

    return res.status(201).json({ message: "OK", categoryWorkshops: result });
};


const readCategoryWorkshops = async (req, res) => {

    const response = await CategoryWorkshopDB.readCategoryWorkshops();
    const result = response.result;

    return res.status(200).json({ message: "Request OK", categoryWorkshops: result });
};

const readOneCategoryWorkshop = async (req, res) => {
    const categoryWorkshopId = req.params.categoryWorkshopId;

    const response = await CategoryWorkshopDB.readOneCategoryWorkshop(categoryWorkshopId);
    const result = response.result;

    const categoryWorkshop = {
        categoryWorkshopId,
        name: result[0].name,
        description: result[0].description,
    };

    return res.status(200).json({ message: "Request OK", categoryWorkshop });
};

const updateCategoryWorkshop = async (req, res) => {
    const { name, description, categoryWorkshopId } = req.body;

    const response = await CategoryWorkshopDB.updateCategoryWorkshop(name, description, categoryWorkshopId);

    if (response.error) {
        return res.status(500).json({ message: response.error });
    }

    return res.status(200).json({ message: `Category Workshop number ${categoryWorkshopId} has been edited` });
};

const deleteOneCategoryWorkshop = async (req, res) => {
    const categoryWorkshopId = req.params.categoryWorkshopId;

    const response = await CategoryWorkshopDB.deleteOneCategoryWorkshop(categoryWorkshopId);

    const error = response.error; // soit string soit null

    if (error) {
        return res.status(500).json({ message: error });
    } else {
        return res.status(200).json({ message: "Category Workshop deleted" });
    }
};

export const CategoryWorkshopController = {
    createCategoryWorkshop,
    readCategoryWorkshops,
    readOneCategoryWorkshop,
    updateCategoryWorkshop,
    deleteOneCategoryWorkshop,
};

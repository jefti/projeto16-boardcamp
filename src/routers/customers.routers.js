import { Router } from "express";
import { validateCustomers } from "../middlewares/validadeCustomers.middleware.js";
import { registerCustomer, getCustomers, getCustomersById,updateCustomer } from "../controllers/customers.controllers.js";
import { validateCustomerId } from "../middlewares/validateCustomersId.middleware.js";

const customersRouters = Router();
customersRouters.post("/customers",validateCustomers,registerCustomer);
customersRouters.get("/customers",getCustomers);
customersRouters.get("/customers/:id",getCustomersById);
customersRouters.put("/customers/:id",validateCustomerId,validateCustomers ,updateCustomer);

export default customersRouters;
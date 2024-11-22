import { getCustomerById } from "./customer/get-customer-by-id.actions";
import { getCustomer } from "./customer/get-customer.actions";

export const server = {
  getCustomer,
  getCustomerById,
};

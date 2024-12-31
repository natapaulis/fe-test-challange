import { useQuery } from "react-query";
import { Customer } from "../types";
import { v4 as uuidv4 } from "uuid";
import { ReactQueryClient } from "../libs";

let customers: Customer[] = [];

export const useGetCustomers = () => {
  const { data, isError, isLoading } = useQuery<Customer[]>(["customers"], () =>
    fetch(
      "https://parloafrontendchallenge.z6.web.core.windows.net/customers.json"
    ).then((res) => res.json())
  );
  if (customers.length === 0) {
    customers = data || [];
  }
  return {
    customerList: customers,
    customerListIsLoading: isLoading,
    customerListIsError: isError,
  };
};

export const addCustomer = async (customer: Customer) => {
  const newCustomer = { ...customer, id: uuidv4() };
  customers.unshift(newCustomer);
  ReactQueryClient.invalidateQueries('customers');
  return newCustomer;
};

export const updateCustomer = async (customer: Customer) => {
  const index = customers.findIndex((c) => {
    return c.id === customer.id});
  

  if (index > -1) {
    customers[index] = { ...customers[index], ...customer };
    ReactQueryClient.invalidateQueries('customers');

  }
  return customers[index];
};

export const deleteCustomer = async (id: string) => {
  customers = customers.filter((c) => c.id !== id);
  ReactQueryClient.invalidateQueries('customers');

};

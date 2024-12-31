import React, { useMemo } from "react";
import { deleteCustomer, useGetCustomers } from "../repositories";
import { Alert, Skeleton, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Customer } from "../types";
import { getIndustryOptions } from "../utils";
import { CustomerForm } from "./CustomerForm";

export const CustomerList = () => {
  const { customerList, customerListIsLoading, customerListIsError } =
    useGetCustomers();
  const columns: TableProps<Customer>["columns"] = useMemo(
    () => [
      {
        title: "Company",
        dataIndex: "company",
        key: "company",
      },
      {
        title: "Industry",
        dataIndex: "industry",
        key: "industry",
        filters: getIndustryOptions(customerList),
        onFilter: (value, record) => record.industry === value,
      },
      {
        title: "About",
        dataIndex: "about",
        key: "about",
      },
      {
        title: "Status",
        dataIndex: "isActive",
        key: "isActive",
        render: (_, { isActive }) => (
          <>
            {isActive ? (
              <Tag color="green">Active</Tag>
            ) : (
              <Tag color="grey">Inactive</Tag>
            )}
          </>
        ),
        filters: [
          { text: "Active", value: "Active" },
          { text: "Inactive", value: "Inactive" },
        ],
        defaultFilteredValue: ["Active"],
        onFilter: (value, record) => {
          if (value === "Active") return record.isActive;
          if (value === "Inactive") return !record.isActive;
          return true;
        },
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <CustomerForm
              customer={record}
              renderButton={(onModalOpen) => <a onClick={onModalOpen}>Edit</a>}
            />
            {!record.isActive && !!record?.id && (
              <a onClick={() => deleteCustomer(record.id!)}>Delete</a>
            )}
          </Space>
        ),
      },
    ],
    [JSON.stringify(customerList)]
  );
  if (customerListIsLoading) return <Skeleton />;
  if (customerListIsError)
    return (
      <Alert
        message="There is an issue showing your customer list. Please try again later"
        type="error"
      />
    );

  const customerData = customerList.map((customer) => ({
    ...customer,
    key: customer.id,
  }));
  
  return <Table<Customer> columns={columns} dataSource={customerData} />;
};

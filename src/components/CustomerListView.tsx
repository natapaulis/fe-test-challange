import React from "react";
import { CustomerList } from "./CustomerList";
import { Button, Space } from "antd";
import { CustomerForm } from "./CustomerForm";

export const CustomerListView = () => {
  return (
    <Space direction="vertical" size="middle">
      <CustomerForm
        renderButton={(onModalOpen) => (
          <Button type="primary" onClick={onModalOpen}>Add new customer</Button>
        )}
      />
      <CustomerList />
    </Space>
  );
};

import { Button, Checkbox, Form, Input, Modal } from "antd";
import React from "react";
import { Customer } from "../types";
import { addCustomer, updateCustomer } from "../repositories";

interface Props {
  customer?: Customer;
  renderButton: (onClick: () => void) => React.ReactNode;
}

export const CustomerForm = ({ customer, renderButton }: Props) => {
  const [showModal, setShowModal] = React.useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);
  const type = customer ? "Edit" : "Add";

  const onSubmit = (values: Customer, customer?: Customer) => {
    if (customer) {
      updateCustomer({ ...customer, ...values });
    } else {
      addCustomer(values);
    }
    handleHideModal();
  };
  const initialValues = customer || { isActive: true };

  return (
    <>
      {renderButton(handleShowModal)}
      <Modal
        title={`${type} Customer`}
        open={showModal}
        onOk={handleHideModal}
        onCancel={handleHideModal}
        destroyOnClose
        footer={null}
      >
        <Form
          name={type}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={initialValues}
          onFinish={(values: Customer) => onSubmit(values, customer)}
          onFinishFailed={() => {}}
          autoComplete="off"
          preserve={false}
        >
          <Form.Item<Customer>
            label="Customer name"
            name="company"
            rules={[
              { required: true, message: "Please input customer's name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Customer>
            label="Industry"
            name="industry"
            rules={[
              { required: true, message: "Please input customer's industry" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Customer> label="About customer" name="about">
            <Input.TextArea />
          </Form.Item>

          <Form.Item<Customer>
            name="isActive"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>Is customer active?</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

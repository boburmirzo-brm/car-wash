import { FC } from "react";
import { Modal, Input, Button, Form } from "antd";

interface CancelPopUp {
  open: boolean;
  onClose: () => void;
  onConfirm: (comment: string) => void;
}

const CancelModal: FC<CancelPopUp> = ({ open, onClose, onConfirm }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onConfirm(values.comment);
        form.resetFields();
      })
      .catch(() => {});
  };

  return (
    <Modal
      title="Bekor qilish"
      open={open}
      onCancel={onClose}
      closable
      footer={
        <Button type="primary" htmlType="submit" form="cancelForm">
          Bekor qilish
        </Button>
      }
    >
      <Form form={form} id="cancelForm" onFinish={handleOk} layout="vertical">
        <Form.Item
          name="comment"
          rules={[
            { required: true, message: "Bekor qilish sababini kiriting!" },
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Bekor qilish sababini yozing..."
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CancelModal;

import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { PatternFormat } from "react-number-format";
import { ICustomerUpdate } from "@/types";
import { useCreateCustomerMutation } from "@/redux/api/customer";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  customer?: ICustomerUpdate | undefined;
}

const CustomerPopup: React.FC<Props> = ({ open, onClose, customer }) => {
  const [form] = Form.useForm();
  const [createCustomer, {isLoading}] = useCreateCustomerMutation()
  const navigate = useNavigate()
  // const [name, setName] = useState("");
  const [apiMessage, contextHolder] = message.useMessage();
  const full_name = Form.useWatch("full_name", form) || ""
  

  // useEffect(() => {
  //   if (open && form) {
  //     if (customer) {
  //       form.setFieldsValue({
  //         name: customer.name,
  //         phone: customer.phone,
  //       });
  //       setName(customer.name);
  //     } else {
  //       form.resetFields();
  //       setName("");
  //     }
  //   }
  // }, [open, customer, form]);

  const handleSave = (values: { full_name: string; tel_primary?: string }) => {
    // message.destroy();

    if (customer) {
      console.log("Mijoz yangilandi:", values);
      apiMessage.success("Mijoz ma'lumoti yangilandi!");
    } else {
      values.tel_primary =  values.tel_primary && values.tel_primary.replace(/\s/gi, "")
      !values.tel_primary && delete values.tel_primary
      
      createCustomer(values)
        .unwrap()
        .then(res => {
          console.log(res.data._id);
          navigate(`/customer/${res.data._id}`)
          apiMessage.success("Yangi mijoz qo'shildi!");
          form.resetFields();
          onClose();
        })
      // setName("");
    }
  };

  const handleClose = () => {
    form.resetFields();
    // setName("");
    onClose();
  };

  return (
    <Modal
      title={
        customer ? `Mijozni tahrirlash ${customer.id}` : "Yangi mijoz qo'shish"
      }
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form 
        form={form} 
        initialValues={customer}
        layout="vertical" 
        onFinish={handleSave}>
        <div className="flex gap-2">
          <Form.Item
            label="Ism"
            name="full_name"
            rules={[{ required: true, message: "Iltimos, ismni kiriting!" }]}
            className="flex-1"
          >
            <Input
              placeholder="Ism"
              // onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          {(!full_name.trim() || full_name === "Noma'lum") && (
            <Button
              type="default"
              className="mt-[30px]"
              style={{
                borderColor: full_name === "Noma'lum" ? "#22c55e" : "",
                color: full_name === "Noma'lum" ? "#22c55e" : "",
              }}
              onClick={() => {
                form.setFieldsValue({ full_name: "Noma'lum" });
                // setName("Noma'lum");
              }}
            >
              Noma'lum
            </Button>
          )}
        </div>

        <Form.Item label="Telefon raqam" name="tel_primary">
          <PatternFormat
            className="w-full px-2 border border-gray-300 rounded-md"
            format="+998 ## ### ## ##"
            mask={"_"}
            allowEmptyFormatting
            customInput={Input}
          />
        </Form.Item>

        <Form.Item style={{ margin: 0 }}>
          <Button type="primary" loading={isLoading} block htmlType="submit">
            {isLoading ? "Kuting" : customer ? "Saqlash" : "Qo'shish"}
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};

export default React.memo(CustomerPopup);

import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Alert,
  Checkbox,
  Spin,
} from "antd";
import { PatternFormat } from "react-number-format";
import { ICustomerUpdate } from "@/types";
import {
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useGetCustomersQuery,
} from "@/redux/api/customer";
import { useNavigate } from "react-router-dom";
import { useModalNavigation } from "@/hooks/useModalNavigation";
import { checkErrorMessage } from "@/helper";
import { useDebounce } from "@/hooks/useDebounce";
import { useCreateInvitationMutation } from "../../redux/api/invitation";
import { FiUserPlus, FiX } from "react-icons/fi";

interface Props {
  open: boolean;
  onClose: (isBack: boolean) => void;
  prevData?: ICustomerUpdate | undefined;
  invitation?: boolean;
}

const CustomerPopup: React.FC<Props> = ({
  open,
  onClose,
  prevData,
  invitation,
}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState<null | string>(null);
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();
  const [createInvitation, { isLoading: isLoadingInvitation }] =
    useCreateInvitationMutation();
  const [updateCustomer, { isLoading: updateLoading }] =
    useUpdateCustomerMutation();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const debouncedSearch = useDebounce(search, 400);

  const {
    data: customerData,
    isLoading: customersLoading,
    error: customersError,
  } = useGetCustomersQuery(
    { filter: debouncedSearch },
    { skip: !showSearch || !debouncedSearch.trim() }
  );
  const customersData = customerData?.data?.payload;

  const navigate = useNavigate();
  const [apiMessage, contextHolder] = message.useMessage();
  const full_name = Form.useWatch("full_name", form) || "";
  useModalNavigation(open, onClose);

  const handleSave = async (values: {
    full_name: string;
    tel_primary?: string | null;
  }) => {
    try {
      values.tel_primary =
        values.tel_primary && values.tel_primary.replace(/\s/gi, "");
      !values.tel_primary && delete values.tel_primary;

      values.tel_primary =
        values.tel_primary === "+998_________" ? null : values.tel_primary;

      if (prevData) {
        if (values.tel_primary) {
          values.tel_primary =
            values?.tel_primary[0] === "+"
              ? values?.tel_primary
              : `+998${values?.tel_primary}`;
        }

        await updateCustomer({ id: prevData.id || "", data: values }).unwrap();
        apiMessage.success("Mijoz ma'lumoti yangilandi!");
        setError(null);
        onClose(false);
      } else {
        const res = await createCustomer(values).unwrap();
        const newCustomerId = res.data._id;
        apiMessage.success("Yangi mijoz qo'shildi!");
        form.resetFields();
        setError(null);

        if (invitation && selectedCustomer) {
          await createInvitation({
            fromId: newCustomerId,
            toId: selectedCustomer._id,
          }).unwrap();
          setSelectedCustomer(null);
        }
        navigate(`/customer/${newCustomerId}`);
        onClose(true);
      }
    } catch (err: any) {
      setError(checkErrorMessage(err.data.message));
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose(false);
    setError(null);
    setShowSearch(false);
    setSearch("");
    setSelectedCustomer(null);
  };

  return (
    <Modal
      title={prevData ? "Mijozni tahrirlash" : "Yangi mijoz qo'shish"}
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form
        form={form}
        initialValues={prevData}
        layout="vertical"
        onFinish={handleSave}
      >
        {!prevData && (
          <div className="flex justify-center">
            <FiUserPlus className="text-[100px]" />
          </div>
        )}
        <div className="flex gap-2">
          <Form.Item
            label="Ism"
            name="full_name"
            rules={[{ required: true, message: "Iltimos, ismni kiriting!" }]}
            className="flex-1"
          >
            <Input placeholder="Ism" />
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

        {!selectedCustomer && (
          <Form.Item>
            <Checkbox
              checked={showSearch}
              onChange={(e) => {
                setShowSearch(e.target.checked);
                setSearch("");
              }}
            >
              Taklif qilingan mijozni qidiring
            </Checkbox>
          </Form.Item>
        )}

        {selectedCustomer ? (
          <div>
            <h3>Shu do'stingiz orqali taklif qilinyapsiz</h3>
            <div className="flex justify-between mb-4 border border-green-200 rounded p-2 bg-green-50 dark:bg-green-950 dark:border-green-900">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {selectedCustomer.full_name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedCustomer.tel_primary}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="text-sm text-gray-500 dark:text-gray-400 px-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FiX />
              </button>
            </div>
          </div>
        ) : (
          showSearch && (
            <>
              <Form.Item>
                <Input
                  placeholder="Mijoz ismini yozing..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  allowClear
                />
              </Form.Item>

              {customersLoading ? (
                <div className="text-center">
                  <Spin />
                </div>
              ) : !customersError && debouncedSearch ? (
                <div className="max-h-48 overflow-y-auto border border-gray-200 mb-4 rounded p-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 space-y-2">
                  {customersData?.map((customer) => (
                    <div
                      key={customer._id}
                      className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {customer.full_name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {customer.tel_primary}
                      </p>
                    </div>
                  ))}
                </div>
              ) : debouncedSearch.trim() ? (
                <div className="text-red-500 text-sm mb-4 text-center">
                  Hech kim topilmadi
                </div>
              ) : null}
            </>
          )
        )}

        {error && (
          <div className="mb-3 mt-[-12px]">
            <Alert message={error} type="error" />
          </div>
        )}

        <Form.Item style={{ margin: 0 }}>
          <Button
            type="primary"
            loading={isLoading || updateLoading || isLoadingInvitation}
            block
            htmlType="submit"
          >
            {isLoading || updateLoading || isLoadingInvitation
              ? "Kuting"
              : prevData
              ? "Saqlash"
              : "Qo'shish"}
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};

export default React.memo(CustomerPopup);

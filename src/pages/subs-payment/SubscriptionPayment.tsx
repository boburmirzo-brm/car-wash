import { useState } from "react";
import { Button, Input, Card, Skeleton, Alert, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useGetBranchByPhoneQuery,
  useCreateSubscriptionMutation,
} from "../../redux/api/branch";
import dayjs from "dayjs";

export const SubscriptionPayment = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [months, setMonths] = useState(1);

  const { data, isFetching, isError, error } = useGetBranchByPhoneQuery(phone, {
    skip: !phone || phone.length < 9,
  });

  const [createSubscription, { isLoading: isPaying }] =
    useCreateSubscriptionMutation();

  const handlePayment = async () => {
    const branch = data?.data?.payload;
    if (!branch) return;

    const start_date = dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss");
    const end_date = dayjs()
      .add(months, "month")
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    const amount = 150000 * months;

    const body = {
      branch_id: branch._id,
      start_date,
      end_date,
      amount,
    };

    try {
      await createSubscription(body).unwrap();
      message.success("Obuna muvaffaqiyatli amalga oshirildi");
      navigate("/"); // yoki to‘lovdan keyingi sahifa
    } catch (err: any) {
      message.error(err?.data?.message || "To‘lovda xatolik yuz berdi");
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-4">
      <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl max-w-xl w-full p-8 border border-gray-200 dark:border-slate-700">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Obuna muddati tugadi
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Telefon raqamingizni kiriting va obunani faollashtiring.
          </p>
        </div>

        <Input
          placeholder="99890123456"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          size="large"
          className="mb-4"
        />

        {isFetching ? (
          <Skeleton active paragraph={{ rows: 1 }} />
        ) : isError ? (
          <Alert
            type="error"
            message="Filial topilmadi"
            description={error?.data?.data?.message || "Xatolik yuz berdi"}
            showIcon
            className="mb-4"
          />
        ) : data?.data?.payload ? (
          <Card title={data.data.payload.name} className="mb-4" bordered>
            <p>ID: {data.data.payload._id}</p>
          </Card>
        ) : null}

        {/* 🕐 Necha oyga obuna bo‘ladi */}
        <Select
          value={months}
          onChange={setMonths}
          className="w-full mb-4"
          size="large"
        >
          {[1, 3, 6, 12].map((m) => (
            <Select.Option key={m} value={m}>
              {m} oy - {(m * 150000).toLocaleString()} so‘m
            </Select.Option>
          ))}
        </Select>

        <Button
          type="primary"
          size="large"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          onClick={handlePayment}
          disabled={!data?.data?.payload || isPaying}
          loading={isPaying}
        >
          To‘lov qilish
        </Button>

        <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4">
          To‘lov davomida muammo yuzaga kelsa, admin bilan bog‘laning.
        </p>
      </div>
    </section>
  );
};

export default SubscriptionPayment;

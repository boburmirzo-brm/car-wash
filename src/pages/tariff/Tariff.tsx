import React, { useState } from "react";
import { Card, Spin, Typography, message, FloatButton, Popover, Empty } from "antd";
import {
  CarOutlined,
  InfoCircleOutlined,
  UserOutlined,
  AppstoreOutlined,
  DollarOutlined,
  PlusOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useDeleteTariffMutation, useGetAllTariffQuery } from "../../redux/api/tariff";
import { Faza, TariffItem } from "../../types";
import TariffPopup from "../../components/tariff-popup/TariffPopup";
import Options from "./Options";

const { Title, Paragraph, Text } = Typography;

const Tariff: React.FC = () => {
  const { data, isLoading, error } = useGetAllTariffQuery({});
  const [deleteTariff] = useDeleteTariffMutation();
  const tariffs: TariffItem[] = data?.data?.payload || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<TariffItem | null>(null);

  if (error && error.status !== 404) {
    message.error("Tarif ma'lumotlarini olishda xatolik yuz berdi.");
  }

  const openModal = (tariff?: TariffItem) => {
    setSelectedTariff(tariff || null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTariff({ id }).unwrap();
      message.success("Tarif o‘chirildi");
    } catch {
      message.error("O‘chirishda xatolik yuz berdi");
    }
  };


  return (
    <Spin spinning={isLoading} tip="Yuklanmoqda...">
      <div className="p-4 grid gap-4 md:grid-cols-2">
        {tariffs.length > 0 ? (
          tariffs.map((tariff) => (
            <Card
              key={tariff._id}
              className="relative"
              style={{
                borderRadius: 16,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <div className="absolute right-2 top-2 z-10">
                <Popover
                  content={
                    <Options
                      onEdit={() => openModal(tariff)}
                      onDelete={() => handleDelete(tariff._id)}
                    />
                  }
                  trigger="click"
                  placement="bottomLeft"
                >
                  <MoreOutlined
                    style={{
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                  />
                </Popover>
              </div>
              <div className="mb-4 space-y-3">
                <div className="flex items-center gap-3 border-b border-border pb-2">
                  <CarOutlined className="text-2xl text-blue-500" />
                  <span className="text-lg font-semibold">
                    {tariff.cars} ({tariff.class} toifa)
                  </span>
                </div>

                <div className="flex items-center gap-3 border-b border-border pb-2">
                  <InfoCircleOutlined className="text-2xl text-gray-500" />
                  <Paragraph className="m-0 italic text-sm">
                    {tariff.comment}
                  </Paragraph>
                </div>

                <div className="flex items-start gap-3 border-b border-border pb-2">
                  <UserOutlined className="text-2xl text-green-500" />
                  <div>
                    <Text strong>
                      {tariff.adminId.f_name} {tariff.adminId.l_name}
                    </Text>
                    <br />
                    <Text type="secondary">@{tariff.adminId.username}</Text>
                    <br />
                    <Text type="secondary">{tariff.adminId.tel_primary}</Text>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Title level={5}>Fazalar:</Title>
                {tariff.faza.map((f: Faza, index: number) => (
                  <div
                    key={f._id || index}
                    className="flex items-center gap-3 border border-dashed rounded-lg p-2"
                  >
                    <AppstoreOutlined className="text-xl text-purple-500" />
                    <span className="font-semibold">
                      {f.number}-faza —{" "}
                      <DollarOutlined className="text-yellow-500" />{" "}
                      {f.price.toLocaleString()} soʻm
                    </span>
                  </div>
                ))}
              </div>

              <span>
                {tariff.createdAt.dateFormat()} {tariff?.createdAt.timeFormat()}
              </span>
            </Card>
          ))
        ) : (
          <Empty
            description="Tariff'lar mavjud emas"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </div>

      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        tooltip="Yangi tarif qo‘shish"
        onClick={() => openModal()}
      />

      <TariffPopup
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selected={selectedTariff || undefined}
      />
    </Spin>
  );
};

export default React.memo(Tariff);

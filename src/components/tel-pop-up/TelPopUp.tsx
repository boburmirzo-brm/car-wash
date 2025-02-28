import React, { FC, useState } from "react";
import { Modal, Button, Typography } from "antd";
import { FiPhone } from "react-icons/fi";

const { Text } = Typography;

const TelPopUp: FC<{ phoneNumber: string }> = ({ phoneNumber }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => setIsModalOpen(false);

  return (
    <div>
      <Button
        type="text"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all"
      >
        <span>{phoneNumber}</span>
        <FiPhone className="text-lg" />
      </Button>

      <Modal
        title="Qo'ng'iroq qilishni tasdiqlang"
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
      >
        <Text className="text-gray-600">
          <span className="text-xl font-bold">{phoneNumber}</span>
        </Text>

        <div className="mt-5 space-y-3">
          <a href={`tel:${phoneNumber}`} className="block">
            <Button type="primary" block>
              Qo'ng'iroq qilish
            </Button>
          </a>
          <Button block onClick={handleClose}>
            Bekor qilish
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default React.memo(TelPopUp);

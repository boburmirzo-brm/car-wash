// components/tariff-popup/options.tsx
import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface OptionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const Options: React.FC<OptionsProps> = ({ onEdit, onDelete }) => {
  return (
    <Space direction="vertical" size="small">
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={onEdit}
        style={{ width: "100%", textAlign: "left" }}
      >
        Tahrirlash
      </Button>
      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        onClick={onDelete}
        style={{ width: "100%", textAlign: "left" }}
      >
        Oʻchirish
      </Button>
    </Space>
  );
};

export default Options;

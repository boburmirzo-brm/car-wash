import { useState, useCallback } from "react";
import { Button, Popover } from "antd";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import BonusPopup from "../../components/bonus-popup/BonusPopup";
import BonusList from "./BonusList"; 
import { useGetAllBonusQuery } from "../../redux/api/bonus";

const Bonus = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState<any>(null);
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const { data } = useGetAllBonusQuery({});

  const handleOpen = useCallback(() => setIsModalOpen(true), []);
  const handleClose = useCallback(() => {
    setIsModalOpen(false);
    setIsEditing(false);
    setSelectedBonus(null);
  }, []);

  const handleEdit = (bonus: any) => {
    setSelectedBonus(bonus);
    setIsEditing(true);
    setOpenPopover(null);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        {data?.length >= 1 ? (
          ""
        ) : (
          <Button onClick={handleOpen} type="primary">
            <PlusOutlined />
          </Button>
        )}
      </div>

      {/* BonusList faqat bonuslarni ko‘rsatadi */}
      <BonusList />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {data?.map((bonus: any) => (
          <Popover
            key={bonus?._id}
            content={
              <Button onClick={() => handleEdit(bonus)} type="text">
                Tahrirlash
              </Button>
            }
            trigger="click"
            placement="bottomRight"
            open={openPopover === bonus?._id}
            onOpenChange={(visible) =>
              setOpenPopover(visible ? bonus?._id : null)
            }
          >
            <Button type="text">
              <MoreOutlined />
            </Button>
          </Popover>
        ))}
      </div>

      {isModalOpen && <BonusPopup open={isModalOpen} onClose={handleClose} />}
      {isEditing && selectedBonus && (
        <BonusPopup
          open={isEditing}
          onClose={handleClose}
          bonus={selectedBonus}
        />
      )}
    </div>
  );
};

export default Bonus;

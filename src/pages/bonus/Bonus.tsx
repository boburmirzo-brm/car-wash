import Box from "@/components/ui/Box";
import { Button, Popover } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useState } from "react";
import {
  PlusOutlined,
  GiftOutlined,
  UsergroupAddOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import BonusPopup from "../../components/bonus-popup/BonusPopup";
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
    console.log("Bonus ID:", bonus);
    setSelectedBonus(bonus);
    setIsEditing(true);
    setOpenPopover(null);
  };

  return (
    <div className="p-4">
      <Box className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Title style={{ marginBottom: 0 }} level={4}>
              Bonus
            </Title>
          </div>
          {data?.length >= 1 ? (
            ""
          ) : (
            <Button onClick={handleOpen} type="primary">
              <PlusOutlined />
            </Button>
          )}
        </div>
      </Box>

      {data?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((bonus: any, index: number) => {
            const key = bonus?._id
              ? `bonus-${bonus?._id}`
              : `bonus-fallback-${index}`;

            return (
              <Box key={key} className="relative">
                <div>
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3 flex-1 border-b border-gray-200 pb-2">
                        <GiftOutlined className="text-2xl " />
                        <span className="text-lg font-semibold">
                          {bonus?.freeCounter}
                        </span>
                      </div>
                      <Popover
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
                    </div>
                    <p className="text-gray-600">
                      Bitta mashina <b>{bonus?.freeCounter - 1}</b> marta kelib
                      yuvdirilsa <b>{bonus?.freeCounter}</b> - bepul bo'ladi. Va
                      bu har gal davom etadi yani{" "}
                      <b>
                        {bonus?.freeCounter}, {bonus.freeCounter * 2},{" "}
                        {bonus.freeCounter * 3}...
                      </b>{" "}
                      va hakazo.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
                      <UsergroupAddOutlined className="text-2xl text-green-500" />
                      <span className="text-lg font-semibold">
                        {bonus?.friendPercent} %
                      </span>
                    </div>
                    <p className="text-gray-600">
                      Bir mijoz do'stini boshlab kelsa va do'sti avval kelmagan
                      yani yangi mijoz bo'lsa, do'stini olib kelgan mijozga{" "}
                      <b>{bonus?.friendPercent} %</b> bonus taqdim etiladi.
                    </p>
                  </div>
                </div>
                <div className=" mt-5 text-gray-600 text-sm">
                  <span>
                    {bonus?.createdAt?.dateFormat()}{" "}
                    {bonus?.createdAt?.timeFormat()}
                  </span>
                </div>
              </Box>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">Hech qanday bonus topilmadi.</p>
      )}

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

export default React.memo(Bonus);

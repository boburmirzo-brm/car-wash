import React, { useState } from "react";
import Box from "@/components/ui/Box";
import {
  GiftOutlined,
  UsergroupAddOutlined,
  EditOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { useGetAllBonusQuery } from "../../redux/api/bonus";
import { MiniLoading } from "@/utils";
import { IBonus } from "../../types";
import BonusPopup from "../../components/bonus-popup/BonusPopup";

const BonusList = () => {
  const { data } = useGetAllBonusQuery({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState<IBonus | undefined>(
    undefined
  );

  if (!data) {
    return <MiniLoading />;
  }
  const bonus = data[0];

  const handleEdit = () => {
    setSelectedBonus(bonus);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBonus(undefined);
  };

  return (
    <div className="p-4">
      <Box className="mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-text text-xl font-bold">Bonus</h2>
        </div>
      </Box>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Box className="relative">
          <div>
            <div className="mb-4 space-y-2">
              <div className="flex items-center gap-3 flex-1 border-b border-border pb-2">
                <GiftOutlined className="text-2xl" />
                <span className="text-lg font-semibold">
                  {bonus?.freeCounter} marta
                </span>
              </div>
              <div className="flex items-center gap-3 flex-1 border-b border-border pb-2">
                <TagsOutlined className="text-2xl" />
                <span className="text-lg font-semibold px-2 py-1 rounded-md transition-all">
                  {bonus?.freeCounterAmount.toLocaleString()} UZS
                </span>
              </div>
              <p className="text-text-muted">
                Mashinangizni <b>{bonus?.freeCounter - 1}</b> marta yuvdirib,{" "}
                jami <b>{bonus?.freeCounterAmount.toLocaleString()} UZS</b>{" "}
                sarflagan bo'lsangiz, <b>{bonus?.freeCounter}</b>-marta bepul
                xizmat olasiz!
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 border-b border-border pb-2">
                <UsergroupAddOutlined className="text-2xl text-green-500" />
                <span className="text-lg font-semibold">
                  {bonus?.friendPercent} %
                </span>
              </div>
              <p className="text-text-muted">
                Do'stingizni olib kelsangiz, <b>{bonus?.friendPercent} %</b>{" "}
                bonus sizga taqdim etiladi!
              </p>
            </div>
          </div>
          <div className="mt-5 text-text-muted text-sm">
            <span>
              {bonus?.createdAt?.dateFormat()} {bonus?.createdAt?.timeFormat()}
            </span>
          </div>
          <button
            onClick={handleEdit}
            className="absolute top-2 right-2 text-gray-500 hover:text-blue-500 transition-colors"
            aria-label="Edit bonus"
          >
            <EditOutlined className="text-xl" />
          </button>
        </Box>
      </div>

      <BonusPopup
        open={isModalOpen}
        onClose={handleCloseModal}
        bonus={selectedBonus}
      />
    </div>
  );
};

export default React.memo(BonusList);

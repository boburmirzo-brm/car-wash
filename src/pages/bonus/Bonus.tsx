import Box from "@/components/ui/Box";
import { GiftOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { useGetAllBonusQuery } from "../../redux/api/bonus";
import { MiniLoading } from "@/utils";

const BonusList = () => {
  const { data } = useGetAllBonusQuery({});
  if (!data) {
    return <MiniLoading />;
  }
  const bonus = data[0];
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
                  {bonus?.freeCounter}
                </span>
              </div>
              <p className="text-text-muted">
                Bitta mashina <b>{bonus?.freeCounter - 1}</b> marta kelib
                yuvdirilsa
                <b> {bonus?.freeCounter}</b> - bepul bo'ladi.
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
                Bir mijoz do'stini olib kelsa, unga{" "}
                <b>{bonus?.friendPercent} %</b> bonus taqdim etiladi.
              </p>
            </div>
          </div>
          <div className="mt-5 text-text-muted text-sm">
            <span>
              {bonus?.createdAt?.dateFormat()} {bonus?.createdAt?.timeFormat()}
            </span>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default BonusList;

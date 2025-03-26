import Box from "@/components/ui/Box";
import { GiftOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useGetAllBonusQuery } from "../../redux/api/bonus";

const BonusList = () => {
  const { data } = useGetAllBonusQuery({});

  return (
    <div className="p-4">
      <Box className="mb-4">
        <div className="flex justify-between items-center">
          <Title style={{ marginBottom: 0 }} level={4}>
            Bonus
          </Title>
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
                    <div className="flex items-center gap-3 flex-1 border-b border-gray-200 pb-2">
                      <GiftOutlined className="text-2xl" />
                      <span className="text-lg font-semibold">
                        {bonus?.freeCounter}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      Bitta mashina <b>{bonus?.freeCounter - 1}</b> marta kelib
                      yuvdirilsa
                      <b> {bonus?.freeCounter}</b> - bepul bo'ladi.
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
                      Bir mijoz do'stini olib kelsa, unga{" "}
                      <b>{bonus?.friendPercent} %</b> bonus taqdim etiladi.
                    </p>
                  </div>
                </div>
                <div className="mt-5 text-gray-600 text-sm">
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
    </div>
  );
};

export default BonusList;

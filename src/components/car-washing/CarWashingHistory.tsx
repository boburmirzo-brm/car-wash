import React, { useCallback, useMemo } from "react";
import { HistoryOutlined } from "@ant-design/icons";
import { DatePicker, Space, Pagination, Button } from "antd";
import { useGetMyWashingsQuery } from "../../redux/api/car-washing";
import { CustomEmpty } from "@/utils";
import CarWashing from "./CarWashing";
import { useParamsHook } from "@/hooks/useParamsHook";

const { RangePicker } = DatePicker;

const CarWashingHistory = () => {
  const { getParam, setParam, removeParam, removeParams } = useParamsHook();

  const fromDate = getParam("fromDate") || "";
  const toDate = getParam("toDate") || "";
  const page = getParam("page") || "1";
  const limit = "2";

  const filters = useMemo(
    () => ({
      fromDate,
      toDate,
      done: "1",
      page,
      limit,
    }),
    [fromDate, toDate, page]
  );

  const { data, isError } = useGetMyWashingsQuery(filters);
  console.log(data);

  const handleFilterChange = useCallback(
    (dates: any) => {
      if (dates) {
        setParam("fromDate", dates[0].format("YYYY-MM-DD"));
        setParam("toDate", dates[1].format("YYYY-MM-DD"));
      } else {
        removeParam("fromDate");
        removeParam("toDate");
      }
    },
    [setParam, removeParam]
  );

  const clearFilters = useCallback(() => {
    removeParams(["fromDate", "toDate", "page"]);
  }, [removeParams]);

  const handlePageChange = useCallback(
    (page: number) => {
      setParam("page", page.toString());
    },
    [setParam]
  );

  return (
    <div className="my-4 space-y-4">
      <div className="flex justify-between items-start">
        <div className="text-xl font-bold flex items-center gap-2 text-gray-700">
          <HistoryOutlined />
          <span>Tarix</span>
        </div>
        <Space direction="vertical">
          <span className="font-semibold">Sana oralig'i:</span>
          <RangePicker format="YYYY-MM-DD" onChange={handleFilterChange} />
          <Button type="primary" block onClick={clearFilters}>
            Tozalash
          </Button>
        </Space>
      </div>
      {isError ? (
        <CustomEmpty />
      ) : (
        <CarWashing profile={true} data={data?.data} />

        // data?.data?.payload?.map((item: ICarWash) => (
        //   <div
        //     key={item._id}
        //     className="bg-white shadow-sm rounded-md p-4 border border-gray-300 relative"
        //   >
        //     <div className="flex items-center justify-between mt-2">
        //       <Link
        //         to={`/car/${item?.carId?._id}`}
        //         className="flex items-center gap-2 text-gray-700"
        //       >
        //         <IoCarOutline className="text-lg text-gray-600" />
        //         <span>{item?.carId?.name}</span>
        //       </Link>
        //       <CarNumber plateNumber={item?.carId?.plateNumber} />
        //       {/* <span className="border-2 font-bold border-gray-500 px-2 py-1 rounded-md uppercase text-gray-700 text-base">
        //         {item?.carId?.plateNumber?.plateNumberFormat()}
        //       </span> */}
        //     </div>

        //     <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mt-3">
        //       <div>
        //         <p className="flex items-center gap-2 text-gray-700 text-sm">
        //           <AiOutlineUser className="text-lg" />
        //           <Link
        //             to={`/customer/${item?.customerId?._id}`}
        //             className="text-base font-semibold text-gray-800 flex items-center gap-2"
        //           >
        //             {item?.customerId?.full_name === "Noma'lum" && (
        //               <TbUserX className="text-2xl text-yellow-500" />
        //             )}
        //             {item?.customerId?.full_name || "Noma'lum mijoz"}
        //           </Link>
        //         </p>
        //         <p className="flex items-center gap-2 text-gray-700 text-sm font-medium">
        //           <TbCoins className="text-lg" />
        //           <span>
        //             {item?.employerSalary?.toLocaleString() || "0"} UZS
        //           </span>
        //         </p>
        //       </div>
        //       <strong className="text-lg text-gray-900 font-semibold">
        //         {item?.washAmount?.toLocaleString() || "0"} UZS
        //       </strong>
        //     </div>
        //     <div className="flex justify-between items-center mt-3 text-gray-600 text-sm">
        //       <span>
        //         {item?.createdAt?.dateFormat()} {item?.createdAt?.timeFormat()}
        //       </span>
        //     </div>
        //   </div>
        // ))
      )}
      
      {!isError && (
        <div className="flex justify-end">
          <Pagination
            current={parseInt(page, 10)}
            pageSize={parseInt(limit, 10)}
            total={data?.data?.total}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(CarWashingHistory);

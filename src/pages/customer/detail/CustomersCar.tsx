// import CarsView from "@/components/cars-view/CarsView";
// import { CustomEmpty } from "@/utils";
// import { Button, Skeleton } from "antd";
// import Title from "antd/es/typography/Title";
// import React from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import CarPopup from "@/components/car-popup/CarPopup";

// const CustomersCar = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
  

//   return (
//     <>
//       <div className="flex justify-between">
//         <Title level={4}>Mijoz mashinalari</Title>
//         <Button
//           onClick={() => handleOpenModal("car")}
//           loading={isLoading}
//           type="primary"
//         >
//           <PlusOutlined />
//         </Button>
//       </div>
//       {isLoading ? (
//         <Skeleton active />
//       ) : cars?.length ? (
//         <CarsView data={cars || []} />
//       ) : (
//         <CustomEmpty />
//       )}
//       <CarPopup
//         open={modalType === "car"}
//         onClose={handleClose}
//         customerId={customer?._id}
//       />
//     </>
//   );
// };

// export default React.memo(CustomersCar);

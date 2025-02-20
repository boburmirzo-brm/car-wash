import React from "react"
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center text-gray-600">
      <div className="text-center">
        <p className="text-9xl  font-extrabold drop-shadow-2xl max-[600px]:text-7xl">
          404
        </p>
        <p className="text-lg mt-2 drop-shadow-lg max-[600px]:text-sm">
          Bunday sahifa mavjud emas
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 inline-block bg-black text-white px-6 py-1.5 rounded-md shadow-md hover:opacity-70 transition duration-300"
        >
          Orqaga qaytish
        </button>
      </div>
    </section>
  );
};

export default React.memo(NotFound)

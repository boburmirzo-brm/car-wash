import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate()
  return (
    <div>
      <Result
        status="500"
        title="500"
        subTitle="Bu sahifa hali tayyor emas !"
        extra={<Button onClick={()=> navigate(-1)} type="primary">Orqaga</Button>}
      />
    </div>
  );
};

export default React.memo(Profile);

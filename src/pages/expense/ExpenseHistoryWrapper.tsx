import { useParams } from "react-router-dom";
import React, { Suspense } from "react";
import UserExpenseHistory from "../user/expense/UserExpenseHistory";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

const ExpenseHistoryWrapper = () => {
  const { id } = useParams<{ id?: string }>();
  const employeeId = useSelector((state: RootState) => state.auth.id);

  const userId = id || employeeId; 

  return (
    <Suspense>
      <UserExpenseHistory userId={userId} />
    </Suspense>
  );
};

export default React.memo(ExpenseHistoryWrapper);

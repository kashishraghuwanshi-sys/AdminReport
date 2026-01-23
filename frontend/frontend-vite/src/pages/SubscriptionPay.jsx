import React from 'react'
import UserActivityTable from '../components/UserActivityTable'
import { useLocation } from "react-router-dom";
const SubscriptionPay = () => {
    const { state } = useLocation();
    console.log(state);
  return (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">
              User Plan & Payment Activity
            </h2>
            <UserActivityTable data={state.val || []} />
          </div>
  )
}

export default SubscriptionPay

const UserActivityTable = ({ data = [] }) => {
  if (!data.length) {
    return <p className="text-gray-500 text-center">No user activity found</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full border">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Plan</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Payment Status</th>
            <th className="p-2 border">Purchase Date</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {data.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="p-2 border">{item.user_name}</td>
              <td className="p-2 border">{item.email}</td>
              <td className="p-2 border">{item.plan_name}</td>
              <td className="p-2 border">{item.plan_status}</td>
              <td className="p-2 border">
                {item.amount ? `${item.amount} ${item.currency}` : "-"}
              </td>
              <td className="p-2 border">
                {item.payment_status || "N/A"}
              </td>
              <td className="p-2 border">
                {new Date(item.plan_purchase_date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserActivityTable;

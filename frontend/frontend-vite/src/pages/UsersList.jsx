// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const UsersList = () => {
//   const { type } = useParams(); // all | approved | hold
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchUsers();
//   }, [type]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     const res = await axios.get("/api/admin/users", {
//       params: { type },
//     });
//     setUsers(res.data.data || []);
//     setLoading(false);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold capitalize mb-4">
//         {type} Users
//       </h1>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Age</th>
//               <th>Profession</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u, i) => (
//               <tr key={i}>
//                 <td>{u.name || "N/A"}</td>
//                 <td>{u.email}</td>
//                 <td>{u.age || "-"}</td>
//                 <td>{u.profession || "-"}</td>
//                 <td>{u.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default UsersList;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UsersList = () => {
  const { type } = useParams(); // all | approved | hold
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [type]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      // ✅ BACKEND API
      const res = await axios.get(
        `http://localhost:5000/api/admin/users?type=${type}`
      );
      console.log(res);
      // 🔥 IMPORTANT FIX
      setUsers(res.data.data || []);

    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "15px", textTransform: "capitalize" }}>
        {type} Users
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="overflow-x-auto">
  <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
          S. No.
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
          Name
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
          Email
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
          Age
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
          Profession
        </th>
         <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
          Registered Date
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
          Status
        </th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200 bg-white">
      {users.map((user,index) => (
        <tr
          key={user.id}
          className="hover:bg-gray-50 transition-colors"
        >
          <td className="px-6 py-4 text-sm text-gray-800">
            {index+1}
          </td>
          <td className="px-6 py-4 text-sm text-gray-800">
            {user.name} {user.lname}
          </td>
          <td className="px-6 py-4 text-sm text-gray-600">
            {user.email}
          </td>
          <td className="px-6 py-4 text-sm text-gray-800">
            {user.age}
          </td>
          <td className="px-6 py-4 text-sm text-gray-800">
            {user.profession}
          </td>
          <td className="px-6 py-4 text-sm text-gray-800">
            {new Date(user.created_at).toLocaleDateString()}
          </td>
          <td className="px-6 py-4 text-sm">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                  user.status === "Approve"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {user.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      )}
    </div>
  );
};

export default UsersList;

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
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Profession</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.profession}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;

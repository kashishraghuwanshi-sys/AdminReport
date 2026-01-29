
// import axios from "axios";

// // Base URL
// const BASE_URL = "http://localhost:5000";

// // Existing Report API
// const REPORT_API_URL = `${BASE_URL}/api/admin/reports`;

// // Users API
// const USERS_API_URL = `${BASE_URL}/api/admin/users/handle`;

// /**
//  * ✅ ADMIN REPORT
//  * GET /api/admin/reports?fromDate&toDate&groupBy
//  */
// export const fetchAdminReport = async (fromDate, toDate, groupBy = "month") => {
//   const response = await axios.get(REPORT_API_URL, {
//     params: { fromDate, toDate, groupBy },
//   });
//   return response.data;
// };

// /**
//  * ✅ NOT RENEWED USERS (Inactive)
//  * GET /api/admin/reports/not-renewed
//  */
// export const fetchNotRenewedUsers = async () => {
//   const response = await axios.get(`${REPORT_API_URL}/not-renewed`);
//   return response.data;
// };

// /**
//  * ✅ USERS BY TYPE
//  * GET /api/admin/users?type=all|approved|hold|process|deactivated
//  */
// export const fetchUsersByType = async (type = "all") => {
//   const response = await axios.get(USERS_API_URL, {
//     params: { type },
//   });
//   return response.data;
// };

// /**
//  * ✅ HEALTH CHECK
//  * GET /health
//  */
// export const fetchHealth = async () => {
//   const response = await axios.get(`${BASE_URL}/health`);
//   return response.data;
// };




import axios from "axios";

const BASE_URL = "http://localhost:5000";

const REPORT_API_URL = `${BASE_URL}/api/admin/reports`;
const USERS_API_URL = `${BASE_URL}/api/admin/users/handle`;

export const fetchAdminReport = async (fromDate, toDate, groupBy = "month") => {
  const response = await axios.get(REPORT_API_URL, {
    params: { fromDate, toDate, groupBy },
  });
  return response.data;
};

export const fetchNotRenewedUsers = async (fromDate, toDate) => {
  const response = await axios.get(`${REPORT_API_URL}/not-renewed`, {
    params: { fromDate, toDate },
  });
  return response.data;
};

export const fetchUsersByType = async (type = "all", fromDate, toDate) => {
  const response = await axios.get(USERS_API_URL, {
    params: { type, fromDate, toDate },
  });
  return response.data;
};

export const fetchHealth = async () => {
  const response = await axios.get(`${BASE_URL}/health`);
  return response.data;
};
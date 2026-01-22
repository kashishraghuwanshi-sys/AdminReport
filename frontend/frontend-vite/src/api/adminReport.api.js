import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/reports";

export const fetchAdminReport = async (fromDate, toDate, groupBy="month") => {
  const response = await axios.get(API_URL, {
    params: {
      fromDate: fromDate,
      toDate: toDate,
      groupBy,// week | month
    },
  });

  return response.data;
};
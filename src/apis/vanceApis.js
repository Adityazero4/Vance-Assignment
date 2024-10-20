import axios from "axios";

const BASE_URL = "https://web-api.vance.club/public/api/currency-converter/forex";

export const getVanceData = async (code = "AED", timeline = "1M") => {
  try {
    const url = `${BASE_URL}?code=${encodeURIComponent(`${code}INR=X`)}&timeline=${timeline}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching forex rate history:", error);
    throw error; 
  }
};

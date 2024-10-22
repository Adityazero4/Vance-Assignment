import { CURRENCY_PAIRS_AED_INR, CURRENCY_PAIRS_GBP_INR } from "../lib/constant";

const BASE_URL = "https://web-api.vance.club/public/api/currency-converter/forex";

export const getVanceData = async (code = "AED", timeline = "1M") => {
  try {
    // const url = `${BASE_URL}?code=${encodeURIComponent(`${code}INR=X`)}&timeline=${timeline}`;
    // const response = await axios.get(url);
    // return response.data;
   return new Promise((resolve) => {
      setTimeout(() => {
        if (code === "AED") {
          resolve(CURRENCY_PAIRS_AED_INR);
        } else if (code === "GBP") {
          resolve(CURRENCY_PAIRS_GBP_INR);
        }
      }, 500); 
    });
  } catch (error) {
    console.error("Error fetching forex rate history:", error);
    throw error; 
  }
};

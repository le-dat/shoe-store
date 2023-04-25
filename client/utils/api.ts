import axios from "axios";

import { API_URL, STRAPI_API_TOKEN } from "./urls";

export const fetchData = async (endpoint: string) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
  };

  try {
    const { data } = await axios.get(`${API_URL}/${endpoint}`, options);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const makePaymentRequest = async (endpoint: string, payload: any) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify(payload),
  };

  try {
    const { data } = await axios.post(`${API_URL}/${endpoint}`, payload, options);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const makePaymentRequest = async (endpoint: string, payload: any) => {
//   const res = await fetch(`${API_URL}/${endpoint}`, {
//     method: "POST",
//     headers: {
//       Authorization: "Bearer " + STRAPI_API_TOKEN,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });
//   const data = await res.json();
//   return data;
// };

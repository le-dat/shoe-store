import axios from "axios";

import { API_URL, STRAPI_API_TOKEN } from "./urls";
import { MethodAPIType } from "@/types";

const options = (type: MethodAPIType) => ({
  method: type,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
  },
});

export const fetchData = async (endpoint: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/${endpoint}`, options("GET"));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const makePaymentRequest = async (endpoint: string, payload: any) => {
  try {
    const { data } = await axios.post(`${API_URL}/${endpoint}`, payload, options("POST"));
    return data;
  } catch (error) {
    console.log(error);
  }
};

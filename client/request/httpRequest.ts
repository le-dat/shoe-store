import axios from "axios";

import { API_URL, STRAPI_API_TOKEN } from "../utils/urls";
import { MethodAPIType } from "@/types";

const options = (type: MethodAPIType) => ({
  method: type,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
  },
});

const httpRequest = axios.create({
  baseURL: `${API_URL}/api`,
});

export const get = async (path: string) => {
  try {
    const { data } = await httpRequest.get(path, options("GET"));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const post = async (endpoint: string, payload: any) => {
  try {
    const { data } = await axios.post(`${API_URL}/${endpoint}`, payload, options("POST"));
    return data;
  } catch (error) {
    console.log(error);
  }
};

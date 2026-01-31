import axios from "axios";

const resolveBaseUrl = () => {
	if (process.env.NODE_ENV === "production") {
		return process.env.API_BASE_URL_PROD;
	} else if (process.env.NODE_ENV === "development") {
		return process.env.API_BASE_URL_DEV;
	} else {
		return process.env.API_BASE_URL_TEST;
	}
};

const API_BASE_URL = resolveBaseUrl();

export const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
});

export const Config = {
	axiosInstance,
};

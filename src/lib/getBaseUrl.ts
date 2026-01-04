export const getBaseUrl = () => {
	if (process.env.NODE_ENV === "production") {
		return process.env.NEXT_PUBLIC_API_BASE_URL_PROD;
	} else {
		return "";
	}
};

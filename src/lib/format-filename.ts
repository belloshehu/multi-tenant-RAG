export const formatFileName = (fileName: string, maxLength = 25) => {
	if (fileName.length > maxLength) {
		return fileName.trim().split("/").at(-1)?.slice(0, maxLength) + "...";
	}
	return fileName.trim().split("/").at(-1)?.slice(0, maxLength);
};

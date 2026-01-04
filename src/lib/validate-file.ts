export const validateFile = (name: string, type: ".pdf" | ".txt" | ".doc") => {
	return name.endsWith(type) && name && name.length > 0;
};

export const validateFile = (
	name: string,
	type: ".pdf" | ".txt" | ".doc" | ".png" | ".jpg" | ".jpeg"
) => {
	return Boolean(name.endsWith(type) && name && name.length > 0);
};

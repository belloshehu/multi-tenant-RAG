"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
// import { uploadToSupabase } from "../actions/index-document";

const FileUpload = () => {
	const [uploadRes, setUploadRes] = useState("");
	const [loading, setLoading] = useState(false);

	const handleUpload = async () => {
		setLoading(true);
		try {
			// const response = await uploadToSupabase("");
			const response: any = null;
			if (response) {
				setUploadRes(response.message);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};
	return (
		<Button onClick={handleUpload}>
			<Upload />
			{loading ? "Loading" : "Upload document"}
		</Button>
	);
};

export default FileUpload;

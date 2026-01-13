"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { Button } from "../components/ui/button";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="w-full h-[60vh] justify-center items-center flex flex-col gap-6">
			<h2 className="text-red-600 font-semibold text-lg md:text-2xl">
				{error.message || "Something went wrong!"}
			</h2>
			<p>You could check your internet connection</p>
			<Button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</Button>
		</div>
	);
}

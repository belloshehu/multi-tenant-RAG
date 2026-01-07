"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

const CustomQueryClientProvider = ({ children }: { children: ReactNode }) => {
	const client = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: Infinity,
			},
		},
	});
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default CustomQueryClientProvider;

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { TenantProvider } from "../contexts/tenant-context";
import { Toaster } from "../components/ui/sonner";
import CustomQueryClientProvider from "../contexts/custom-query-provider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "multi-tenant RAG",
	description:
		"Multi-tenant RAG that allows chatting with many uploaded documents one at a time.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<CustomQueryClientProvider>
					<TenantProvider>
						<Header />
						{children}
					</TenantProvider>
				</CustomQueryClientProvider>
				<Toaster />
			</body>
		</html>
	);
}

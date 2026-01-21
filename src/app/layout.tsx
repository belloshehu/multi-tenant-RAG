import type { Metadata } from "next";
import { Aladin, Alegreya_Sans, Montaga } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { TenantProvider } from "../contexts/tenant-context";
import { Toaster } from "../components/ui/sonner";
import CustomQueryClientProvider from "../contexts/custom-query-provider";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

const aladin = Aladin({
	variable: "--font-aladin",
	subsets: ["latin"],
	weight: "400",
});

const alegreyaSans = Alegreya_Sans({
	variable: "--font-alegreya",
	subsets: ["latin"],
	weight: "100",
});

const montaga = Montaga({
	variable: "--font-alegreya",
	subsets: ["latin"],
	weight: "400",
});

gsap.registerPlugin(SplitText, ScrollTrigger);

export const metadata: Metadata = {
	title: "Opsyst",
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
				className={`${alegreyaSans.variable} ${aladin.variable} ${montaga.className} antialiased`}
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

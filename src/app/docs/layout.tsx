import PageWrapper from "@/src/components/PageWrapper";

export default function DeveloperLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<PageWrapper className="grid grid-cols-8">
			<aside className="col-span-2">
				<ul className="flex flex-col gap-2">
					<li>Integration</li>
					<li>API</li>
					<li>UI customization</li>
				</ul>
			</aside>
			{children}
		</PageWrapper>
	);
}

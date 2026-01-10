import { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<div className="w-full p-2 py-20 md:p-20 min-h-screen">{children}</div>
	);
};

export default PageWrapper;

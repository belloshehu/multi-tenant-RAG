import { ReactNode } from "react";
import { cn } from "../lib/utils";

const PageWrapper = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("w-full p-2 py-20 md:p-20 min-h-screen", className)}>
			{children}
		</div>
	);
};

export default PageWrapper;

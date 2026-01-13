import { cn } from "@/src/lib/utils";

export default function Loader({
	message,
	fullScreen,
	textClassName,
}: {
	message?: string;
	fullScreen?: boolean;
	textClassName?: string;
}) {
	return (
		<div
			className={cn("flex items-center justify-center", {
				"h-[50vh]": fullScreen,
			})}
		>
			<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600"></div>
			<span className={cn("ml-4 text-lg text-white", textClassName)}>
				{message || "Loading..."}
			</span>
		</div>
	);
}

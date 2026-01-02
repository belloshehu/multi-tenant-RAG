import { Search } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
	ActionDispatch,
	ChangeEventHandler,
	Dispatch,
	SetStateAction,
} from "react";

type SearchInputProps = {
	// Props type definition
	placeholder: string;
	className?: string;
	onChange: Dispatch<SetStateAction<string>>;
	onSubmit: () => void;
};

export default function SearchInput({
	placeholder,
	className,
	onChange,
	onSubmit,
}: SearchInputProps) {
	const isMobile = useIsMobile();
	return (
		<div
			className={cn(
				"flex items-center justify-center rounded-full border border-[#ADF802] hover:shadow-xl hover:shadow-slate-400 hover:drop-shadow-2xl bg-white",
				{ "w-full": isMobile },
				className
			)}
		>
			<Input
				type="text"
				className="text-black outline-none border-none active:outline-none active:border-none rounded-full focus-visible:ring-[0px] bg-none focus-visible:ring-offset-[0px]"
				placeholder={placeholder || "Search"}
				onChange={(e) => {
					onChange(e.target.value);
				}}
			/>
			<Button
				variant={"ghost"}
				className="outline-none bg-[#ADF802] rounded-full m-[1px] p-1 px-3"
				size={"icon"}
				onClick={onSubmit}
			>
				<Search className="text-white" />
				<span className="sr-only">Search Button</span>
			</Button>
		</div>
	);
}

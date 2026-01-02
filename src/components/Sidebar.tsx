import FileUpload from "@/src/components/FileUpload";
import { Database, File } from "lucide-react";

const Sidebar = () => {
	return (
		<aside className="hidden md:col-span-2 border-r-[1px] h-screen w-full pt-5 md:flex flex-col items-start justify-start gap-5 p-2">
			<div className="flex p-2 bg-green-400 w-full text-white items-center">
				<Database size={20} />
				<h3 className="text-xl ">Sources</h3>
			</div>
			{/* <FileUpload /> */}
		</aside>
	);
};

export default Sidebar;

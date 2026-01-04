import Prompt from "@/src/components/Prompt";
import Sidebar from "../components/Sidebar";

export default async function Home() {
	return (
		<div className="grid grid-cols-8 justify-between items-center mx-auto bg-white p-5  gap-10 pt-0 min-h-screen w-full rounded-b-4xl shadow-sm">
			<Sidebar />
			{/* <main className="col-span-full w-full mx-auto  flex flex-col items-center  dark:bg-black "></main> */}
			<Prompt />
		</div>
	);
}

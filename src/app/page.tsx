import Sidebar from "../components/Sidebar";
import HistorySidebar from "../components/HistorySidebar";
import MainContent from "../components/MainContent";

export default async function HomePage() {
	return (
		<div className="grid grid-cols-8 justify-between items-center mx-auto bg-white p-5 md:pt-14 gap-0 pt-0 h-screen w-full overflow-clip rounded-b-4xl shadow-sm">
			<Sidebar />
			{/* <main className="col-span-full w-full mx-auto  flex flex-col items-center  dark:bg-black "></main> */}
			<MainContent />
			<HistorySidebar />
		</div>
	);
}

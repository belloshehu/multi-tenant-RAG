"use client";
import { useTenant } from "../contexts/tenant-context";
import Prompt from "./Prompt";
import TenantMainContent from "./tenants/TenantMainContent";

const MainContent = () => {
	const { content } = useTenant();
	if (content === "chat") return <Prompt />;
	else return <TenantMainContent />;
};

export default MainContent;

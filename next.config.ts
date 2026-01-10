import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
				// pathname: "a/**",
				search: "",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				// pathname: "a/**",
				search: "",
			},
			{
				protocol: "https",
				port: "",
				search: "",
				hostname: "iuaqczypuhjbziapipiu.supabase.co",
			},
		],
	},
};

export default nextConfig;

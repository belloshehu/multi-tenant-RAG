import { User } from "lucide-react";
import Image from "next/image";

const Avatar = ({ imageUrl }: { imageUrl: string }) => {
	if (imageUrl)
		return (
			<Image
				src={imageUrl}
				width={10}
				height={10}
				alt="avatar"
				className="w-8 h-8 rounded-full object-cover"
			/>
		);
	else {
		return <User />;
	}
};

export default Avatar;

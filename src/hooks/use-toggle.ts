import { useState } from "react";

const useToggle = (defaultState: boolean = false) => {
	const [isToggled, setIsToggled] = useState(defaultState);
	const toggle = () => setIsToggled((prev) => !prev);

	return { isToggled, toggle };
};

export default useToggle;

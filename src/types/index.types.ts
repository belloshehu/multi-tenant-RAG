export interface ResponseType<IData> {
	message: string;
	data: IData;
}

export interface PricingType {
	title: string;
	cost: number;
	currency: "$" | "N";
	duration: "monthly" | "yearly";
	benefits: string[];
}

import { User } from "better-auth";

export interface UserType extends User {
	role: "admin" | "user";
}

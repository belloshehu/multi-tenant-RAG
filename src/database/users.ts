import { User } from "better-auth";
import { supabase } from "../lib/supabase";

export const getAllUsers = async (): Promise<User[] | null> => {
	let { data: users, error } = await supabase.from("user").select("*");
	if (error) throw new Error("Failed to fetch users: " + error.message);
	return users;
};

export const getUserById = async (id: string): Promise<User | null> => {
	console.log(id);
	let { data: user, error } = await supabase
		.from("user")
		.select("*")
		.eq("id", id)
		.limit(1)
		.single();
	if (error) throw new Error("Failed to fetch user by: " + error.message);
	return user;
};

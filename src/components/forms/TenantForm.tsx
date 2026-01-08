"use clients";

import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import FormInputField from "../form-fields/FormInput";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextarea from "../form-fields/FormTextarea";
import { tenantSchema, TenantSchemaType } from "@/src/schemas/tenants.schema";
import { useCreateTenant } from "@/src/hooks/serivce-hooks/tenants.service.hooks";
import { authClient } from "@/src/lib/auth-client";

const TenantForm = () => {
	const form = useForm<TenantSchemaType>({
		resolver: zodResolver(tenantSchema),
	});
	const {
		control,
		formState: { isSubmitting, errors },
		handleSubmit,
		reset,
	} = form;
	const { mutateAsync, isPending, isSuccess } = useCreateTenant();
	const { data: authData } = authClient.useSession();

	const onSubmit = async (data: TenantSchemaType) => {
		await mutateAsync({
			payload: { ...data, user_id: authData?.user.id! },
		});
		if (isSuccess) {
			reset();
		}
	};
	return (
		<Form {...form}>
			<form
				action=""
				onSubmit={handleSubmit(onSubmit)}
				className="w-full flex flex-col gap-5"
			>
				<FormInputField
					control={control}
					name="name"
					label="Document's Name"
					placeholder="Enter a unique name"
					id="name"
					type="text"
					errorMessage={errors.name?.message}
				/>
				<FormTextarea
					control={control}
					name="description"
					label="Document's Description"
					placeholder="Enter document description"
					id="description"
					errorMessage={errors.name?.message}
				/>
				<FormInputField
					control={control}
					name="email"
					label="Main email"
					placeholder="Enter main email"
					id="email"
					type="email"
					errorMessage={errors.email?.message}
				/>
				<FormInputField
					control={control}
					name="support_email"
					label="Support email"
					placeholder="Enter support email"
					id="support_email"
					type="email"
					errorMessage={errors.support_email?.message}
				/>
				<FormInputField
					control={control}
					name="logo"
					label="Logo Url"
					placeholder="Enter logo url"
					id="logo"
					type="url"
					errorMessage={errors.logo?.message}
				/>

				<FormInputField
					control={control}
					name="site_url"
					label="Website Url"
					placeholder="Enter website url"
					id="site_url"
					type="url"
					errorMessage={errors.site_url?.message}
				/>

				<Button
					className="bg-gradient-to-r from-green-500 via-blue-800 to-gray-600"
					type="submit"
					disabled={isSubmitting || isPending}
				>
					{isSubmitting || isPending ? "Uploading..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
};

export default TenantForm;

"use clients";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import FormInputField from "../form-fields/FormInput";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	DocumentUploadSchema,
	documentUploadSchema,
} from "@/src/schemas/document-upload.schema";
import { Input } from "../ui/input";
import { useCreateDocument } from "@/src/hooks/serivce-hooks/documents.service.hooks";
import FormTextarea from "../form-fields/FormTextarea";

interface IDocumentUploadFormProps {
	tenant_id: number;
	onClose?: () => void;
}
const DocumentUploadForm = ({
	onClose,
	tenant_id,
}: IDocumentUploadFormProps) => {
	const form = useForm<DocumentUploadSchema>({
		resolver: zodResolver(documentUploadSchema),
	});
	const {
		control,
		formState: { isSubmitting, errors },
		handleSubmit,
		setValue,
		reset,
	} = form;
	const { mutateAsync, isPending } = useCreateDocument(tenant_id);

	const onSubmit = async (data: DocumentUploadSchema) => {
		mutateAsync({ payload: { ...data, tenant_id } }).finally(() => {
			reset();
			onClose && onClose();
		});
	};
	return (
		<Form {...form}>
			<form
				action=""
				onSubmit={handleSubmit(onSubmit)}
				className="w-full flex flex-col gap-8"
			>
				<FormField
					control={control}
					name={"file"}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Document</FormLabel>
							<FormControl>
								<Input
									placeholder="Select file"
									type={"file"}
									accept="application/pdf"
									onChange={(e) => {
										field.onChange(e.target.files?.[0]);
										// document to the name of the uploaded file
										setValue("name", e.target.files?.[0].name!);
									}}
								/>
							</FormControl>
							{errors && <FormMessage />}
						</FormItem>
					)}
				/>
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

export default DocumentUploadForm;

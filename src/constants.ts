export const heroItems: { title: string; description: string }[] = [
	{
		title: "Multi-tenant RAG",
		description:
			"This RAG system allows you asking questions across different uploaded documents. All you need is to select a document you wish to ask question about and start sending your prompt.",
	},
	{
		title: "Why multi-tenant",
		description: `The concept of multi-tenant is used by chatbot to allows interaction with multiple, 
                        independent and isolated knowledge sources. For example, a company might have an information for the consumption
					    of its staffs ad another one solely for its customers. In such a
						case, you would not want customers to have access to your private
						information and it is not also a good decision to create a
						separate system for the staffs alone. Using multi-tenant RAG, both
						users can use the system but only have access to information they are allowed to access.`,
	},
];

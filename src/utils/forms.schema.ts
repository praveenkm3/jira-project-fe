import z from "zod";
export const projectSchema = z.object({
  project_name: z
    .string()
    .trim()
    .min(1, "Project Name is required")
    .max(100, "Project Name must be at most 100 characters"),

  project_key: z
    .string()
    .trim()
    .min(1, "Project Key is required")
    .max(20, "Project Key must be at most 20 characters"),

  project_description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters"),

  project_status: z.enum(["ACTIVE", "COMPLETED"]),
});

export const issueFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(200, "Title must be less than 200 characters"),

    description: z
      .string()
      .trim()
      .max(2000, "Description must be less than 2000 characters"),

    status_id: z.string().min(1, "Status is required"),

    priority: z.enum(["Low", "Medium", "High"], {
      message: "Priority is required",
    }),

    type: z.enum(["Bug", "Feature", "Task"], {
      message: "Issue type is required",
    }),

    assignee_id: z.string().min(1, "Assigned user is required"),

    start_date: z.string(),

    due_date: z.string().min(1, "Due date is required"),
  })
  .refine(
    (data) => {
      if (!data.start_date || !data.due_date) return true;

      return data.start_date <= data.due_date;
    },
    {
      message: "Start date cannot be after due date",
      path: ["start_date"],
    },
  );
export type IssueFormSchema = z.infer<typeof issueFormSchema>;

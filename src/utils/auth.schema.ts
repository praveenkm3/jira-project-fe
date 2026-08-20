import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
export const createRegisterSchema =(roles:{ role_id: string; role_name: string }[])=>{
  return z.object({
name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.string().min(1,"Select role"),
  designation_id:z.string().optional()
  })
  .refine(
      (data) => {
        const selectedRole = roles.find(
          (role) => role.role_id === data.role
        );

        if (selectedRole?.role_name.toLowerCase() === "user") {
          return Boolean(data.designation_id?.trim());
        }
        return true;
      },
      {
        message: "Designation is required",
        path: ["designation_id"],
      }
    );
}
  
 
import z from "zod";

export const UserSchema = z.object({
  email: z.string().email("Not a valid email"),
  password: z.string(),
  username: z.string().min(8, {
    message: "Message is required",
  }),
});
export type UserSchemaType = z.infer<typeof UserSchema>;

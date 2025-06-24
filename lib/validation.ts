import * as z from "zod"

export const profileSchema = z.object({
  name: z.string().min(1),
  bio: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  location: z.string().min(1),
})

export type ProfileSchema = z.infer<typeof profileSchema>

'use client'
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileSchema, ProfileSchema } from "@/lib/validation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useToastStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const queryClient = useQueryClient()
  const { setToast } = useToastStore()
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  })

  const {
    data,
    isLoading,
    isError,
  } = useQuery<ProfileSchema>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/api/profile");
    
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch profile. Status: ${res.status}\n${text}`);
      }
    
      return res.json();
    },
  });
  
  useEffect(() => {
    if (data) reset(data)
  }, [data, reset])

  const mutation = useMutation({
    mutationFn: async (data: ProfileSchema) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setToast(true);
      router.push('/'); // ⬅️ Redirect to homepage
    },
  });

  const onSubmit = (formData: ProfileSchema) => {
    mutation.mutate(formData)
  }

  if (isLoading) return <p className="text-center mt-10">Loading...</p>
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load profile. Please try again later.</p>

  return (
    <Card className="max-w-xl mx-auto mt-20 p-4 shadow rounded-lg">
      <CardContent>
        <div className="header-profile mtm-10 rounded-md">
          <h1 className="text-2xl font-bold mb-2">Edit Profile</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" {...register("bio")} />
            {errors.bio && <p className="text-sm text-red-500">{errors.bio.message}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" {...register("location")} />
            {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
          </div>

          <Button type="submit" className="header-profile shadow rounded-md" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>

          {mutation.isError && (
            <p className="text-sm text-red-500 mt-2">Something went wrong. Please try again.</p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

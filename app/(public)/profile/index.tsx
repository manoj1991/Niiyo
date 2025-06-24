
import Link from "next/link"
import { Button } from "@/components/ui/button"
async function getProfile() {
    const res = await fetch('http://localhost:3000/api/profile', {
      cache: 'no-store',
    })
    return res.json()
  }
  
  export default async function ProfilePage() {
    const profile = await getProfile()
  
    return (
      <div className="max-w-xl mx-auto mt-20 p-4 shadow rounded-lg p-6  shadow rounded-lg">
        <div className="header-profile mtm-10 rounded-md">
          <h1 className="text-2xl font-bold mb-2">Profile</h1>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">{profile.name}</h3>
          <p className="mb-1">{profile.bio}</p>
          <p className="mb-1">{profile.email}</p>
          <p className="mb-1">{profile.phone}</p>
          <p>{profile.location}</p>
          <Link className="" href="/edit-profile">
            <Button className="header-profile shadow rounded-md mt-4">Edit Profile</Button>
          </Link>
        </div>


       
      </div>
    )
  }
  
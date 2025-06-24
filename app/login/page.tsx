'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate login logic
    if (email === 'admin@example.com' && password === 'admin') {
      document.cookie = `token=demo-token; path=/` // simulate token
      router.push('/edit-profile') // redirect to protected route
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <Card className="max-w-xl mx-auto mt-20 p-4  rounded-lg p-6  shadow rounded-lg">
      <CardContent>
        <div className="header-profile mtm-10 rounded-md">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-4 mt-8">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
           <p className="text-sm text-gray-500 mt-4">email = admin@example.com || password = admin</p>
          <Button type="submit" className="header-profile shadow rounded-md mt-8">
            Login
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
       
      </CardContent>
    </Card>
  )
}

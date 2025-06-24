'use client'

import { useToastStore } from "@/lib/store"
import { useEffect } from "react"

export default function Toast() {
  const { showToast, setToast } = useToastStore()

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setToast(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showToast, setToast])

  if (!showToast) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-4 py-2 shadow-lg animate-fade-in">
      ✅ Profile updated successfully!
    </div>
  )
}

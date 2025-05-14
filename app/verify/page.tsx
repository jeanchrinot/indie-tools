// File: app/verify/page.tsx
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function VerifyPage() {
  const [key, setKey] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const verifyLicense = async () => {
    if (!key) return
    setError("")
    setLoading(true)
    try {
      const res = await fetch(`https://api.gumroad.com/v2/licenses/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_permalink: "freelancer-invoice-tool", // your real product permalink
          license_key: key,
        }),
      })

      const data = await res.json()
      if (data.success) {
        localStorage.setItem("gumroad_license", key)
        router.push("/invoice")
      } else {
        setError("Invalid license key. Please check and try again.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.")
      console.error("License verification failed:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex-grow flex items-center justify-center px-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Enter your license key</h2>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="input p-2 border rounded mb-2"
        />
        <button
          disabled={loading}
          onClick={verifyLicense}
          className="button w-full"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </main>
  )
}

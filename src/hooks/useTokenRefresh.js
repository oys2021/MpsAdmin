// utils/authHelpers.js

const API_BASE_URL = "http://192.168.103.192:8080"

export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refreshToken")
  if (!refresh) return null

  try {
    const response = await fetch(`${API_BASE_URL}/api/users/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh })
    })

    const data = await response.json()
    if (!response.ok) throw new Error("Refresh failed")

    localStorage.setItem("accessToken", data.access)
    return data.access
  } catch (err) {
    console.error("Failed to refresh token:", err)
    return null
  }
}

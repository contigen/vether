const BASE_URL = `https://api.sensay.io`
const ORG_ID = process.env.SENSAY_ORG_ID

const TOKEN = process.env.SENSAY_API_KEY

export async function ApiClient<T>(
  endpoint: string,
  opts: RequestInit = {}
): Promise<T> {
  if (!TOKEN || !ORG_ID) throw new Error(`Missing API Key or Org ID`)

  const API_BASE_URL = `${BASE_URL}/${endpoint}`
  try {
    const headers: Record<string, string> = {
      'Content-Type': `application/json`,
      'X-ORGANIZATION-SECRET': TOKEN,
      'X-API-Version': '2025-03-25',
      ...((opts.headers as Record<string, string>) || {}),
    }
    const response = await fetch(API_BASE_URL, {
      ...opts,
      headers,
    })
    if (!response.ok) {
      try {
        const errResponse = await response.json()
        console.log(`API Error:`, errResponse)
      } catch {}
      const err = new Error(`HTTP Error`)
      err.name = `Error ${response.status}`
      err.cause = response.statusText
      throw err
    }
    return response.json()
  } catch (err: unknown) {
    throw new Error(err instanceof Error ? err.message : String(err))
  }
}

export async function getApi<T>(endpoint: string): Promise<T> {
  return ApiClient<T>(endpoint, {
    method: 'GET',
  })
}

export async function postApi<T, D = Record<string, unknown>>(
  endpoint: string,
  data?: D,
  headers?: Record<string, string>
): Promise<T> {
  return ApiClient<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
    headers: headers,
  })
}

export async function patchApi<T, D = Record<string, unknown>>(
  endpoint: string,
  data?: D
): Promise<T> {
  return ApiClient<T>(endpoint, {
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  })
}

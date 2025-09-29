import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getStatusColor(status: 'low' | 'medium' | 'high'): string {
  switch (status) {
    case 'low':
      return 'text-green-400'
    case 'medium':
      return 'text-yellow-400'
    case 'high':
      return 'text-red-400'
    default:
      return 'text-muted-foreground'
  }
}

export function getStatusVariant(
  status: 'low' | 'medium' | 'high'
): 'default' | 'secondary' | 'destructive' {
  switch (status) {
    case 'low':
      return 'default'
    case 'medium':
      return 'secondary'
    case 'high':
      return 'destructive'
    default:
      return 'secondary'
  }
}

export async function withTryCatch<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn()
  } catch (err) {
    console.error(err)
    return null
  }
}

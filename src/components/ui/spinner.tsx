'use client'

import { RotatingLines } from 'react-loader-spinner'

export function Spinner({ strokeColor }: { strokeColor?: string }) {
  return (
    <RotatingLines
      strokeColor={strokeColor || '#0e1629'}
      strokeWidth='4'
      width='24'
    />
  )
}

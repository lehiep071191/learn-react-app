import { useRouter } from 'next/router'
import React from 'react'

export default function UserDetail() {
    const userId = useRouter

  return (
    <>{userId}</>
  )
}

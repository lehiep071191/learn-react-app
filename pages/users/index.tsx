import Link from 'next/link'
import React from 'react'

export default function index() {
  return (
    <div>List User

        <Link href="/users/1">
            link user
        </Link>
    </div>
  )
}

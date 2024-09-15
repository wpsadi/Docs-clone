import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingPageProps {
  text?: string
}

export default function LoadingPage({ text = 'Loading...' }: LoadingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-primary" role="status" aria-label="Loading">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
      <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
        {text}
      </p>
    </div>
  )
}
'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"

export function ErrorBoundary({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Unhandled error:', event.error)
      // You can add additional error logging or reporting here
    }

    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-beige-50">
      <div className="text-center max-w-md px-4">
        <h1 className="text-4xl font-bold mb-4 text-olive-800">Oops! Something went wrong</h1>
        <p className="text-xl text-gray-600 mb-8">We're sorry, but an unexpected error occurred.</p>
        <p className="text-gray-500 mb-8">Our team has been notified and we're working to fix the issue.</p>
        <Button 
          className="bg-olive-600 hover:bg-olive-700 text-white"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
      </div>
    </div>
  )
}


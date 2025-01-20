import Link from 'next/link'
import { MoonIcon, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-beige-50">
      <div className="text-center max-w-md px-4">
        <MoonIcon className="w-24 h-24 mx-auto mb-6 text-olive-600" />
        <h1 className="text-4xl font-bold mb-4 text-olive-800">404 - Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">We're sorry, but the page you're looking for doesn't exist or has been moved.</p>
        <p className="text-gray-500 mb-8">Please check the URL or use the button below to return to our homepage.</p>
        <Link href="/" passHref>
          <Button className="bg-olive-600 hover:bg-olive-700 text-white inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}


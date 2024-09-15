import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Create, Edit, and Share Docs in Real-Time
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            DocsFlow is your all-in-one platform for collaborative documentation. Create, update, and share
            documents with your team in real-time.
          </p>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <form className="flex space-x-2">
            <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
            <Button type="submit">Get Started</Button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Start your free trial. No credit card required.
          </p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Hero
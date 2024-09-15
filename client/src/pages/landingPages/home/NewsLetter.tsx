import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

function NewsLetter() {
  return (
<section className="w-full py-12 md:py-24 lg:py-32  flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to streamline your documentation?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of teams already using DocsFlow to improve their workflow.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Get Started</Button>
                </form>
              </div>
            </div>
          </div>
        </section>)
}

export default NewsLetter
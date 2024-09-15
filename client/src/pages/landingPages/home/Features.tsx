import { Clock, Share2, Users } from 'lucide-react'
import React from 'react'

function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800  flex justify-center">
    <div className="container px-4 md:px-6">
      <div className="grid gap-6 items-center">
        <div className="flex flex-col justify-center space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Powerful Features for Seamless Collaboration
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto">
              Discover how DocsFlow can transform your documentation process with our innovative features.
            </p>
          </div>
          <div className="w-full max-w-full space-y-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Clock className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Real-Time Editing</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Collaborate with your team in real-time, seeing changes as they happen.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Team Collaboration</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Invite team members, assign roles, and work together seamlessly.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Share2 className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Easy Sharing</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Share your documents with anyone, anywhere, with customizable permissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Features
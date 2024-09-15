import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/store/authStore"
import {  Github } from "lucide-react"

function Signinpage() {
  const authStore = useAuthStore();
  return (

<>
<div className="fixed w-full top-0">
<Navbar/>
</div>

<main className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-800 min-h-screen">
    <Card className="w-full max-w-md mx-4">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Sign in for DocsFlow</CardTitle>
        <CardDescription className="text-center">
          Choose your preferred method to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full" variant="outline">
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign in with Google [Wont work in deployment]
        </Button>
        <Button className="w-full" variant="outline" onClick={()=>authStore.initiateGitHubAuth()}>
          <Github className="mr-2 h-4 w-4" />
          Sign in with GitHub
        </Button>
        {/* <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          By signing up, you agree to our{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </p> */}
      </CardContent>
    </Card>
  </main>
  <div className="absolute bottom-0 w-full">

  <Footer/>
  </div>

</>
  )
}

export default Signinpage
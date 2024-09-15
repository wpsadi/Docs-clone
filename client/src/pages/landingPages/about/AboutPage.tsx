import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback} from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  Zap, Globe, Shield } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Hero from "./Hero"
function AboutPage() {
  return (
<>
<Navbar/>
<main className="flex-1">
      <Hero/>
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Lightning Fast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Experience real-time updates and seamless collaboration without any lag.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Globe className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Always Accessible</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Access your documents from anywhere, on any device, at any time.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Secure & Private</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Your data is protected with enterprise-grade security and encryption.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Team
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 ">
                <div></div>
              {[
                { name: "Aditya Goel", role: "Creator" },
                // { name: "Bob Smith", role: "CTO" },
                // { name: "Carol Williams", role: "Head of Design" },
              ].map((member) => (
                <Card key={member.name}>
                  <CardHeader>
                    <Avatar className="w-24 h-24 mx-auto">
                        <img src="https://media.licdn.com/dms/image/v2/D5603AQG4QmjQb2Wn1A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722075501182?e=1731542400&v=beta&t=FE-pvrqtrX1ejW5XV4l2YRDZ_y4CPHFKmx055y6DR6I" alt="" />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-center">{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-500 dark:text-gray-400">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Join the DocsFlow Community
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Experience the future of documentation. Start collaborating today.
                </p>
              </div>
              <Button size="lg">Get Started for Free</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
</>
  )
}

export default AboutPage
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileText, Users,  Share2,  Check } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
function PricingPage() {
  return (
  <>
    <Navbar/>
<main className="flex-1">


        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Completely Free, No Strings Attached
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Experience the full power of DocsFlow without any cost. Our platform is and always will be free for everyone.
                </p>
              </div>
              <Button size="lg">Get Started for Free</Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              What's Included
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Unlimited Collaborators</CardTitle>
                  <CardDescription>
                    Invite as many team members as you need.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      No user limits
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      Team-wide access
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      Customizable permissions
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Unlimited Documents</CardTitle>
                  <CardDescription>
                    Create and store as many documents as you need.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      No storage limits
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      Rich text editing
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      Version history
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Share2 className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Full Feature Access</CardTitle>
                  <CardDescription>
                    Access all DocsFlow features without restrictions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      Real-time collaboration
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      Advanced search
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      Integrations
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                 {/* @ts-ignore */}
                <AccordionTrigger>Is DocsFlow really free?</AccordionTrigger>
                <AccordionContent>
                  Yes, DocsFlow is completely free to use. We believe in providing powerful tools for everyone, without any cost barriers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                 {/* @ts-ignore */}
                <AccordionTrigger>Are there any hidden charges?</AccordionTrigger>
                <AccordionContent>
                  No, there are no hidden charges. All features are available for free, and we don't have any paid tiers or premium features.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                {/* @ts-ignore */}
                <AccordionTrigger>How do you sustain the platform if it's free?</AccordionTrigger>
                <AccordionContent>
                  We're committed to keeping DocsFlow free. We operate on a lean model and are supported by grants and donations from organizations that believe in open access to collaborative tools.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                 {/* @ts-ignore */}
                <AccordionTrigger>Is there a limit to how much I can use DocsFlow?</AccordionTrigger>
                <AccordionContent>
                  There are no artificial limits on usage. You can create as many documents, invite as many collaborators, and use as much storage as you need, all for free.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Start Using DocsFlow Today
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of teams already using DocsFlow to improve their documentation process, completely free.
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
        </section>
      </main>
      <Footer/>
  </>
  )
}

export default PricingPage
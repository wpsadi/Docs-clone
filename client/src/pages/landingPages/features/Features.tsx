import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock,  Edit3, History, Lock, Search, Zap } from "lucide-react"

function Features() {
  return (
<>
<section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Clock className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Real-Time Collaboration</CardTitle>
                  <CardDescription>
                    Work together in real-time, seeing changes as they happen.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Multiple team members can edit the same document simultaneously, with changes reflected instantly.
                    Our advanced conflict resolution ensures smooth collaboration.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Edit3 className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Rich Text Editing</CardTitle>
                  <CardDescription>
                    Powerful editing tools for professional documentation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Create beautifully formatted documents with our intuitive rich text editor. Support for markdown,
                    code snippets, and multimedia embeds.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <History className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Version History</CardTitle>
                  <CardDescription>
                    Track changes and revert to previous versions with ease.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Access a complete history of your document's changes. Compare versions, see who made specific edits,
                    and restore previous versions when needed.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Lock className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Advanced Permissions</CardTitle>
                  <CardDescription>
                    Fine-grained access control for your documents.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Set custom permissions for each document or folder. Control who can view, edit, or share your
                    content with role-based access management.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Search className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Powerful Search</CardTitle>
                  <CardDescription>
                    Find what you need quickly and easily.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our advanced search functionality allows you to find documents and specific content within seconds.
                    Filter by date, author, tags, and more.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>
                    Connect with your favorite tools seamlessly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Integrate DocsFlow with popular tools like Slack, Jira, and GitHub. Automate your workflow and keep
                    your documentation in sync with your projects.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to enhance your documentation workflow?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of teams already using DocsFlow to improve their productivity.
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
</>
  )
}

export default Features
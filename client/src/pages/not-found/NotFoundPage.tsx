import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Home, Book, HelpCircle } from "lucide-react";
function NotFoundPage() {
  return (
    <>
      <div className="fixed w-full top-0">
        <Navbar />
      </div>
      <main className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-800 min-h-screen">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 ">
          <h1 className="text-6xl font-bold tracking-tighter">404</h1>
          <p className="text-3xl font-semibold">Page Not Found</p>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-lg">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input
                className="flex-1"
                placeholder="Search DocsFlow"
                type="search"
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline">
              <Home className="mr-2 h-4 w-4" />
              Go to Homepage
            </Button>
            <Button variant="outline">
              <Book className="mr-2 h-4 w-4" />
              Documentation
            </Button>
            <Button variant="outline">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help Center
            </Button>
          </div>
        </div>
      </main>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
}

export default NotFoundPage;

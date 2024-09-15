/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Menu, } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuthStore } from '@/store/authStore'



function Navbar() {
  const authStore = useAuthStore();
  const navItems = [
    { name: 'Features', href: '/features', show: true, className: 'text-sm font-medium hover:underline underline-offset-4' },
    { name: 'Pricing', href: '/pricing', show: true, className: 'text-sm font-medium hover:underline underline-offset-4' },
    { name: 'About', href: '/about', show: true, className: 'text-sm font-medium hover:underline underline-offset-4' },
    // { name: 'Blog', href: '/blog', show: false, className: 'text-sm font-medium hover:underline underline-offset-4' },
    {
      name:"Sign up",
      href:"/signup",
      show:authStore.isLoggedIn == true ? false : true,
      className:"text-sm font-medium hover:underline underline-offset-4"
      
    },
      {
          name:"Sign in",
          href:"/signin",
          show:authStore.isLoggedIn == true ? false : true,
          className:"text-sm font-medium hover:underline underline-offset-4"
      },
      {
          name:"Dashboard",
          href:"/dashboard",  
          show:authStore.isLoggedIn == true ? true : false,
          className:"text-sm font-medium hover:underline underline-offset-4"
      }
  
  ]
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 bg-white border-b">
      <Link className="flex items-center justify-center" to="/">
        <FileText className="h-6 w-6" />
        <span className="ml-2 text-2xl font-bold">DocsFlow</span>
      </Link>
      <nav className="ml-auto hidden md:flex gap-6">
        {navItems.filter(item => item.show).map((item) => (
          <Link key={item.name} className={item.className} to={item.href}>
            {item.name}
          </Link>
        ))}
      </nav>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {/* @ts-ignore */}
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-auto md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[240px] sm:w-[300px]">
          <nav className="flex flex-col gap-4">
            {navItems.filter(item => item.show).map((item) => (
              <Link 
                key={item.name} 
                className={item.className} 
                to={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <Avatar className="ml-4 hidden">
        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </header>
  )
}

export default Navbar
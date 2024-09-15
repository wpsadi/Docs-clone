/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useState, useEffect, useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Menu, Share2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { io, Socket } from "socket.io-client";

const navItems = [
  { name: "Documents", href: "#" },
  { name: "Templates", href: "#" },
  { name: "Settings", href: "#" },
];

const documentMeta = {
  title: "My Review Document",
  createdAt: "17 days ago",
  modifiedAt: "17 hours ago",
  tags: [
    { name: "Document Tag", color: "bg-green-100 text-green-800" },
    { name: "Notes", color: "bg-blue-100 text-blue-800" },
    { name: "Review Doc", color: "bg-purple-100 text-purple-800" },
  ],
};

const comments = [
  {
    author: "Beth Lemke",
    time: "3:45pm",
    content:
      "Hey! Just wanted to let you know that there are some new ideas regarding...",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const linkedDocs = [
  { name: "Name_of_document_here.pdf", icon: "FileText" },
  { name: "Name_of_another_thing_here.pdf", icon: "FileText" },
];

// Header Component

const Header = (
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { toggleSidebar }: { toggleSidebar: () => void }
) => (
  <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
    <div className="flex items-center space-x-4">
      {/* @ts-expect-error */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <div className="flex items-center space-x-2 text-sm text-gray-500 overflow-x-auto">
        {/* <span>Work</span>
        <ChevronDown className="h-4 w-4" />
        <span>Reviews</span>
        <ChevronDown className="h-4 w-4" /> */}
        <span className="font-semibold text-gray-700">
          {documentMeta.title}
        </span>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex space-x-1">
        <Avatar className="w-6 h-6">
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
        <Avatar className="w-6 h-6">
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <Avatar className="w-6 h-6">
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
        <Avatar className="w-6 h-6">
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
      </div>
      <Button variant="ghost" size="icon">
        <Share2 className="h-5 w-5" />
      </Button>
      <Button>Publish</Button>
    </div>
  </header>
);

// Sidebar Component
const Sidebar = () => (
  <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
    <div className="p-4">
      <h2 className="text-xl font-bold">DocumentAI</h2>
    </div>
    <nav className="mt-4">
      {navItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          {item.name}
        </a>
      ))}
    </nav>
  </div>
);

// Main Content Component
const MainContent = () => {
  const [quill, setQuill] = useState<Quill | null>(null);

  const wrapperRef = useCallback((wrapper: HTMLDivElement | null) => {
    if (!wrapper) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, { theme: "snow" });
    setQuill(q);
  }, []);

  useEffect(() => {
    if (!quill) return;
    quill.root.style.height = "1056px"; // Approximately the height of a Google Docs page
    quill.root.style.width = "816px"; // Width of a Google Docs page
  }, [quill]);

  // adding socket connection
  const [SOCKET, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const socket = io("http://localhost:3000");
    setSocket(socket);
    socket.on("connect", () => {
      //  // console.log("connected");
    });
    socket.on("message", (message) => {
      // // console.log(message);
    });
    socket.emit("message", "hello");
    return () => {
      socket.disconnect();
      setSocket(null);
    };
  }, []);

  useEffect(() => {
    if (!quill || !SOCKET) return;
    // // console.log("Setting up quill");
    // @ts-ignore
    const handler = function (delta, oldDelta, source) {
      // // console.log("Text change detected", delta, oldDelta, source);
      if (source !== "user") return;

      // // console.log("A user action triggered this change.");
      SOCKET?.emit("send-changes", delta);
    };

    SOCKET?.on("receive-changes", (delta) => {
      // // console.log("Received changes from server", delta);
      quill.updateContents(delta);
    });
    quill?.on("text-change", handler);

    return () => {
      SOCKET?.off("receive-changes", handler);
    };
  }, [quill, SOCKET]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{documentMeta.title}</h1>
        <p className="text-sm text-gray-500">
          Created {documentMeta.createdAt} · Last modified{" "}
          {documentMeta.modifiedAt}
        </p>
        <div className="flex space-x-2 mt-2">
          {documentMeta.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className={tag.color}>
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        {comments.map((comment, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Avatar>
              <AvatarImage src={comment.avatar} alt={comment.author} />
              <AvatarFallback>{comment.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">
                {comment.author}{" "}
                <span className="text-gray-500 text-sm font-normal">
                  {comment.time}
                </span>
              </p>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div
        ref={wrapperRef}
        className="bg-white border border-gray-200 rounded-lg shadow-sm mx-auto"
      />
    </div>
  );
};

// Linked Documents Component
const LinkedDocs = () => (
  <div className="p-6 border-l border-gray-200">
    <h3 className="text-lg font-semibold mb-4">Linked Docs</h3>
    <ul className="space-y-2">
      {linkedDocs.map((doc, index) => (
        <li key={index} className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{doc.name}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Main Document Editor Component
export default function DocumentEditor() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-white">
      <Sheet>
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex">
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <div className="flex-grow overflow-auto">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-grow">
                <MainContent />
              </div>
              <div className="w-full lg:w-64 hidden lg:block">
                <LinkedDocs />
              </div>
            </div>
          </div>
        </div>
      </Sheet>
    </div>
  );
}

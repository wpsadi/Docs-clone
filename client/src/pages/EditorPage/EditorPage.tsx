import { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import "react-quill/dist/quill.snow.css";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Save, Users, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDocStore } from "@/store/docStore";
import { useToast } from "@/hooks/use-toast";
import { useSocketStore } from "@/store/socketStore";
import Quill from "quill";

const intervalTime = 1000;
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    // ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default function DocumentEditorPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const docStore = useDocStore();
  const socketStore = useSocketStore();
  const context = useOutletContext<{
    title: string;
    content: unknown;
    id: string;
    key: string;
  }>();
  const socket = socketStore.socket;
  // console.log(context)
  // const content = useState(() => context.content || "")[0];
  const [title, setTitle] = useState(
    () => context.title || "Unable to Load Name"
  );
  const [collaborators, setCollaborators] = useState(1);
  const [isTitleDialogOpen, setIsTitleDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [showStartSave, setShowStartSave] = useState(false);
  // const quillRef = useRef(null)

  useEffect(() => {
    // Simulating fetching document data and collaborators
    // Replace this with actual API calls in a real application
    setTimeout(() => {
      // setContent('<p>Welcome to your new document!</p>')
      setCollaborators(Math.floor(Math.random() * 5) + 1);
    }, 1000);
  }, []);

  const handleSave = () => {
    // Implement save functionality here
    // console.log('Saving document:', { title, content })
  };

  const openTitleDialog = () => {
    setNewTitle(title);
    setIsTitleDialogOpen(true);
  };

  const handleTitleUpdate = async () => {
    // console.log('Updating title:', { title, newTitle })
    let success = true;
    await docStore.updateTitle(context.id, context.key, newTitle).catch(() => {
      success = false;
    });
    if (!success)
      return toast.toast({
        title: "Failed to update title",
        description: "An error occurred while updating the document title",
      });
    socket?.emit("update-doc-title", { id: context.id, title: newTitle });
    setTitle(newTitle);

    setIsTitleDialogOpen(false);
  };

  const handleDelete = async () => {
    // Implement delete functionality here
    // // console.log('Updating title:', { title, newTitle })
    let success = true;
    let authorizationIssue = false;
    await docStore.deleteDoc(context.id, context.key).catch((e) => {
      if (e.message == "Only the owner can delete the document") {
        authorizationIssue = true;
      }
      success = false;
    });
    if (authorizationIssue)
      return toast.toast({
        title: "Failed to delete",
        description: "Only the owner can delete the document",
      });
    if (!success)
      return toast.toast({
        title: "Failed to ",
        description: "An error occurred while updating the document title",
      });
    // // console.log('Deleting document:', { title })

    socket?.emit("del-doc", { id: context.id });

    setIsDeleteDialogOpen(false);
    navigate("/dashboard");
  };

  useEffect(() => {
    socket?.on("delete-doc", () => {
      toast.toast({
        title: "Document Deleted",
        description: "The document has been deleted by the owner",
      });
      navigate("/dashboard");
    });
  }, [socket]);

  useEffect(() => {
    // join-doc-room
    socket?.emit("join-doc-room", context.id);
  }, [socket]);

  // updating the title from the server
  useEffect(() => {
    socket?.on("update-doc-title", (data: string) => {
      // console.log("Title updated")
      toast.toast({
        title: "Title updated",
        description: "Title has been updated",
      });
      // console.log(data)
      setTitle(data);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("update-realtime-collaborators", (data) => {
      // console.log("Collaborators updated")
      toast.toast({
        title: "Collaborators updated",
        description: "Collaborators have been updated",
      });
      setCollaborators(data);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("join-doc-error", () => {
      // console.log("Error joining the document room")
      toast.toast({
        title: "Error",
        description: "Error joining the document room",
      });
    });
  }, [socket]);

  useEffect(() => {
    socketStore.createConnection(context.id, context.key);

    return () => {
      socket?.emit("leave-doc", context.id);
      socketStore.closeSocket();
    };
  }, []);

  const [quill, setQuill] = useState<Quill | null>(null);

  const wrapperRef = useCallback((wrapper: HTMLDivElement | null) => {
    if (!wrapper) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, { theme: "snow", modules, formats });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    q.setContents(context.content as any);
    setShowStartSave(true);
    setQuill(q);
  }, []);
  useEffect(() => {
    if (!quill || !socket) return;
    // console.log("Setting up quill");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handler = function (delta, oldDelta, source) {
      // console.log("Text change detected", delta, oldDelta, source);
      if (source !== "user") return;

      // console.log("A user action triggered this change.");
      socket?.emit("send-changes", {
        delta,
        id: context.id,
      });
    };

    // console.log("Setting content",content)
    // quill.setText(content)

    socket?.on("receive-changes", (delta) => {
      // console.log("Received changes from server", delta);
      quill.updateContents(delta);
    });
    quill?.on("text-change", handler);

    return () => {
      socket?.off("receive-changes", handler);
    };
  }, [quill, socket]);

  // saving the content
  useEffect(() => {
    if (!quill || !socket) return;

    if (showStartSave) {
      setInterval(() => {
        socket?.emit("update-content", {
          id: context.id,
          key: context.key,
          content: quill.getContents(),
        });
      }, intervalTime);
    }
  }, [socket, quill, showStartSave]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                className="ml-4 text-xl font-semibold"
                onClick={openTitleDialog}
              >
                {title}
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Users className="h-5 w-5 mr-1" />
                <span>{collaborators}</span>
              </div>
              <Button
                onClick={() => {
                  navigate(`/doc/${context.id}/view`);
                }}
                className="bg-white border-solid border-black border-2 hover:bg-black text-black hover:text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                {/* View */}
              </Button>
              <Button onClick={handleSave} className="hidden">
                <Save className="h-4 w-4 mr-2" />
                {/* Save */}
              </Button>
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {/* Delete */}
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full p-4">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg h-full">
            {/* {
          
          <ReactQuill
              modules={modules}
              formats={formats}
              theme="snow"
              value={content}
              onChange={setContent}
              className="h-full"
              ref={quillRef}
            />
          } */}
            <div ref={wrapperRef} className="h-full" />
          </div>
        </div>
      </main>
      <Dialog open={isTitleDialogOpen} onOpenChange={setIsTitleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Document Title</DialogTitle>
          </DialogHeader>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter new title"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsTitleDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleTitleUpdate}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete this document? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

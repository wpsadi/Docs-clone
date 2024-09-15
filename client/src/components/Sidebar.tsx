import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FilePlus, FileText, LogOut, Menu } from 'lucide-react'
import { Link} from 'react-router-dom'
import { useDocStore } from '@/store/docStore';

type SidebarProps = {
  onLogout: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation();
  const docStore = useDocStore();


  return (
    <div className={`bg-gray-100 dark:bg-gray-800 h-screen flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <span className="text-2xl font-bold">DocsFlow</span>}
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        <nav className="space-y-2 p-2">
          <Link to="/dashboard">
            <Button variant="ghost" className={`w-full justify-start ${location.pathname === '/dashboard' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
              <FileText className="mr-2 h-4 w-4" />
              {!isCollapsed && 'Documents'}
            </Button>
          </Link>
          <span onClick={()=>docStore.createNewDoc()}>
            <Button variant="ghost" className={`w-full justify-start ${location.pathname === '/new-doc' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            <FilePlus className="mr-2 h-4 w-4" />
              
              {!isCollapsed && 'Create Document'}
            </Button>
          </span>
        </nav>
      </ScrollArea>
      <div className="p-4">
        <Button variant="ghost" className="w-full justify-start text-red-600" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          {!isCollapsed && 'Logout'}
        </Button>
      </div>
    </div>
  )
}
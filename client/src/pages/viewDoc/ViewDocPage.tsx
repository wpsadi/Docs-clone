import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DocumentViewPage() {
  const navigate = useNavigate()
  const context = useOutletContext<{
    title: string
    content: string
    id: string
  }>()
  const [content, setContent] = useState(context.content || '')
  const [title, setTitle] = useState(context.title || 'Unable to Load Name')

  useEffect(() => {
    // Update content and title when context changes
    setContent(context.content || '')
    setTitle(context.title || 'Unable to Load Name')
  }, [context])

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <h1 className="ml-4 text-xl font-semibold">{title}</h1>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full p-4">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg h-full">
            <ReactQuill
              value={content}
              readOnly={true}
              theme="snow"
              modules={{ toolbar: false }}
              className="h-full"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
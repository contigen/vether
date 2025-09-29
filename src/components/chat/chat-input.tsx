import { Send, Paperclip, FileText, Search, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { UploadedFile } from '@/types'
import { formatFileSize } from '@/lib/utils'
import { VALID_FILE_TYPES, MAX_FILE_SIZE } from '@/lib/constants'

interface ChatInputProps {
  inputValue: string
  setInputValue: (value: string) => void
  uploadedFiles: UploadedFile[]
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>
  isDragOver: boolean
  setIsDragOver: (isDragOver: boolean) => void
  isLoading: boolean
  onSendMessage: () => void
  onSuggestionClick: (suggestion: string) => void
}

export function ChatInput({
  inputValue,
  setInputValue,
  uploadedFiles,
  setUploadedFiles,
  isDragOver,
  setIsDragOver,
  isLoading,
  onSendMessage,
  onSuggestionClick,
}: ChatInputProps) {
  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (
        !VALID_FILE_TYPES.includes(
          file.type as (typeof VALID_FILE_TYPES)[number]
        )
      ) {
        alert(
          `File type ${file.type} is not supported. Please upload PDF, Word, image, or text files.`
        )
        return
      }

      if (file.size > MAX_FILE_SIZE) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`)
        return
      }

      const newFile: UploadedFile = {
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        uploadProgress: 0,
      }

      setUploadedFiles((prev: UploadedFile[]) => [...prev, newFile])

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadedFiles((prev: UploadedFile[]) =>
          prev.map((f: UploadedFile) =>
            f.id === newFile.id
              ? {
                  ...f,
                  uploadProgress: Math.min((f.uploadProgress || 0) + 10, 100),
                }
              : f
          )
        )
      }, 100)

      setTimeout(() => {
        clearInterval(interval)
        setUploadedFiles((prev: UploadedFile[]) =>
          prev.map((f: UploadedFile) =>
            f.id === newFile.id ? { ...f, uploadProgress: 100 } : f
          )
        )
      }, 1000)
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev: UploadedFile[]) =>
      prev.filter((f: UploadedFile) => f.id !== fileId)
    )
  }

  return (
    <div
      className='border-t border-border/40 bg-background/80 backdrop-blur-sm relative'
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className='container max-w-4xl py-4'>
        {uploadedFiles.length > 0 && (
          <div className='mb-4 space-y-2'>
            <div className='text-sm font-medium text-muted-foreground'>
              Attached Files:
            </div>
            <div className='space-y-2'>
              {uploadedFiles.map(file => (
                <div
                  key={file.id}
                  className='flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gold/0.05 to-gold/[0.1] border border-gold/[0.2]'
                >
                  <FileText className='size-4 text-gold flex-shrink-0' />
                  <div className='flex-1 min-w-0'>
                    <div className='text-sm font-medium truncate'>
                      {file.name}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      {formatFileSize(file.size)}
                    </div>
                    {file.uploadProgress !== undefined &&
                      file.uploadProgress < 100 && (
                        <Progress
                          value={file.uploadProgress}
                          className='mt-1 h-1'
                        />
                      )}
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => removeFile(file.id)}
                    className='size-6 p-0 hover:bg-red-500/10 hover:text-red-400'
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {isDragOver && (
          <div className='absolute inset-0 bg-gold/10 border-2 border-dashed border-gold rounded-lg flex items-center justify-center z-10'>
            <div className='text-center'>
              <FileText className='size-8 text-gold mx-auto mb-2' />
              <div className='text-sm font-medium text-gold'>
                Drop files here to upload
              </div>
              <div className='text-xs text-muted-foreground'>
                PDF, Word, Images, Text files supported
              </div>
            </div>
          </div>
        )}

        <div className='flex gap-3 items-end'>
          <div className='flex-1 relative'>
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={
                isLoading
                  ? 'AI is thinking...'
                  : 'Ask about property risks, legal compliance, contract review...'
              }
              className='pr-12 min-h-[44px] resize-none border-border/40 focus:border-[hsl(var(--gold))/0.5]'
              disabled={isLoading}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                  e.preventDefault()
                  onSendMessage()
                }
              }}
            />
            <label className='absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted/50 cursor-pointer transition-colors'>
              <Paperclip className='size-4' />
              <input
                type='file'
                multiple
                accept='.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt'
                onChange={e =>
                  e.target.files && handleFileUpload(e.target.files)
                }
                className='hidden'
              />
            </label>
          </div>
          <Button
            onClick={onSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className='bg-gold hover:bg-gold/90 text-black h-[44px] px-6'
          >
            {isLoading ? (
              <div className='size-4 animate-spin rounded-full border-2 border-black border-t-transparent' />
            ) : (
              <Send className='size-4' />
            )}
          </Button>
        </div>

        <div className='flex gap-2 mt-3 flex-wrap'>
          <Button
            variant='outline'
            size='sm'
            className='text-xs border-border/40 hover:bg-gradient-to-r hover:from-gold/[0.1] hover:to-gold/[0.05] bg-transparent transition-all duration-300 hover:border-gold/[0.4] hover:shadow-md hover:shadow-gold/[0.1]'
            onClick={() =>
              onSuggestionClick(
                'Analyze 456 Oak Avenue for investment risks and legal compliance issues'
              )
            }
          >
            <Search className='size-3 mr-1' />
            Try property lookup
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='text-xs border-border/40 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-blue-500/5 bg-transparent transition-all duration-300 hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-500/10'
            onClick={() =>
              onSuggestionClick(
                'Generate a residential purchase agreement with standard contingencies'
              )
            }
          >
            <FileText className='size-3 mr-1' />
            Generate contract
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='text-xs border-border/40 hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-emerald-500/5 bg-transparent transition-all duration-300 hover:border-emerald-500/40 hover:shadow-md hover:shadow-emerald-500/10'
            onClick={() =>
              onSuggestionClick(
                'Check compliance alerts and fraud indicators for my property transaction'
              )
            }
          >
            <AlertCircle className='size-3 mr-1' />
            Check compliance
          </Button>
        </div>
      </div>
    </div>
  )
}

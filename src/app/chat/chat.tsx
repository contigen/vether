'use client'

import { ChatHeader, MessageBubble, ChatInput } from '@/components/chat'
import { ChatIndicator } from '@/components/chat-indicator'
import { useChat } from '@/hooks/useChat'

export function Chat({ id }: { id: string }) {
  const {
    messages,
    inputValue,
    setInputValue,
    uploadedFiles,
    setUploadedFiles,
    isDragOver,
    setIsDragOver,
    isLoading,
    userRole,
    messagesEndRef,
    handleQuickAction,
    handleSuggestionClick,
    handleSendMessage,
  } = useChat(id)

  return (
    <div className='flex flex-col h-screen bg-background'>
      <ChatHeader userRole={userRole} />

      <div className='flex-1 overflow-y-auto'>
        <div className='container max-w-4xl py-6 space-y-6'>
          {messages.map(message => (
            <MessageBubble
              key={message.id}
              message={message}
              onQuickAction={handleQuickAction}
              userRole={userRole}
            />
          ))}
          {isLoading && <ChatIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
        isDragOver={isDragOver}
        setIsDragOver={setIsDragOver}
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
        onSuggestionClick={handleSuggestionClick}
      />
    </div>
  )
}

import { useState } from 'react';
import { Send, Search, MoreVertical } from 'lucide-react';
import { ChatConversation, Student } from '../types';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface ChatPageProps {
  conversations: ChatConversation[];
  students: Student[];
  currentUserId: string;
}

export function ChatPage({ conversations, students, currentUserId }: ChatPageProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>(conversations[0]?.id || null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ [key: string]: any[] }>({
    chat1: [
      {
        id: '1',
        senderId: '1',
        content: 'Hey! Want to team up for the hackathon?',
        timestamp: '2025-11-01T09:00:00Z',
        isOwn: false
      },
      {
        id: '2',
        senderId: 'current',
        content: 'Yeah, that sounds great! What tech stack are you thinking?',
        timestamp: '2025-11-01T09:15:00Z',
        isOwn: true
      },
      {
        id: '3',
        senderId: '1',
        content: 'I was thinking React + Python for ML. I can handle the ML part.',
        timestamp: '2025-11-01T09:20:00Z',
        isOwn: false
      },
      {
        id: '4',
        senderId: 'current',
        content: 'Perfect! I\'ll work on the frontend then. When should we start?',
        timestamp: '2025-11-01T09:25:00Z',
        isOwn: true
      },
      {
        id: '5',
        senderId: '1',
        content: 'How about tomorrow? We can meet in the computer lab.',
        timestamp: '2025-11-01T09:30:00Z',
        isOwn: false
      }
    ],
    chat2: [
      {
        id: '1',
        senderId: '2',
        content: 'Thanks for the UI feedback on my project!',
        timestamp: '2025-10-31T16:00:00Z',
        isOwn: false
      },
      {
        id: '2',
        senderId: 'current',
        content: 'No problem! The design looks great. Love the color scheme.',
        timestamp: '2025-10-31T16:15:00Z',
        isOwn: true
      },
      {
        id: '3',
        senderId: '2',
        content: 'I used Figma for the mockups. Happy to share the file if you want!',
        timestamp: '2025-10-31T16:20:00Z',
        isOwn: false
      }
    ],
    chat3: [
      {
        id: '1',
        senderId: '3',
        content: 'Can you help me with that DP problem?',
        timestamp: '2025-10-30T14:00:00Z',
        isOwn: false
      },
      {
        id: '2',
        senderId: 'current',
        content: 'Sure! Which problem is it?',
        timestamp: '2025-10-30T14:10:00Z',
        isOwn: true
      },
      {
        id: '3',
        senderId: '3',
        content: 'The longest increasing subsequence one from yesterday\'s contest.',
        timestamp: '2025-10-30T14:15:00Z',
        isOwn: false
      }
    ]
  });

  const selectedConversation = conversations.find(c => c.id === selectedChat);
  const chatMessages = selectedChat ? messages[selectedChat] || [] : [];

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content: message,
      timestamp: new Date().toISOString(),
      isOwn: true
    };

    setMessages({
      ...messages,
      [selectedChat]: [...(messages[selectedChat] || []), newMessage]
    });
    setMessage('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50">
      <div className="h-full max-w-7xl mx-auto flex">
        {/* Conversations List */}
        <div className="w-full md:w-80 bg-white border-r flex flex-col">
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search messages..."
                className="pl-9"
              />
            </div>
          </div>

          {/* Conversation List */}
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {conversations.map(conversation => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    selectedChat === conversation.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.participantAvatar} />
                        <AvatarFallback>{conversation.participantName[0]}</AvatarFallback>
                      </Avatar>
                      {conversation.unread > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-gray-900 truncate">{conversation.participantName}</p>
                        <span className="text-xs text-gray-500">
                          {formatDate(conversation.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col bg-white hidden md:flex">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedConversation.participantAvatar} />
                  <AvatarFallback>{selectedConversation.participantName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-gray-900">{selectedConversation.participantName}</p>
                  <p className="text-sm text-green-600">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((msg, index) => {
                  const showDate = index === 0 || 
                    formatDate(msg.timestamp) !== formatDate(chatMessages[index - 1].timestamp);

                  return (
                    <div key={msg.id}>
                      {showDate && (
                        <div className="flex justify-center my-4">
                          <Badge variant="outline" className="text-xs">
                            {formatDate(msg.timestamp)}
                          </Badge>
                        </div>
                      )}
                      <div className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                          <div
                            className={`rounded-lg p-3 ${
                              msg.isOwn
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="break-words">{msg.content}</p>
                          </div>
                          <p className={`text-xs text-gray-500 mt-1 ${msg.isOwn ? 'text-right' : 'text-left'}`}>
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 hidden md:flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

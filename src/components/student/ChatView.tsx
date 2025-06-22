
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Search, Phone, Video, MoreVertical } from 'lucide-react';

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
}

interface ChatContact {
  id: number;
  name: string;
  role: 'faculty' | 'student';
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

const ChatView = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const contacts: ChatContact[] = [
    {
      id: 1,
      name: "Dr. Smith (Mathematics)",
      role: "faculty",
      avatar: "/placeholder.svg",
      lastMessage: "The assignment deadline has been extended to next week.",
      timestamp: "2 min ago",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Prof. Johnson (Physics)",
      role: "faculty",
      avatar: "/placeholder.svg",
      lastMessage: "Please review the lab manual before tomorrow's session.",
      timestamp: "1 hour ago",
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: "Study Group - CS",
      role: "student",
      avatar: "/placeholder.svg",
      lastMessage: "Anyone free for group study this evening?",
      timestamp: "3 hours ago",
      unread: 5,
      online: true
    },
    {
      id: 4,
      name: "Dr. Brown (Chemistry)",
      role: "faculty",
      avatar: "/placeholder.svg",
      lastMessage: "Good work on your recent test!",
      timestamp: "1 day ago",
      unread: 0,
      online: true
    }
  ];

  const messages: ChatMessage[] = [
    {
      id: 1,
      sender: "Dr. Smith",
      message: "Hello! I hope you're doing well with the current coursework.",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      message: "Hello Dr. Smith! Yes, I'm keeping up. I had a question about the integration problems in chapter 5.",
      timestamp: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Dr. Smith",
      message: "Of course! Which specific problem are you having trouble with?",
      timestamp: "10:33 AM",
      isOwn: false
    },
    {
      id: 4,
      sender: "You",
      message: "Problem 5.3 - I'm not sure how to approach the substitution method here.",
      timestamp: "10:35 AM",
      isOwn: true
    },
    {
      id: 5,
      sender: "Dr. Smith",
      message: "The assignment deadline has been extended to next week. This should give you more time to work through these problems.",
      timestamp: "10:45 AM",
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message sending logic here
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const selectedContact = contacts.find(c => c.id === selectedChat);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Messages</h2>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {contacts.reduce((sum, contact) => sum + contact.unread, 0)} Unread
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Contacts List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedChat(contact.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                    selectedChat === contact.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback>
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{contact.name}</p>
                        <span className="text-xs text-gray-500">{contact.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant={contact.role === 'faculty' ? 'default' : 'secondary'} className="text-xs">
                          {contact.role}
                        </Badge>
                        {contact.unread > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {contact.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedContact ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedContact.avatar} />
                      <AvatarFallback>
                        {selectedContact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedContact.name}</p>
                      <p className="text-sm text-gray-600">
                        {selectedContact.online ? 'Online' : 'Last seen recently'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex flex-col h-[400px]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.isOwn
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <p>Select a conversation to start chatting</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ChatView;


import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Book, Search, Download, Calendar, Clock } from 'lucide-react';

interface LibraryBook {
  id: number;
  title: string;
  author: string;
  subject: string;
  isbn: string;
  status: 'available' | 'issued' | 'reserved';
  dueDate?: string;
  issueDate?: string;
}

interface DigitalResource {
  id: number;
  title: string;
  type: 'pdf' | 'video' | 'audio';
  subject: string;
  size: string;
  downloads: number;
}

const LibraryView = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const issuedBooks: LibraryBook[] = [
    {
      id: 1,
      title: "Advanced Mathematics",
      author: "Dr. John Smith",
      subject: "Mathematics",
      isbn: "978-0123456789",
      status: "issued",
      issueDate: "2024-01-10",
      dueDate: "2024-02-10"
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      author: "Prof. Jane Doe",
      subject: "Physics",
      isbn: "978-0987654321",
      status: "issued",
      issueDate: "2024-01-15",
      dueDate: "2024-02-15"
    }
  ];

  const availableBooks: LibraryBook[] = [
    {
      id: 3,
      title: "Organic Chemistry",
      author: "Dr. Michael Brown",
      subject: "Chemistry",
      isbn: "978-0456789123",
      status: "available"
    },
    {
      id: 4,
      title: "Data Structures and Algorithms",
      author: "Prof. Sarah Wilson",
      subject: "Computer Science",
      isbn: "978-0321654987",
      status: "available"
    },
    {
      id: 5,
      title: "Linear Algebra",
      author: "Dr. Robert Johnson",
      subject: "Mathematics",
      isbn: "978-0789123456",
      status: "reserved"
    }
  ];

  const digitalResources: DigitalResource[] = [
    {
      id: 1,
      title: "Calculus Tutorial Series",
      type: "video",
      subject: "Mathematics",
      size: "2.5 GB",
      downloads: 156
    },
    {
      id: 2,
      title: "Physics Lab Manual",
      type: "pdf",
      subject: "Physics",
      size: "45 MB",
      downloads: 89
    },
    {
      id: 3,
      title: "Chemistry Lecture Notes",
      type: "pdf",
      subject: "Chemistry",
      size: "12 MB",
      downloads: 234
    },
    {
      id: 4,
      title: "Programming Basics Audio",
      type: "audio",
      subject: "Computer Science",
      size: "150 MB",
      downloads: 67
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'issued': return 'bg-blue-500';
      case 'reserved': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'video': return '🎥';
      case 'audio': return '🎵';
      default: return '📁';
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Library Portal</h2>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          Books Issued: {issuedBooks.length}
        </Badge>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search books, authors, or subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Currently Issued Books */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            Currently Issued Books
          </CardTitle>
          <CardDescription>Books you have borrowed from the library</CardDescription>
        </CardHeader>
        <CardContent>
          {issuedBooks.length > 0 ? (
            <div className="space-y-4">
              {issuedBooks.map((book) => {
                const daysRemaining = getDaysRemaining(book.dueDate!);
                const progressValue = Math.max(0, Math.min(100, ((30 - daysRemaining) / 30) * 100));
                
                return (
                  <div key={book.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{book.title}</h3>
                        <p className="text-sm text-gray-600">by {book.author}</p>
                        <Badge variant="outline" className="mt-1">{book.subject}</Badge>
                      </div>
                      <Badge className={getStatusColor(book.status)}>
                        {book.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Issued: {book.issueDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Due: {book.dueDate}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Days remaining</span>
                          <span className={daysRemaining <= 3 ? 'text-red-600 font-medium' : 'text-gray-600'}>
                            {daysRemaining > 0 ? `${daysRemaining} days` : 'Overdue'}
                          </span>
                        </div>
                        <Progress 
                          value={progressValue} 
                          className={`h-2 ${daysRemaining <= 3 ? 'bg-red-100' : ''}`}
                        />
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline">Renew</Button>
                        <Button size="sm" variant="outline">Return</Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No books currently issued</p>
          )}
        </CardContent>
      </Card>

      {/* Available Books */}
      <Card>
        <CardHeader>
          <CardTitle>Available Books</CardTitle>
          <CardDescription>Browse and reserve books from the library</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableBooks.map((book) => (
              <div key={book.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold">{book.title}</h3>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                    <Badge variant="outline" className="mt-1">{book.subject}</Badge>
                  </div>
                  <Badge className={getStatusColor(book.status)}>
                    {book.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mb-3">ISBN: {book.isbn}</p>
                <div className="flex gap-2">
                  {book.status === 'available' && (
                    <>
                      <Button size="sm">Reserve</Button>
                      <Button size="sm" variant="outline">View Details</Button>
                    </>
                  )}
                  {book.status === 'reserved' && (
                    <Button size="sm" variant="outline" disabled>Reserved</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Digital Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Digital Resources</CardTitle>
          <CardDescription>Download study materials and resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {digitalResources.map((resource) => (
              <div key={resource.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold">{resource.title}</h3>
                    <Badge variant="outline" className="mt-1">{resource.subject}</Badge>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span>Size: {resource.size}</span>
                      <span>Downloads: {resource.downloads}</span>
                    </div>
                    <Button size="sm" className="mt-3 flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LibraryView;

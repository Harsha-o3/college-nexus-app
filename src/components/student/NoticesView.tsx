
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, Download, ExternalLink } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  category: 'Academic' | 'Administrative' | 'Event' | 'Exam';
  hasAttachment?: boolean;
}

const NoticesView = () => {
  const notices: Notice[] = [
    {
      id: 1,
      title: 'Mid-term Examination Schedule Released',
      description: 'The mid-term examination schedule for all subjects has been released. Please check your respective timetables and prepare accordingly.',
      date: '2024-01-20',
      priority: 'high',
      category: 'Exam',
      hasAttachment: true
    },
    {
      id: 2,
      title: 'Library New Books Available',
      description: 'New collection of computer science and mathematics books are now available in the library. Students can issue them from tomorrow.',
      date: '2024-01-18',
      priority: 'medium',
      category: 'Academic'
    },
    {
      id: 3,
      title: 'Annual Sports Day Registration',
      description: 'Registration for the Annual Sports Day is now open. Interested students can register at the sports office or online portal.',
      date: '2024-01-15',
      priority: 'low',
      category: 'Event',
      hasAttachment: true
    },
    {
      id: 4,
      title: 'Fee Payment Deadline Reminder',
      description: 'This is a reminder that the semester fee payment deadline is approaching. Please ensure timely payment to avoid late fees.',
      date: '2024-01-12',
      priority: 'high',
      category: 'Administrative'
    },
    {
      id: 5,
      title: 'Guest Lecture on Artificial Intelligence',
      description: 'A guest lecture on "Future of Artificial Intelligence" by Dr. Smith will be conducted next week. All CS students are encouraged to attend.',
      date: '2024-01-10',
      priority: 'medium',
      category: 'Academic'
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge variant="default">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="secondary">Low Priority</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Exam':
        return 'text-red-600 bg-red-50';
      case 'Academic':
        return 'text-blue-600 bg-blue-50';
      case 'Event':
        return 'text-green-600 bg-green-50';
      case 'Administrative':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notices & Announcements</h2>
        <Badge variant="outline" className="text-lg px-3 py-1">
          {notices.length} Total Notices
        </Badge>
      </div>

      <div className="space-y-4">
        {notices.map((notice) => (
          <Card key={notice.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Bell className="h-4 w-4 text-blue-500" />
                    <Badge className={getCategoryColor(notice.category)}>
                      {notice.category}
                    </Badge>
                    {getPriorityBadge(notice.priority)}
                  </div>
                  <CardTitle className="text-lg">{notice.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                    <Calendar className="h-3 w-3" />
                    <span>{notice.date}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base mb-4">
                {notice.description}
              </CardDescription>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  {notice.hasAttachment && (
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  Posted {Math.floor(Math.random() * 5) + 1} days ago
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NoticesView;

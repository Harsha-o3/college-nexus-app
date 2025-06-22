
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Bell, BarChart3 } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
}

interface StudentDashboardProps {
  user: User;
  activeSection: string;
}

const StudentDashboard = ({ user, activeSection }: StudentDashboardProps) => {
  // Mock data
  const attendanceData = {
    overall: 85,
    subjects: [
      { name: 'Mathematics', attendance: 90, total: 40, present: 36 },
      { name: 'Physics', attendance: 88, total: 35, present: 31 },
      { name: 'Chemistry', attendance: 82, total: 38, present: 31 },
      { name: 'Computer Science', attendance: 95, total: 42, present: 40 },
    ]
  };

  const recentMarks = [
    { subject: 'Mathematics', type: 'Internal', marks: 42, total: 50, date: '2024-01-15' },
    { subject: 'Physics', type: 'Assignment', marks: 18, total: 20, date: '2024-01-12' },
    { subject: 'Chemistry', type: 'Quiz', marks: 8, total: 10, date: '2024-01-10' },
  ];

  const notices = [
    { title: 'Mid-term Exam Schedule', date: '2024-01-20', urgent: true },
    { title: 'Library New Books Available', date: '2024-01-18', urgent: false },
    { title: 'Sports Day Registration', date: '2024-01-15', urgent: false },
  ];

  if (activeSection !== 'dashboard') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">
          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} section coming soon...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Overall Attendance</p>
                <p className="text-3xl font-bold">{attendanceData.overall}%</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Average Marks</p>
                <p className="text-3xl font-bold">78%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Assignments</p>
                <p className="text-3xl font-bold">5</p>
                <p className="text-xs text-purple-200">Pending</p>
              </div>
              <FileText className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">New Notices</p>
                <p className="text-3xl font-bold">3</p>
              </div>
              <Bell className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Subject-wise attendance tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceData.subjects.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{subject.name}</span>
                    <span className="text-sm text-gray-600">
                      {subject.present}/{subject.total} ({subject.attendance}%)
                    </span>
                  </div>
                  <Progress 
                    value={subject.attendance} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Marks */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Marks</CardTitle>
            <CardDescription>Latest assessment results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMarks.map((mark, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{mark.subject}</p>
                    <p className="text-sm text-gray-600">{mark.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {mark.marks}/{mark.total}
                    </p>
                    <p className="text-sm text-gray-500">{mark.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Notices */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notices</CardTitle>
          <CardDescription>Important announcements and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notices.map((notice, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Bell className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="font-medium">{notice.title}</p>
                    <p className="text-sm text-gray-600">{notice.date}</p>
                  </div>
                </div>
                {notice.urgent && (
                  <Badge variant="destructive">Urgent</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;

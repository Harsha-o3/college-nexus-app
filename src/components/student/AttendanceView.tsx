
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

interface AttendanceRecord {
  id: number;
  subject: string;
  date: string;
  status: 'present' | 'absent';
  time: string;
}

const AttendanceView = () => {
  const attendanceData = {
    overall: 85,
    subjects: [
      { name: 'Mathematics', attendance: 90, total: 40, present: 36 },
      { name: 'Physics', attendance: 88, total: 35, present: 31 },
      { name: 'Chemistry', attendance: 82, total: 38, present: 31 },
      { name: 'Computer Science', attendance: 95, total: 42, present: 40 },
    ]
  };

  const recentAttendance: AttendanceRecord[] = [
    { id: 1, subject: 'Mathematics', date: '2024-01-20', status: 'present', time: '10:00 AM' },
    { id: 2, subject: 'Physics', date: '2024-01-20', status: 'present', time: '11:30 AM' },
    { id: 3, subject: 'Chemistry', date: '2024-01-19', status: 'absent', time: '2:00 PM' },
    { id: 4, subject: 'Computer Science', date: '2024-01-19', status: 'present', time: '3:30 PM' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Attendance Tracking</h2>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          Overall: {attendanceData.overall}%
        </Badge>
      </div>

      {/* Subject-wise Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
          <CardDescription>Your attendance percentage for each subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {attendanceData.subjects.map((subject, index) => (
              <div key={index} className="space-y-3 p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{subject.name}</h3>
                  <span className="text-sm font-bold">{subject.attendance}%</span>
                </div>
                <Progress value={subject.attendance} className="h-2" />
                <p className="text-sm text-gray-600">
                  Present: {subject.present}/{subject.total} classes
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
          <CardDescription>Your latest attendance records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAttendance.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {record.status === 'present' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium">{record.subject}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-3 w-3" />
                      <span>{record.date}</span>
                      <Clock className="h-3 w-3" />
                      <span>{record.time}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={record.status === 'present' ? 'default' : 'destructive'}>
                  {record.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceView;

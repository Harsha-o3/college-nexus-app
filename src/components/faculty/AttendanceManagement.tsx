
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Download, Upload, Save, Users } from 'lucide-react';
import { useState } from 'react';

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  isPresent: boolean;
}

interface AttendanceSession {
  id: number;
  date: string;
  subject: string;
  class: string;
  studentsPresent: number;
  totalStudents: number;
}

const AttendanceManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('CS-101-A');
  const [selectedSubject, setSelectedSubject] = useState('Data Structures');

  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'John Smith', rollNumber: 'CS001', isPresent: false },
    { id: 2, name: 'Sarah Johnson', rollNumber: 'CS002', isPresent: false },
    { id: 3, name: 'Mike Davis', rollNumber: 'CS003', isPresent: false },
    { id: 4, name: 'Emily Wilson', rollNumber: 'CS004', isPresent: false },
    { id: 5, name: 'David Brown', rollNumber: 'CS005', isPresent: false },
    { id: 6, name: 'Lisa Anderson', rollNumber: 'CS006', isPresent: false },
  ]);

  const [attendanceHistory] = useState<AttendanceSession[]>([
    { id: 1, date: '2024-01-19', subject: 'Data Structures', class: 'CS-101-A', studentsPresent: 42, totalStudents: 45 },
    { id: 2, date: '2024-01-17', subject: 'Algorithms', class: 'CS-201-B', studentsPresent: 35, totalStudents: 38 },
    { id: 3, date: '2024-01-15', subject: 'Database Systems', class: 'CS-301-A', studentsPresent: 30, totalStudents: 32 },
  ]);

  const classes = ['CS-101-A', 'CS-201-B', 'CS-301-A'];
  const subjects = ['Data Structures', 'Algorithms', 'Database Systems'];

  const handleStudentAttendance = (studentId: number, isPresent: boolean) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, isPresent } : student
    ));
  };

  const handleMarkAll = (present: boolean) => {
    setStudents(students.map(student => ({ ...student, isPresent: present })));
  };

  const handleSaveAttendance = () => {
    const presentCount = students.filter(s => s.isPresent).length;
    console.log('Saving attendance:', {
      date: selectedDate,
      class: selectedClass,
      subject: selectedSubject,
      studentsPresent: presentCount,
      totalStudents: students.length,
      students: students
    });
    alert(`Attendance saved! ${presentCount}/${students.length} students present`);
  };

  const presentCount = students.filter(s => s.isPresent).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Attendance Management</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Attendance Form */}
      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>Select class and date to mark student attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="class">Class</Label>
              <select
                id="class"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <select
                id="subject"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-lg px-3 py-1">
                Present: {presentCount}/{students.length}
              </Badge>
              <Badge variant="secondary">
                Percentage: {Math.round((presentCount / students.length) * 100)}%
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => handleMarkAll(true)}>
                Mark All Present
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleMarkAll(false)}>
                Mark All Absent
              </Button>
            </div>
          </div>

          {/* Students List */}
          <div className="border rounded-lg">
            <div className="grid grid-cols-4 gap-4 p-3 bg-gray-50 font-medium text-sm">
              <span>Roll Number</span>
              <span>Student Name</span>
              <span>Status</span>
              <span>Action</span>
            </div>
            {students.map((student) => (
              <div key={student.id} className="grid grid-cols-4 gap-4 p-3 border-t items-center">
                <span className="font-mono text-sm">{student.rollNumber}</span>
                <span>{student.name}</span>
                <Badge variant={student.isPresent ? "default" : "destructive"}>
                  {student.isPresent ? "Present" : "Absent"}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={student.isPresent}
                    onCheckedChange={(checked) => handleStudentAttendance(student.id, checked as boolean)}
                  />
                  <span className="text-sm">Present</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={handleSaveAttendance} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Attendance
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance Sessions</CardTitle>
          <CardDescription>View previously recorded attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {attendanceHistory.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{session.subject} - {session.class}</p>
                    <p className="text-sm text-gray-600">{session.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">
                    {session.studentsPresent}/{session.totalStudents} Present
                  </Badge>
                  <Badge variant="secondary">
                    {Math.round((session.studentsPresent / session.totalStudents) * 100)}%
                  </Badge>
                  <Button size="sm" variant="ghost">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceManagement;

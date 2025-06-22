
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Save, Download, Upload, Edit } from 'lucide-react';
import { useState } from 'react';

interface StudentMark {
  id: number;
  name: string;
  rollNumber: string;
  marks: number;
  totalMarks: number;
  percentage: number;
  grade: string;
}

interface ExamSession {
  id: number;
  examType: string;
  subject: string;
  class: string;
  date: string;
  totalMarks: number;
  studentsEvaluated: number;
  averageMarks: number;
}

const MarksManagement = () => {
  const [selectedClass, setSelectedClass] = useState('CS-101-A');
  const [selectedSubject, setSelectedSubject] = useState('Data Structures');
  const [examType, setExamType] = useState('Internal');
  const [totalMarks, setTotalMarks] = useState(50);
  const [examDate, setExamDate] = useState(new Date().toISOString().split('T')[0]);

  const [studentMarks, setStudentMarks] = useState<StudentMark[]>([
    { id: 1, name: 'John Smith', rollNumber: 'CS001', marks: 0, totalMarks: 50, percentage: 0, grade: '-' },
    { id: 2, name: 'Sarah Johnson', rollNumber: 'CS002', marks: 0, totalMarks: 50, percentage: 0, grade: '-' },
    { id: 3, name: 'Mike Davis', rollNumber: 'CS003', marks: 0, totalMarks: 50, percentage: 0, grade: '-' },
    { id: 4, name: 'Emily Wilson', rollNumber: 'CS004', marks: 0, totalMarks: 50, percentage: 0, grade: '-' },
    { id: 5, name: 'David Brown', rollNumber: 'CS005', marks: 0, totalMarks: 50, percentage: 0, grade: '-' },
  ]);

  const [examHistory] = useState<ExamSession[]>([
    { id: 1, examType: 'Internal', subject: 'Data Structures', class: 'CS-101-A', date: '2024-01-15', totalMarks: 50, studentsEvaluated: 45, averageMarks: 38.5 },
    { id: 2, examType: 'Assignment', subject: 'Algorithms', class: 'CS-201-B', date: '2024-01-12', totalMarks: 20, studentsEvaluated: 38, averageMarks: 16.2 },
    { id: 3, examType: 'Quiz', subject: 'Database Systems', class: 'CS-301-A', date: '2024-01-10', totalMarks: 10, studentsEvaluated: 32, averageMarks: 7.8 },
  ]);

  const classes = ['CS-101-A', 'CS-201-B', 'CS-301-A'];
  const subjects = ['Data Structures', 'Algorithms', 'Database Systems'];
  const examTypes = ['Internal', 'External', 'Assignment', 'Quiz', 'Project'];

  const calculateGrade = (percentage: number): string => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  const handleMarksChange = (studentId: number, marks: number) => {
    setStudentMarks(studentMarks.map(student => {
      if (student.id === studentId) {
        const percentage = Math.round((marks / totalMarks) * 100);
        return {
          ...student,
          marks,
          totalMarks,
          percentage,
          grade: calculateGrade(percentage)
        };
      }
      return student;
    }));
  };

  const handleSaveMarks = () => {
    const evaluatedCount = studentMarks.filter(s => s.marks > 0).length;
    const averageMarks = studentMarks.reduce((sum, s) => sum + s.marks, 0) / evaluatedCount;
    
    console.log('Saving marks:', {
      class: selectedClass,
      subject: selectedSubject,
      examType,
      date: examDate,
      totalMarks,
      studentsEvaluated: evaluatedCount,
      averageMarks,
      studentMarks
    });
    
    alert(`Marks saved! ${evaluatedCount} students evaluated with average: ${averageMarks.toFixed(1)}`);
  };

  const handleTotalMarksChange = (newTotal: number) => {
    setTotalMarks(newTotal);
    setStudentMarks(studentMarks.map(student => {
      const percentage = student.marks > 0 ? Math.round((student.marks / newTotal) * 100) : 0;
      return {
        ...student,
        totalMarks: newTotal,
        percentage,
        grade: student.marks > 0 ? calculateGrade(percentage) : '-'
      };
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Marks Management</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Marks
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Marks Entry Form */}
      <Card>
        <CardHeader>
          <CardTitle>Enter Marks</CardTitle>
          <CardDescription>Add examination marks for students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
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
            <div>
              <Label htmlFor="examType">Exam Type</Label>
              <select
                id="examType"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
              >
                {examTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="totalMarks">Total Marks</Label>
              <Input
                id="totalMarks"
                type="number"
                value={totalMarks}
                onChange={(e) => handleTotalMarksChange(parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="examDate">Date</Label>
              <Input
                id="examDate"
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
              />
            </div>
          </div>

          {/* Students Marks Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-6 gap-4 p-3 bg-gray-50 font-medium text-sm">
              <span>Roll No.</span>
              <span>Student Name</span>
              <span>Marks Obtained</span>
              <span>Total Marks</span>
              <span>Percentage</span>
              <span>Grade</span>
            </div>
            {studentMarks.map((student) => (
              <div key={student.id} className="grid grid-cols-6 gap-4 p-3 border-t items-center">
                <span className="font-mono text-sm">{student.rollNumber}</span>
                <span>{student.name}</span>
                <Input
                  type="number"
                  min="0"
                  max={totalMarks}
                  value={student.marks || ''}
                  onChange={(e) => handleMarksChange(student.id, parseInt(e.target.value) || 0)}
                  placeholder="0"
                  className="w-20"
                />
                <span>{student.totalMarks}</span>
                <span>{student.percentage}%</span>
                <Badge 
                  variant={student.grade === 'A+' || student.grade === 'A' ? 'default' : 
                           student.grade === 'B' || student.grade === 'C' ? 'secondary' : 
                           student.grade === 'F' ? 'destructive' : 'outline'}
                >
                  {student.grade}
                </Badge>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-4">
              <Badge variant="outline" className="text-lg px-3 py-1">
                Average: {(studentMarks.reduce((sum, s) => sum + s.marks, 0) / studentMarks.length).toFixed(1)}
              </Badge>
              <Badge variant="secondary">
                Evaluated: {studentMarks.filter(s => s.marks > 0).length}/{studentMarks.length}
              </Badge>
            </div>
            <Button onClick={handleSaveMarks} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Marks
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Exam History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Examinations</CardTitle>
          <CardDescription>Previously conducted exams and assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {examHistory.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Edit className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{exam.examType} - {exam.subject}</p>
                    <p className="text-sm text-gray-600">{exam.class} • {exam.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">
                    Total: {exam.totalMarks} marks
                  </Badge>
                  <Badge variant="secondary">
                    Avg: {exam.averageMarks}/{exam.totalMarks}
                  </Badge>
                  <Badge>
                    {exam.studentsEvaluated} evaluated
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

export default MarksManagement;

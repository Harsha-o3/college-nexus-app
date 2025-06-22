
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, FileText, Upload } from 'lucide-react';

interface Assignment {
  id: number;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'overdue';
  marks?: number;
  totalMarks: number;
  submissionDate?: string;
}

const AssignmentsView = () => {
  const assignments: Assignment[] = [
    {
      id: 1,
      title: "Calculus Problem Set 3",
      subject: "Mathematics",
      description: "Solve differential equations and integration problems",
      dueDate: "2024-01-25",
      status: "pending",
      totalMarks: 100
    },
    {
      id: 2,
      title: "Physics Lab Report",
      subject: "Physics",
      description: "Write a comprehensive report on pendulum experiment",
      dueDate: "2024-01-20",
      status: "submitted",
      marks: 85,
      totalMarks: 100,
      submissionDate: "2024-01-18"
    },
    {
      id: 3,
      title: "Chemistry Research Paper",
      subject: "Chemistry",
      description: "Research paper on organic compounds",
      dueDate: "2024-01-15",
      status: "overdue",
      totalMarks: 100
    },
    {
      id: 4,
      title: "Programming Assignment",
      subject: "Computer Science",
      description: "Implement a sorting algorithm in Python",
      dueDate: "2024-01-30",
      status: "pending",
      totalMarks: 50
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'overdue': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const completionRate = Math.round((assignments.filter(a => a.status === 'submitted').length / assignments.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Assignments</h2>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          Completion: {completionRate}%
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{assignments.filter(a => a.status === 'pending').length}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{assignments.filter(a => a.status === 'submitted').length}</p>
              <p className="text-sm text-gray-600">Submitted</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{assignments.filter(a => a.status === 'overdue').length}</p>
              <p className="text-sm text-gray-600">Overdue</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{assignments.length}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments List */}
      <Card>
        <CardHeader>
          <CardTitle>All Assignments</CardTitle>
          <CardDescription>Manage your assignments and submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4" />
                      <h3 className="font-semibold">{assignment.title}</h3>
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Badge variant="outline">{assignment.subject}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Due: {assignment.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Marks: {assignment.totalMarks}</span>
                      </div>
                    </div>
                    {assignment.marks && (
                      <div className="mt-2">
                        <div className="flex justify-between text-sm">
                          <span>Score: {assignment.marks}/{assignment.totalMarks}</span>
                          <span>{Math.round((assignment.marks / assignment.totalMarks) * 100)}%</span>
                        </div>
                        <Progress value={(assignment.marks / assignment.totalMarks) * 100} className="h-2 mt-1" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    {assignment.status === 'pending' && (
                      <Button size="sm" className="flex items-center gap-1">
                        <Upload className="h-3 w-3" />
                        Submit
                      </Button>
                    )}
                    {assignment.status === 'submitted' && assignment.submissionDate && (
                      <div className="text-xs text-green-600 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Submitted: {assignment.submissionDate}
                      </div>
                    )}
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

export default AssignmentsView;

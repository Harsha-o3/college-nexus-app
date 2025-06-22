
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Mark {
  id: number;
  subject: string;
  type: 'Internal' | 'External' | 'Assignment' | 'Quiz';
  marks: number;
  total: number;
  date: string;
  percentage: number;
}

const MarksView = () => {
  const marks: Mark[] = [
    { id: 1, subject: 'Mathematics', type: 'Internal', marks: 42, total: 50, date: '2024-01-15', percentage: 84 },
    { id: 2, subject: 'Physics', type: 'Assignment', marks: 18, total: 20, date: '2024-01-12', percentage: 90 },
    { id: 3, subject: 'Chemistry', type: 'Quiz', marks: 8, total: 10, date: '2024-01-10', percentage: 80 },
    { id: 4, subject: 'Computer Science', type: 'External', marks: 78, total: 100, date: '2024-01-08', percentage: 78 },
    { id: 5, subject: 'Mathematics', type: 'Assignment', marks: 19, total: 20, date: '2024-01-05', percentage: 95 },
  ];

  const subjectAverages = [
    { subject: 'Mathematics', average: 89 },
    { subject: 'Physics', average: 85 },
    { subject: 'Chemistry', average: 80 },
    { subject: 'Computer Science', average: 78 },
  ];

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'bg-green-600' };
    if (percentage >= 80) return { grade: 'A', color: 'bg-green-500' };
    if (percentage >= 70) return { grade: 'B', color: 'bg-blue-500' };
    if (percentage >= 60) return { grade: 'C', color: 'bg-yellow-500' };
    return { grade: 'D', color: 'bg-red-500' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Academic Performance</h2>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          Overall Average: 83%
        </Badge>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Performance</CardTitle>
          <CardDescription>Your average performance across subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectAverages}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="average" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Marks */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Assessments</CardTitle>
          <CardDescription>Your latest test and assignment results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marks.map((mark) => {
              const gradeInfo = getGrade(mark.percentage);
              return (
                <div key={mark.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{mark.subject}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{mark.type}</Badge>
                        <Badge className={gradeInfo.color}>{gradeInfo.grade}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold">{mark.marks}/{mark.total}</span>
                      <span className="text-lg font-semibold text-blue-600">{mark.percentage}%</span>
                    </div>
                    <Progress value={mark.percentage} className="h-2 mb-2" />
                    <p className="text-sm text-gray-500">Date: {mark.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarksView;

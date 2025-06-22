
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar, TrendingUp, Users, FileText } from 'lucide-react';

const ReportsView = () => {
  const attendanceData = [
    { month: 'Jan', percentage: 87 },
    { month: 'Feb', percentage: 89 },
    { month: 'Mar', percentage: 85 },
    { month: 'Apr', percentage: 91 },
    { month: 'May', percentage: 88 },
    { month: 'Jun', percentage: 90 },
  ];

  const performanceData = [
    { subject: 'Mathematics', average: 78 },
    { subject: 'Physics', average: 82 },
    { subject: 'Chemistry', average: 76 },
    { subject: 'Computer Science', average: 85 },
    { subject: 'English', average: 79 },
  ];

  const departmentData = [
    { name: 'Computer Science', students: 245, color: '#3b82f6' },
    { name: 'Electrical', students: 198, color: '#10b981' },
    { name: 'Mechanical', students: 167, color: '#f59e0b' },
    { name: 'Civil', students: 134, color: '#ef4444' },
  ];

  const topPerformers = [
    { name: 'Sarah Johnson', department: 'Computer Science', cgpa: 9.2, semester: '6th' },
    { name: 'Mike Davis', department: 'Electrical', cgpa: 9.0, semester: '4th' },
    { name: 'Emily Wilson', department: 'Mechanical', cgpa: 8.9, semester: '6th' },
    { name: 'John Smith', department: 'Civil', cgpa: 8.8, semester: '8th' },
    { name: 'Lisa Anderson', department: 'Computer Science', cgpa: 8.7, semester: '4th' },
  ];

  const reportTypes = [
    { title: 'Attendance Report', description: 'Detailed attendance analysis', icon: Calendar },
    { title: 'Performance Report', description: 'Academic performance metrics', icon: TrendingUp },
    { title: 'Student Report', description: 'Complete student profiles', icon: Users },
    { title: 'Faculty Report', description: 'Faculty activity summary', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reports & Analytics</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold">1,245</p>
                <p className="text-xs text-green-600">+5.2% from last month</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall Attendance</p>
                <p className="text-2xl font-bold">88.5%</p>
                <p className="text-xs text-green-600">+2.1% from last month</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Performance</p>
                <p className="text-2xl font-bold">79.8%</p>
                <p className="text-xs text-blue-600">+1.5% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Faculty</p>
                <p className="text-2xl font-bold">87</p>
                <p className="text-xs text-gray-600">No change</p>
              </div>
              <FileText className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
            <CardDescription>Monthly attendance percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="percentage" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance by Subject */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Subject</CardTitle>
            <CardDescription>Average marks across subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="average" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Students by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, students }) => `${name}: ${students}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="students"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Students with highest CGPA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.department} • {student.semester} Semester</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                      {student.cgpa}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">CGPA</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Types */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
          <CardDescription>Download detailed reports for analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportTypes.map((report, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3 mb-3">
                  <report.icon className="h-6 w-6 text-blue-500" />
                  <h3 className="font-medium">{report.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                <Button size="sm" variant="outline" className="w-full">
                  <Download className="h-3 w-3 mr-2" />
                  Generate
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsView;

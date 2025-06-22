
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, Settings, BarChart3, Plus, TrendingUp } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
}

interface AdminDashboardProps {
  user: User;
  activeSection: string;
}

const AdminDashboard = ({ user, activeSection }: AdminDashboardProps) => {
  // Mock data
  const stats = {
    totalStudents: 1245,
    totalFaculty: 87,
    totalCourses: 156,
    systemHealth: 98
  };

  const recentActivities = [
    { action: 'New student registered', details: 'Jane Smith - Computer Science', time: '10 minutes ago' },
    { action: 'Faculty updated profile', details: 'Dr. Johnson - Mathematics', time: '1 hour ago' },
    { action: 'System backup completed', details: 'Daily backup successful', time: '2 hours ago' },
  ];

  const pendingApprovals = [
    { type: 'Course Registration', count: 23, priority: 'medium' },
    { type: 'Leave Applications', count: 8, priority: 'high' },
    { type: 'Grade Changes', count: 5, priority: 'low' },
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
        <Card className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100">Total Students</p>
                <p className="text-3xl font-bold">{stats.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-cyan-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100">Total Faculty</p>
                <p className="text-3xl font-bold">{stats.totalFaculty}</p>
              </div>
              <Users className="h-8 w-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-violet-500 to-violet-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-violet-100">Total Courses</p>
                <p className="text-3xl font-bold">{stats.totalCourses}</p>
              </div>
              <FileText className="h-8 w-8 text-violet-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-lime-500 to-lime-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lime-100">System Health</p>
                <p className="text-3xl font-bold">{stats.systemHealth}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-lime-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>System Overview</CardTitle>
                <CardDescription>Key metrics and system status</CardDescription>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Reports
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium">Database Status</span>
                <Badge className="bg-green-100 text-green-800">Healthy</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium">Server Load</span>
                <Badge className="bg-blue-100 text-blue-800">Normal</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium">Backup Status</span>
                <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="font-medium">Active Users</span>
                <span className="font-bold">342 online</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((approval, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{approval.type}</h3>
                    <Badge 
                      variant={approval.priority === 'high' ? 'destructive' : 
                              approval.priority === 'medium' ? 'default' : 'secondary'}
                    >
                      {approval.count} pending
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                    <Button size="sm" variant="outline">
                      Approve All
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent System Activities</CardTitle>
              <CardDescription>Latest updates and changes</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.details}</p>
                </div>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

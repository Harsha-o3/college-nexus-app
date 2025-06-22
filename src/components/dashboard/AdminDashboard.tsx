
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, Settings, BarChart3, Plus, TrendingUp } from 'lucide-react';
import UsersManagement from '@/components/admin/UsersManagement';
import ReportsView from '@/components/admin/ReportsView';
import SettingsView from '@/components/admin/SettingsView';

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
  // Render specific sections
  if (activeSection === 'users') {
    return <UsersManagement />;
  }

  if (activeSection === 'reports') {
    return <ReportsView />;
  }

  if (activeSection === 'settings') {
    return <SettingsView />;
  }

  // Dashboard overview (default)
  if (activeSection === 'dashboard') {
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

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-gray-300/30 to-slate-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-zinc-300/30 to-gray-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-slate-300/20 to-zinc-300/20 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 space-y-6 p-6">
          {/* Admin Header with Image */}
          <div className="flex items-center space-x-4 animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face" 
              alt="Admin"
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg animate-scale-in"
            />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-slate-700 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">System management and oversight</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-100">Total Students</p>
                    <p className="text-3xl font-bold">{stats.totalStudents}</p>
                  </div>
                  <Users className="h-8 w-8 text-cyan-200 animate-pulse" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in delay-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100">Total Faculty</p>
                    <p className="text-3xl font-bold">{stats.totalFaculty}</p>
                  </div>
                  <Users className="h-8 w-8 text-emerald-200 animate-pulse" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in delay-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-violet-100">Total Courses</p>
                    <p className="text-3xl font-bold">{stats.totalCourses}</p>
                  </div>
                  <FileText className="h-8 w-8 text-violet-200 animate-pulse" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-lime-500 to-lime-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in delay-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lime-100">System Health</p>
                    <p className="text-3xl font-bold">{stats.systemHealth}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-lime-200 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Overview */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-in-right">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="https://images.unsplash.com/photo-1551038247-3d9af20df552?w=40&h=40&fit=crop" 
                      alt="System"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle>System Overview</CardTitle>
                      <CardDescription>Key metrics and system status</CardDescription>
                    </div>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 animate-bounce">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Reports
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-200 hover:scale-[1.02]">
                    <span className="font-medium">Database Status</span>
                    <Badge className="bg-green-100 text-green-800 animate-pulse">Healthy</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 hover:scale-[1.02]">
                    <span className="font-medium">Server Load</span>
                    <Badge className="bg-blue-100 text-blue-800 animate-pulse">Normal</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-all duration-200 hover:scale-[1.02]">
                    <span className="font-medium">Backup Status</span>
                    <Badge className="bg-yellow-100 text-yellow-800 animate-pulse">Scheduled</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-200 hover:scale-[1.02]">
                    <span className="font-medium">Active Users</span>
                    <span className="font-bold animate-pulse">342 online</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Approvals */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-in-right delay-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <img 
                    src="https://images.unsplash.com/photo-1466442929976-97f336a657be?w=40&h=40&fit=crop" 
                    alt="Approvals"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <CardTitle>Pending Approvals</CardTitle>
                    <CardDescription>Items requiring your attention</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((approval, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{approval.type}</h3>
                        <Badge 
                          variant={approval.priority === 'high' ? 'destructive' : 
                                  approval.priority === 'medium' ? 'default' : 'secondary'}
                          className="animate-pulse"
                        >
                          {approval.count} pending
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                          Review
                        </Button>
                        <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
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
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=40&h=40&fit=crop" 
                    alt="Activities"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <CardTitle>Recent System Activities</CardTitle>
                    <CardDescription>Latest updates and changes</CardDescription>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-[1.01]">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
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
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-500">
        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} section coming soon...
      </p>
    </div>
  );
};

export default AdminDashboard;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, FileText, Bell, Plus, Upload } from 'lucide-react';
import ClassesView from '@/components/faculty/ClassesView';
import AttendanceManagement from '@/components/faculty/AttendanceManagement';
import MarksManagement from '@/components/faculty/MarksManagement';
import NoticesView from '@/components/student/NoticesView';
import ProfileView from '@/components/student/ProfileView';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
}

interface FacultyDashboardProps {
  user: User;
  activeSection: string;
}

const FacultyDashboard = ({ user, activeSection }: FacultyDashboardProps) => {
  // Render specific sections
  if (activeSection === 'classes') {
    return <ClassesView />;
  }

  if (activeSection === 'attendance') {
    return <AttendanceManagement />;
  }

  if (activeSection === 'marks') {
    return <MarksManagement />;
  }

  if (activeSection === 'notices') {
    return <NoticesView />;
  }

  if (activeSection === 'profile') {
    return <ProfileView user={user} />;
  }

  // Dashboard overview (default)
  if (activeSection === 'dashboard') {
    // Mock data
    const classes = [
      { name: 'CS-101 Data Structures', students: 45, schedule: 'Mon, Wed, Fri 10:00 AM' },
      { name: 'CS-201 Algorithms', students: 38, schedule: 'Tue, Thu 2:00 PM' },
      { name: 'CS-301 Database Systems', students: 32, schedule: 'Mon, Wed 3:00 PM' },
    ];

    const recentActivities = [
      { action: 'Uploaded assignment', class: 'CS-101', time: '2 hours ago' },
      { action: 'Marked attendance', class: 'CS-201', time: '4 hours ago' },
      { action: 'Added exam marks', class: 'CS-301', time: '1 day ago' },
    ];

    const pendingTasks = [
      { task: 'Grade midterm exams', class: 'CS-101', due: 'Tomorrow', priority: 'high' },
      { task: 'Prepare lecture notes', class: 'CS-201', due: '3 days', priority: 'medium' },
      { task: 'Update attendance', class: 'CS-301', due: '1 week', priority: 'low' },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-emerald-300/40 to-teal-300/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-cyan-300/40 to-blue-300/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-teal-300/30 to-emerald-300/30 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 space-y-6 p-6">
          {/* Faculty Header with Image */}
          <div className="flex items-center space-x-4 animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" 
              alt="Faculty"
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg animate-scale-in"
            />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Faculty Dashboard
              </h1>
              <p className="text-gray-600">Manage your classes and students</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-100">Total Classes</p>
                    <p className="text-3xl font-bold">{classes.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-indigo-200 animate-pulse" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in delay-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-teal-100">Total Students</p>
                    <p className="text-3xl font-bold">115</p>
                  </div>
                  <Users className="h-8 w-8 text-teal-200 animate-pulse" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in delay-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-100">Pending Tasks</p>
                    <p className="text-3xl font-bold">{pendingTasks.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-amber-200 animate-pulse" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in delay-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-rose-100">Today's Classes</p>
                    <p className="text-3xl font-bold">2</p>
                  </div>
                  <Calendar className="h-8 w-8 text-rose-200 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* My Classes */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-in-right">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=40&h=40&fit=crop" 
                      alt="Classes"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle>My Classes</CardTitle>
                      <CardDescription>Classes you're currently teaching</CardDescription>
                    </div>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 animate-bounce">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Class
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classes.map((classItem, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{classItem.name}</h3>
                        <Badge variant="secondary" className="animate-pulse">{classItem.students} students</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{classItem.schedule}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                          <Calendar className="h-3 w-3 mr-1" />
                          Attendance
                        </Button>
                        <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                          <FileText className="h-3 w-3 mr-1" />
                          Marks
                        </Button>
                        <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                          <Upload className="h-3 w-3 mr-1" />
                          Upload
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Tasks */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-in-right delay-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <img 
                    src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=40&h=40&fit=crop" 
                    alt="Tasks"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <CardTitle>Pending Tasks</CardTitle>
                    <CardDescription>Tasks that need your attention</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingTasks.map((task, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{task.task}</p>
                        <Badge 
                          variant={task.priority === 'high' ? 'destructive' : 
                                  task.priority === 'medium' ? 'default' : 'secondary'}
                          className="animate-pulse"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{task.class}</p>
                      <p className="text-xs text-gray-500 mt-1">Due: {task.due}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=40&h=40&fit=crop" 
                  alt="Activities"
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Your recent actions and updates</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-[1.01]">
                    <Bell className="h-4 w-4 text-gray-400 animate-pulse" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.class}</p>
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

export default FacultyDashboard;

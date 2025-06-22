
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AttendanceView from '@/components/student/AttendanceView';
import MarksView from '@/components/student/MarksView';
import NoticesView from '@/components/student/NoticesView';
import ProfileView from '@/components/student/ProfileView';
import AssignmentsView from '@/components/student/AssignmentsView';
import TimetableView from '@/components/student/TimetableView';
import LibraryView from '@/components/student/LibraryView';
import { User, Calendar, BookOpen, FileText, Bell, BarChart, Clock, Library } from 'lucide-react';

interface StudentDashboardProps {
  user: any;
}

const StudentDashboard = ({ user }: StudentDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const quickStats = {
    attendance: 85,
    assignments: { pending: 3, total: 12 },
    averageGrade: 'A-',
    nextClass: 'Mathematics at 10:00 AM'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-300/30 to-cyan-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 space-y-6 p-6">
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-scale-in">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                alt="Student"
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600">Here's your academic overview</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2 animate-bounce">
            Student Portal
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-white/70 backdrop-blur-sm shadow-lg animate-slide-in-right">
            <TabsTrigger value="overview" className="flex items-center gap-1 hover:scale-105 transition-transform">
              <BarChart className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center gap-1 hover:scale-105 transition-transform">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Attendance</span>
            </TabsTrigger>
            <TabsTrigger value="marks" className="flex items-center gap-1 hover:scale-105 transition-transform">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Marks</span>
            </TabsTrigger>
            <TabsTrigger value="assignments" className="flex items-center gap-1 hover:scale-105 transition-transform">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Assignments</span>
            </TabsTrigger>
            <TabsTrigger value="timetable" className="flex items-center gap-1 hover:scale-105 transition-transform">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Timetable</span>
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-1 hover:scale-105 transition-transform">
              <Library className="h-4 w-4" />
              <span className="hidden sm:inline">Library</span>
            </TabsTrigger>
            <TabsTrigger value="notices" className="flex items-center gap-1 hover:scale-105 transition-transform">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notices</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-1 hover:scale-105 transition-transform">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{quickStats.attendance}%</div>
                  <p className="text-xs text-muted-foreground">Overall attendance rate</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in delay-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{quickStats.assignments.pending}</div>
                  <p className="text-xs text-muted-foreground">
                    Pending out of {quickStats.assignments.total} total
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in delay-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{quickStats.averageGrade}</div>
                  <p className="text-xs text-muted-foreground">Current semester</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in delay-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Class</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-bold text-purple-600">{quickStats.nextClass}</div>
                  <p className="text-xs text-muted-foreground">Upcoming schedule</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-in-right">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <img 
                      src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=40&h=40&fit=crop" 
                      alt="Activity"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your latest academic activities</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">Submitted Physics Assignment</span>
                      <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">Attended Mathematics Lecture</span>
                      <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">New Chemistry Assignment Posted</span>
                      <span className="text-xs text-gray-500 ml-auto">2 days ago</span>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">Downloaded Study Material</span>
                      <span className="text-xs text-gray-500 ml-auto">3 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-in-right delay-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <img 
                      src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=40&h=40&fit=crop" 
                      alt="Deadlines"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle>Upcoming Deadlines</CardTitle>
                      <CardDescription>Important dates to remember</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                      <div>
                        <p className="font-medium">Mathematics Assignment</p>
                        <p className="text-sm text-gray-600">Calculus Problem Set</p>
                      </div>
                      <Badge variant="destructive" className="animate-pulse">Due Tomorrow</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                      <div>
                        <p className="font-medium">Physics Lab Report</p>
                        <p className="text-sm text-gray-600">Pendulum Experiment</p>
                      </div>
                      <Badge variant="secondary">3 days left</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                      <div>
                        <p className="font-medium">Chemistry Mid-term</p>
                        <p className="text-sm text-gray-600">Organic Chemistry</p>
                      </div>
                      <Badge variant="outline">1 week left</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="animate-fade-in">
            <AttendanceView />
          </TabsContent>

          <TabsContent value="marks" className="animate-fade-in">
            <MarksView />
          </TabsContent>

          <TabsContent value="assignments" className="animate-fade-in">
            <AssignmentsView />
          </TabsContent>

          <TabsContent value="timetable" className="animate-fade-in">
            <TimetableView />
          </TabsContent>

          <TabsContent value="library" className="animate-fade-in">
            <LibraryView />
          </TabsContent>

          <TabsContent value="notices" className="animate-fade-in">
            <NoticesView />
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <ProfileView user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;


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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Here's your academic overview</p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          Student Portal
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Attendance</span>
          </TabsTrigger>
          <TabsTrigger value="marks" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Marks</span>
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Assignments</span>
          </TabsTrigger>
          <TabsTrigger value="timetable" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Timetable</span>
          </TabsTrigger>
          <TabsTrigger value="library" className="flex items-center gap-1">
            <Library className="h-4 w-4" />
            <span className="hidden sm:inline">Library</span>
          </TabsTrigger>
          <TabsTrigger value="notices" className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notices</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{quickStats.attendance}%</div>
                <p className="text-xs text-muted-foreground">Overall attendance rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{quickStats.assignments.pending}</div>
                <p className="text-xs text-muted-foreground">
                  Pending out of {quickStats.assignments.total} total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{quickStats.averageGrade}</div>
                <p className="text-xs text-muted-foreground">Current semester</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Class</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">{quickStats.nextClass}</div>
                <p className="text-xs text-muted-foreground">Upcoming schedule</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest academic activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Submitted Physics Assignment</span>
                    <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Attended Mathematics Lecture</span>
                    <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">New Chemistry Assignment Posted</span>
                    <span className="text-xs text-gray-500 ml-auto">2 days ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Downloaded Study Material</span>
                    <span className="text-xs text-gray-500 ml-auto">3 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Important dates to remember</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Mathematics Assignment</p>
                      <p className="text-sm text-gray-600">Calculus Problem Set</p>
                    </div>
                    <Badge variant="destructive">Due Tomorrow</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Physics Lab Report</p>
                      <p className="text-sm text-gray-600">Pendulum Experiment</p>
                    </div>
                    <Badge variant="secondary">3 days left</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
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

        <TabsContent value="attendance">
          <AttendanceView />
        </TabsContent>

        <TabsContent value="marks">
          <MarksView />
        </TabsContent>

        <TabsContent value="assignments">
          <AssignmentsView />
        </TabsContent>

        <TabsContent value="timetable">
          <TimetableView />
        </TabsContent>

        <TabsContent value="library">
          <LibraryView />
        </TabsContent>

        <TabsContent value="notices">
          <NoticesView />
        </TabsContent>

        <TabsContent value="profile">
          <ProfileView user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;

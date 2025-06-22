
import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import FacultyDashboard from '@/components/dashboard/FacultyDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import Header from '@/components/layout/Header';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  profilePic?: string;
}

interface DashboardRouterProps {
  user: User;
  onLogout: () => void;
}

const DashboardRouter = ({ user, onLogout }: DashboardRouterProps) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard user={user} activeSection={activeSection} />;
      case 'faculty':
        return <FacultyDashboard user={user} activeSection={activeSection} />;
      case 'admin':
        return <AdminDashboard user={user} activeSection={activeSection} />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar 
          user={user} 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="flex-1 flex flex-col">
          <Header user={user} onLogout={onLogout} />
          <div className="flex-1 p-6">
            {renderDashboard()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardRouter;

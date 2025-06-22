
import { User, Calendar, FileText, Bell, BarChart3, Users, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
}

interface AppSidebarProps {
  user: User;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AppSidebar = ({ user, activeSection, setActiveSection }: AppSidebarProps) => {
  const getMenuItems = () => {
    switch (user.role) {
      case 'student':
        return [
          { title: 'Dashboard', url: 'dashboard', icon: BarChart3 },
          { title: 'Attendance', url: 'attendance', icon: Calendar },
          { title: 'Marks', url: 'marks', icon: FileText },
          { title: 'Notices', url: 'notices', icon: Bell },
          { title: 'Profile', url: 'profile', icon: User },
        ];
      case 'faculty':
        return [
          { title: 'Dashboard', url: 'dashboard', icon: BarChart3 },
          { title: 'Classes', url: 'classes', icon: Users },
          { title: 'Attendance', url: 'attendance', icon: Calendar },
          { title: 'Marks', url: 'marks', icon: FileText },
          { title: 'Notices', url: 'notices', icon: Bell },
          { title: 'Profile', url: 'profile', icon: User },
        ];
      case 'admin':
        return [
          { title: 'Dashboard', url: 'dashboard', icon: BarChart3 },
          { title: 'Users', url: 'users', icon: Users },
          { title: 'Reports', url: 'reports', icon: FileText },
          { title: 'Settings', url: 'settings', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">CP</span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">College Portal</h2>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.url)}
                    isActive={activeSection === item.url}
                    className="w-full justify-start px-3 py-2 text-left hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

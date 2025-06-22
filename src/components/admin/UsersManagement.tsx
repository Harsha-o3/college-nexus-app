
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Search, Edit, Trash2, Filter, UserPlus } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  status: 'active' | 'inactive';
  joinDate: string;
  lastLogin: string;
  profilePic?: string;
}

const UsersManagement = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Smith', email: 'john.smith@college.edu', role: 'student', status: 'active', joinDate: '2023-09-01', lastLogin: '2024-01-20' },
    { id: 2, name: 'Dr. Sarah Johnson', email: 'sarah.johnson@college.edu', role: 'faculty', status: 'active', joinDate: '2020-08-15', lastLogin: '2024-01-19' },
    { id: 3, name: 'Mike Davis', email: 'mike.davis@college.edu', role: 'student', status: 'active', joinDate: '2023-09-01', lastLogin: '2024-01-18' },
    { id: 4, name: 'Prof. Emily Wilson', email: 'emily.wilson@college.edu', role: 'faculty', status: 'active', joinDate: '2019-01-10', lastLogin: '2024-01-20' },
    { id: 5, name: 'David Brown', email: 'david.brown@college.edu', role: 'student', status: 'inactive', joinDate: '2023-09-01', lastLogin: '2024-01-10' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student' as 'student' | 'faculty' | 'admin',
    status: 'active' as 'active' | 'inactive'
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    const userToAdd: User = {
      id: Date.now(),
      ...newUser,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never'
    };
    setUsers([...users, userToAdd]);
    setNewUser({ name: '', email: '', role: 'student', status: 'active' });
    setShowAddForm(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleStatusToggle = (id: number) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const getRoleStats = () => {
    const students = users.filter(u => u.role === 'student').length;
    const faculty = users.filter(u => u.role === 'faculty').length;
    const admins = users.filter(u => u.role === 'admin').length;
    return { students, faculty, admins };
  };

  const stats = getRoleStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.students}</div>
            <p className="text-sm text-gray-600">Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.faculty}</div>
            <p className="text-sm text-gray-600">Faculty</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.admins}</div>
            <p className="text-sm text-gray-600">Admins</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">{users.length}</div>
            <p className="text-sm text-gray-600">Total Users</p>
          </CardContent>
        </Card>
      </div>

      {/* Add User Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
            <CardDescription>Create a new user account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="userName">Full Name</Label>
                <Input
                  id="userName"
                  placeholder="Enter full name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="userEmail">Email Address</Label>
                <Input
                  id="userEmail"
                  type="email"
                  placeholder="Enter email address"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="userRole">Role</Label>
                <select
                  id="userRole"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value as any})}
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <Label htmlFor="userStatus">Status</Label>
                <select
                  id="userStatus"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newUser.status}
                  onChange={(e) => setNewUser({...newUser, status: e.target.value as any})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button onClick={handleAddUser} className="bg-green-600 hover:bg-green-700">
                Add User
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                className="p-2 border border-gray-300 rounded-md"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admins</option>
              </select>
              <select
                className="p-2 border border-gray-300 rounded-md"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>Manage all system users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.profilePic} />
                    <AvatarFallback className="bg-gray-200">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        variant={user.role === 'admin' ? 'destructive' : 
                                user.role === 'faculty' ? 'default' : 'secondary'}
                      >
                        {user.role}
                      </Badge>
                      <Badge variant={user.status === 'active' ? 'default' : 'outline'}>
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right text-sm text-gray-600 mr-4">
                    <p>Joined: {user.joinDate}</p>
                    <p>Last login: {user.lastLogin}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusToggle(user.id)}
                  >
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManagement;

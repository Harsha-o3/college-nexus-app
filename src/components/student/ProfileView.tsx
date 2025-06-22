
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Mail, Phone, MapPin, Calendar, Book } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  profilePic?: string;
}

interface ProfileViewProps {
  user: User;
}

const ProfileView = ({ user }: ProfileViewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567',
    address: '123 College Street, University City, UC 12345',
    dateOfBirth: '1999-05-15',
    studentId: 'STU2024001',
    semester: '6th Semester',
    department: 'Computer Science',
    cgpa: '8.5'
  });

  const academicInfo = {
    enrollmentYear: '2021',
    expectedGraduation: '2025',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
    mentor: 'Dr. Johnson Smith'
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving profile data:', formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Student Profile</h2>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          variant={isEditing ? "default" : "outline"}
        >
          <Edit className="h-4 w-4 mr-2" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={user.profilePic} />
              <AvatarFallback className="bg-blue-600 text-white text-2xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{formData.name}</CardTitle>
            <CardDescription>
              <Badge variant="secondary" className="mb-2">Student</Badge>
              <br />
              ID: {formData.studentId}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{formData.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{formData.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{formData.address}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>DOB: {formData.dateOfBirth}</span>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Information</CardTitle>
          <CardDescription>Your current academic status and details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Book className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium">{formData.department}</p>
              <p className="text-sm text-gray-600">Department</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium">{formData.semester}</p>
              <p className="text-sm text-gray-600">Current Semester</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Badge className="bg-purple-600 text-white text-lg px-3 py-1">
                {formData.cgpa}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">CGPA</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="font-medium">{academicInfo.expectedGraduation}</p>
              <p className="text-sm text-gray-600">Expected Graduation</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Current Subjects</h4>
            <div className="flex flex-wrap gap-2">
              {academicInfo.subjects.map((subject, index) => (
                <Badge key={index} variant="outline">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <strong>Academic Mentor:</strong> {academicInfo.mentor}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileView;

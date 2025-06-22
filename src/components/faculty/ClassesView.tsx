
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Users, Calendar, Clock, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Class {
  id: number;
  name: string;
  subject: string;
  students: number;
  schedule: string;
  room: string;
  semester: string;
}

const ClassesView = () => {
  const [classes, setClasses] = useState<Class[]>([
    { id: 1, name: 'CS-101-A', subject: 'Data Structures', students: 45, schedule: 'Mon, Wed, Fri 10:00 AM', room: 'Room 201', semester: '3rd Sem' },
    { id: 2, name: 'CS-201-B', subject: 'Algorithms', students: 38, schedule: 'Tue, Thu 2:00 PM', room: 'Room 305', semester: '5th Sem' },
    { id: 3, name: 'CS-301-A', subject: 'Database Systems', students: 32, schedule: 'Mon, Wed 3:00 PM', room: 'Room 102', semester: '6th Sem' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    subject: '',
    students: 0,
    schedule: '',
    room: '',
    semester: ''
  });

  const handleAddClass = () => {
    const classToAdd: Class = {
      id: Date.now(),
      ...newClass
    };
    setClasses([...classes, classToAdd]);
    setNewClass({ name: '', subject: '', students: 0, schedule: '', room: '', semester: '' });
    setShowAddForm(false);
  };

  const handleDeleteClass = (id: number) => {
    setClasses(classes.filter(cls => cls.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Classes</h2>
        <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Class
        </Button>
      </div>

      {/* Add Class Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Class</CardTitle>
            <CardDescription>Create a new class for your teaching schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="className">Class Name</Label>
                <Input
                  id="className"
                  placeholder="e.g., CS-101-A"
                  value={newClass.name}
                  onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Data Structures"
                  value={newClass.subject}
                  onChange={(e) => setNewClass({...newClass, subject: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="students">Number of Students</Label>
                <Input
                  id="students"
                  type="number"
                  placeholder="45"
                  value={newClass.students || ''}
                  onChange={(e) => setNewClass({...newClass, students: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  placeholder="e.g., Mon, Wed, Fri 10:00 AM"
                  value={newClass.schedule}
                  onChange={(e) => setNewClass({...newClass, schedule: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="room">Room</Label>
                <Input
                  id="room"
                  placeholder="e.g., Room 201"
                  value={newClass.room}
                  onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="semester">Semester</Label>
                <Input
                  id="semester"
                  placeholder="e.g., 3rd Sem"
                  value={newClass.semester}
                  onChange={(e) => setNewClass({...newClass, semester: e.target.value})}
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button onClick={handleAddClass} className="bg-green-600 hover:bg-green-700">
                Add Class
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{classItem.name}</CardTitle>
                  <CardDescription className="text-base font-medium text-blue-600">
                    {classItem.subject}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{classItem.semester}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{classItem.students} students</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{classItem.schedule}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{classItem.room}</span>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    Attendance
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Marks
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteClass(classItem.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClassesView;

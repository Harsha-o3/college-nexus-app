
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, User } from 'lucide-react';

interface TimeSlot {
  time: string;
  monday?: ClassInfo;
  tuesday?: ClassInfo;
  wednesday?: ClassInfo;
  thursday?: ClassInfo;
  friday?: ClassInfo;
  saturday?: ClassInfo;
}

interface ClassInfo {
  subject: string;
  faculty: string;
  room: string;
  type: 'lecture' | 'lab' | 'tutorial';
}

const TimetableView = () => {
  const timeSlots: TimeSlot[] = [
    {
      time: "9:00 - 10:00",
      monday: { subject: "Mathematics", faculty: "Dr. Smith", room: "Room 101", type: "lecture" },
      tuesday: { subject: "Physics", faculty: "Dr. Johnson", room: "Room 102", type: "lecture" },
      wednesday: { subject: "Chemistry", faculty: "Dr. Brown", room: "Lab 1", type: "lab" },
      thursday: { subject: "Mathematics", faculty: "Dr. Smith", room: "Room 101", type: "tutorial" },
      friday: { subject: "Computer Science", faculty: "Prof. Davis", room: "Lab 2", type: "lab" }
    },
    {
      time: "10:00 - 11:00",
      monday: { subject: "Physics", faculty: "Dr. Johnson", room: "Room 102", type: "lecture" },
      tuesday: { subject: "Chemistry", faculty: "Dr. Brown", room: "Room 103", type: "lecture" },
      wednesday: { subject: "Mathematics", faculty: "Dr. Smith", room: "Room 101", type: "lecture" },
      thursday: { subject: "Computer Science", faculty: "Prof. Davis", room: "Room 104", type: "lecture" },
      friday: { subject: "Physics", faculty: "Dr. Johnson", room: "Lab 3", type: "lab" }
    },
    {
      time: "11:00 - 12:00",
      monday: { subject: "Chemistry", faculty: "Dr. Brown", room: "Room 103", type: "lecture" },
      tuesday: { subject: "Computer Science", faculty: "Prof. Davis", room: "Room 104", type: "lecture" },
      wednesday: { subject: "Physics", faculty: "Dr. Johnson", room: "Room 102", type: "tutorial" },
      thursday: { subject: "Chemistry", faculty: "Dr. Brown", room: "Lab 1", type: "lab" },
      friday: { subject: "Mathematics", faculty: "Dr. Smith", room: "Room 101", type: "lecture" }
    },
    {
      time: "12:00 - 1:00",
      monday: { subject: "Break", faculty: "", room: "", type: "lecture" },
      tuesday: { subject: "Break", faculty: "", room: "", type: "lecture" },
      wednesday: { subject: "Break", faculty: "", room: "", type: "lecture" },
      thursday: { subject: "Break", faculty: "", room: "", type: "lecture" },
      friday: { subject: "Break", faculty: "", room: "", type: "lecture" }
    },
    {
      time: "1:00 - 2:00",
      monday: { subject: "Computer Science", faculty: "Prof. Davis", room: "Room 104", type: "lecture" },
      tuesday: { subject: "Mathematics", faculty: "Dr. Smith", room: "Room 101", type: "tutorial" },
      wednesday: { subject: "Computer Science", faculty: "Prof. Davis", room: "Lab 2", type: "lab" },
      thursday: { subject: "Physics", faculty: "Dr. Johnson", room: "Room 102", type: "lecture" },
      friday: { subject: "Chemistry", faculty: "Dr. Brown", room: "Room 103", type: "tutorial" }
    }
  ];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-blue-100 text-blue-800';
      case 'lab': return 'bg-green-100 text-green-800';
      case 'tutorial': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Class Timetable</h2>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          Current Semester
        </Badge>
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Class Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Badge className="bg-blue-100 text-blue-800">Lecture</Badge>
            <Badge className="bg-green-100 text-green-800">Lab</Badge>
            <Badge className="bg-purple-100 text-purple-800">Tutorial</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Timetable */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>Your complete class schedule for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-3 bg-gray-50 font-semibold text-left min-w-[120px]">Time</th>
                  {dayNames.map((day) => (
                    <th key={day} className="border p-3 bg-gray-50 font-semibold text-center min-w-[200px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, index) => (
                  <tr key={index}>
                    <td className="border p-3 bg-gray-50 font-medium">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {slot.time}
                      </div>
                    </td>
                    {days.map((day) => {
                      const classInfo = slot[day as keyof TimeSlot] as ClassInfo;
                      return (
                        <td key={day} className="border p-3">
                          {classInfo ? (
                            classInfo.subject === "Break" ? (
                              <div className="text-center text-gray-500 py-2">
                                <span className="font-medium">Lunch Break</span>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-sm">{classInfo.subject}</span>
                                  <Badge className={getTypeColor(classInfo.type)} variant="secondary">
                                    {classInfo.type}
                                  </Badge>
                                </div>
                                <div className="text-xs text-gray-600 space-y-1">
                                  <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    <span>{classInfo.faculty}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>{classInfo.room}</span>
                                  </div>
                                </div>
                              </div>
                            )
                          ) : (
                            <div className="text-center text-gray-400 py-4">-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimetableView;

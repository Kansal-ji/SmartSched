export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  phone?: string;
}

export type UserRole = 'tt_coordinator' | 'faculty' | 'student' | 'exam_incharge' | 'hod' | 'principal';

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  day: string;
  subject: string;
  faculty: string;
  room: string;
  type: 'theory' | 'lab' | 'practical';
  class: string;
  batch?: string;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  subjects: string[];
  maxHoursPerWeek: number;
  preferences?: string[];
  phone: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  type: 'theory' | 'lab';
  hoursPerWeek: number;
  department: string;
  semester: number;
}

export interface Room {
  id: string;
  name: string;
  type: 'classroom' | 'lab';
  capacity: number;
  equipment?: string[];
  department?: string;
}

export interface LeaveRequest {
  id: string;
  facultyId: string;
  facultyName: string;
  date: string;
  timeSlot: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  alternateArrangement?: {
    facultyId: string;
    facultyName: string;
    room: string;
  };
  submittedAt: string;
}

export interface PracticalExam {
  id: string;
  subject: string;
  date: string;
  timeSlot: string;
  duration: number;
  batch: string;
  lab: string;
  examiner: string;
  students: number;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  type: 'holiday' | 'exam' | 'event';
  description?: string;
}

export interface Notification {
  id: string;
  type: 'timetable_change' | 'leave_request' | 'exam_schedule' | 'arrangement';
  title: string;
  message: string;
  recipients: string[];
  sentAt: string;
  status: 'sent' | 'failed';
}
import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, Users, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { PracticalExam } from '../../types';

const PracticalExams: React.FC = () => {
  const [exams, setExams] = useState<PracticalExam[]>([
    {
      id: '1',
      subject: 'Database Management Lab',
      date: '2025-02-15',
      timeSlot: '09:00-11:00',
      duration: 120,
      batch: 'CSE 3A - Batch A',
      lab: 'Computer Lab 1',
      examiner: 'Dr. Sarah Johnson',
      students: 25
    },
    {
      id: '2',
      subject: 'Computer Networks Lab',
      date: '2025-02-15',
      timeSlot: '11:30-13:30',
      duration: 120,
      batch: 'CSE 3A - Batch B',
      lab: 'Computer Lab 2',
      examiner: 'Prof. Michael Chen',
      students: 27
    },
    {
      id: '3',
      subject: 'Software Engineering Lab',
      date: '2025-02-16',
      timeSlot: '09:00-11:00',
      duration: 120,
      batch: 'CSE 3B - Batch A',
      lab: 'Computer Lab 1',
      examiner: 'Dr. Emily Davis',
      students: 24
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newExam, setNewExam] = useState<Partial<PracticalExam>>({
    subject: '',
    date: '',
    timeSlot: '',
    duration: 120,
    batch: '',
    lab: '',
    examiner: '',
    students: 0
  });

  const addExam = () => {
    if (newExam.subject && newExam.date && newExam.timeSlot) {
      const exam: PracticalExam = {
        id: Date.now().toString(),
        subject: newExam.subject!,
        date: newExam.date!,
        timeSlot: newExam.timeSlot!,
        duration: newExam.duration || 120,
        batch: newExam.batch!,
        lab: newExam.lab!,
        examiner: newExam.examiner!,
        students: newExam.students || 0
      };
      setExams([...exams, exam]);
      setNewExam({
        subject: '',
        date: '',
        timeSlot: '',
        duration: 120,
        batch: '',
        lab: '',
        examiner: '',
        students: 0
      });
      setShowAddModal(false);
    }
  };

  const deleteExam = (id: string) => {
    setExams(exams.filter(e => e.id !== id));
  };

  const generateSchedule = () => {
    // Simulate AI schedule generation
    alert('AI is generating optimized practical exam schedule...');
  };

  const upcomingExams = exams.filter(exam => new Date(exam.date) >= new Date());
  const pastExams = exams.filter(exam => new Date(exam.date) < new Date());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Practical Exam Scheduler</h1>
          <p className="text-gray-600">Schedule and manage internal practical examinations</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={generateSchedule}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>AI Generate Schedule</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Exam</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{upcomingExams.length}</p>
              <p className="text-sm text-gray-600">Upcoming Exams</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {upcomingExams.reduce((sum, exam) => sum + exam.students, 0)}
              </p>
              <p className="text-sm text-gray-600">Students</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <MapPin className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-600">Labs Available</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Examiners</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Exams */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Practical Exams</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Subject</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date & Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Batch</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Lab</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Examiner</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Students</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcomingExams.map(exam => (
                <tr key={exam.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{exam.subject}</td>
                  <td className="py-3 px-4 text-gray-600">
                    <div>{new Date(exam.date).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-500">{exam.timeSlot}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{exam.batch}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{exam.lab}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{exam.examiner}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {exam.students}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-500">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteExam(exam.id)}
                        className="p-1 hover:bg-red-100 rounded text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exam Schedule Calendar View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Exam Schedule Calendar</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* This Week */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">This Week</h4>
            <div className="space-y-3">
              {upcomingExams.slice(0, 3).map(exam => (
                <div key={exam.id} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-gray-900">{exam.subject}</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(exam.date).toLocaleDateString()} • {exam.timeSlot}
                      </p>
                      <p className="text-sm text-gray-600">
                        {exam.batch} • {exam.lab}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-purple-700">{exam.examiner}</p>
                      <p className="text-xs text-purple-600">{exam.students} students</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lab Utilization */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Lab Utilization</h4>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">Computer Lab 1</span>
                  <span className="text-sm text-gray-600">85% utilized</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">Computer Lab 2</span>
                  <span className="text-sm text-gray-600">70% utilized</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">Software Lab</span>
                  <span className="text-sm text-gray-600">45% utilized</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Exam Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Practical Exam</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select
                  value={newExam.subject}
                  onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Subject</option>
                  <option value="Database Management Lab">Database Management Lab</option>
                  <option value="Computer Networks Lab">Computer Networks Lab</option>
                  <option value="Software Engineering Lab">Software Engineering Lab</option>
                  <option value="Web Development Lab">Web Development Lab</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newExam.date}
                  onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                <select
                  value={newExam.timeSlot}
                  onChange={(e) => setNewExam({ ...newExam, timeSlot: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Time</option>
                  <option value="09:00-11:00">09:00-11:00</option>
                  <option value="11:30-13:30">11:30-13:30</option>
                  <option value="14:30-16:30">14:30-16:30</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
                <select
                  value={newExam.batch}
                  onChange={(e) => setNewExam({ ...newExam, batch: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Batch</option>
                  <option value="CSE 3A - Batch A">CSE 3A - Batch A</option>
                  <option value="CSE 3A - Batch B">CSE 3A - Batch B</option>
                  <option value="CSE 3B - Batch A">CSE 3B - Batch A</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lab</label>
                <select
                  value={newExam.lab}
                  onChange={(e) => setNewExam({ ...newExam, lab: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Lab</option>
                  <option value="Computer Lab 1">Computer Lab 1</option>
                  <option value="Computer Lab 2">Computer Lab 2</option>
                  <option value="Software Lab">Software Lab</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Examiner</label>
                <select
                  value={newExam.examiner}
                  onChange={(e) => setNewExam({ ...newExam, examiner: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Examiner</option>
                  <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                  <option value="Prof. Michael Chen">Prof. Michael Chen</option>
                  <option value="Dr. Emily Davis">Dr. Emily Davis</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Students</label>
                <input
                  type="number"
                  value={newExam.students}
                  onChange={(e) => setNewExam({ ...newExam, students: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addExam}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Schedule Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticalExams;
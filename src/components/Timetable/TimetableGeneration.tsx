import React, { useState } from 'react';
import { Calendar, Clock, Users, BookOpen, Zap, Download, RefreshCw, CheckCircle } from 'lucide-react';
import { TimeSlot } from '../../types';

const TimetableGeneration: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTimetable, setGeneratedTimetable] = useState<TimeSlot[]>([]);
  const [selectedClass, setSelectedClass] = useState('CSE-3A');

  const mockTimeSlots: TimeSlot[] = [
    {
      id: '1',
      startTime: '09:00',
      endTime: '10:00',
      day: 'Monday',
      subject: 'Database Management',
      faculty: 'Dr. Sarah Johnson',
      room: 'Room 101',
      type: 'theory',
      class: 'CSE-3A'
    },
    {
      id: '2',
      startTime: '10:00',
      endTime: '11:00',
      day: 'Monday',
      subject: 'Computer Networks',
      faculty: 'Prof. Michael Chen',
      room: 'Room 102',
      type: 'theory',
      class: 'CSE-3A'
    },
    {
      id: '3',
      startTime: '11:30',
      endTime: '13:30',
      day: 'Monday',
      subject: 'DBMS Lab',
      faculty: 'Dr. Sarah Johnson',
      room: 'Lab 1',
      type: 'lab',
      class: 'CSE-3A',
      batch: 'Batch A'
    }
  ];

  const generateTimetable = async () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    setGeneratedTimetable(mockTimeSlots);
    setIsGenerating(false);
  };

  const timeSlots = ['09:00-10:00', '10:00-11:00', '11:00-11:30', '11:30-12:30', '12:30-13:30', '14:30-15:30', '15:30-16:30'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Timetable Generation</h1>
          <p className="text-gray-600">AI-powered scheduling with conflict resolution</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={generateTimetable}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Generate AI Timetable</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="CSE-3A">CSE 3rd Year - Section A</option>
                <option value="CSE-3B">CSE 3rd Year - Section B</option>
                <option value="ECE-2A">ECE 2nd Year - Section A</option>
                <option value="ME-1A">ME 1st Year - Section A</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Semester 5</option>
                <option>Semester 6</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>2024-25</option>
                <option>2025-26</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Parameters</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Faculty Preference Weight
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="70"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Optimization
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="80"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Load Balancing
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="90"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Constraints</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-gray-700">No back-to-back labs</span>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-gray-700">Faculty lunch break</span>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-gray-700">Room capacity check</span>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-gray-700">Morning preference</span>
            </div>
          </div>
        </div>
      </div>

      {/* Generation Status */}
      {isGenerating && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900">AI is generating your timetable...</h3>
              <div className="mt-2">
                <div className="text-sm text-blue-700 mb-2">Processing constraints and optimizing schedule</div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generated Timetable */}
      {generatedTimetable.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900">Generated Timetable - {selectedClass}</h3>
            </div>
            <div className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-lg">
              ✓ Conflict-free schedule generated
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                    Time Slot
                  </th>
                  {days.map(day => (
                    <th key={day} className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, index) => (
                  <tr key={slot} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b border-gray-200">
                      {slot}
                    </td>
                    {days.map(day => {
                      const timeSlot = generatedTimetable.find(
                        ts => ts.day === day && `${ts.startTime}-${ts.endTime}` === slot
                      );
                      
                      if (slot === '11:00-11:30') {
                        return (
                          <td key={`${day}-${slot}`} className="px-4 py-3 text-center text-sm text-gray-500 bg-yellow-50 border-b border-gray-200">
                            BREAK
                          </td>
                        );
                      }
                      
                      return (
                        <td key={`${day}-${slot}`} className="px-4 py-3 border-b border-gray-200">
                          {timeSlot ? (
                            <div className={`p-2 rounded-lg text-xs ${
                              timeSlot.type === 'lab' 
                                ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}>
                              <div className="font-semibold">{timeSlot.subject}</div>
                              <div className="opacity-75">{timeSlot.faculty}</div>
                              <div className="opacity-75">{timeSlot.room}</div>
                              {timeSlot.batch && (
                                <div className="opacity-75">{timeSlot.batch}</div>
                              )}
                            </div>
                          ) : (
                            <div className="text-center text-gray-400 text-xs">Free</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Statistics */}
      {generatedTimetable.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">32</p>
                <p className="text-sm text-gray-600">Total Hours/Week</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">Subjects</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Faculty Involved</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Conflicts</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableGeneration;
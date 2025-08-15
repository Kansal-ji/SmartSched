import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Clock, BookOpen, Calendar, Award } from 'lucide-react';

const Analytics: React.FC = () => {
  const facultyWorkloadData = [
    { name: 'Dr. Sarah Johnson', hours: 22, maxHours: 24 },
    { name: 'Prof. Michael Chen', hours: 18, maxHours: 24 },
    { name: 'Dr. Emily Davis', hours: 20, maxHours: 24 },
    { name: 'Prof. David Wilson', hours: 16, maxHours: 24 },
    { name: 'Dr. Lisa Zhang', hours: 19, maxHours: 24 }
  ];

  const roomUtilizationData = [
    { name: 'Room 101', value: 85 },
    { name: 'Room 102', value: 78 },
    { name: 'Lab 1', value: 92 },
    { name: 'Lab 2', value: 67 },
    { name: 'Room 103', value: 71 }
  ];

  const departmentStatsData = [
    { department: 'CSE', classes: 45, faculty: 12, utilization: 87 },
    { department: 'ECE', classes: 38, faculty: 10, utilization: 82 },
    { department: 'ME', classes: 32, faculty: 8, utilization: 75 },
    { department: 'CE', classes: 28, faculty: 7, utilization: 68 }
  ];

  const weeklyTrendData = [
    { week: 'Week 1', scheduled: 156, completed: 152, cancelled: 4 },
    { week: 'Week 2', scheduled: 162, completed: 158, cancelled: 4 },
    { week: 'Week 3', scheduled: 159, completed: 154, cancelled: 5 },
    { week: 'Week 4', scheduled: 164, completed: 162, cancelled: 2 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
        <p className="text-gray-600">Comprehensive insights into your scheduling system</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
              <p className="text-sm text-gray-600">Schedule Efficiency</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">87%</p>
              <p className="text-sm text-gray-600">Faculty Utilization</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">2.3</p>
              <p className="text-sm text-gray-600">Avg. Conflicts/Week</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">98%</p>
              <p className="text-sm text-gray-600">Class Completion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Faculty Workload */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Faculty Workload Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={facultyWorkloadData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#3B82F6" name="Current Hours" />
              <Bar dataKey="maxHours" fill="#E5E7EB" name="Max Hours" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Room Utilization */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Utilization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roomUtilizationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {roomUtilizationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Statistics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Classes</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Faculty Count</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Utilization</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Performance</th>
              </tr>
            </thead>
            <tbody>
              {departmentStatsData.map((dept, index) => (
                <tr key={dept.department} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{dept.department}</td>
                  <td className="py-3 px-4 text-gray-600">{dept.classes}</td>
                  <td className="py-3 px-4 text-gray-600">{dept.faculty}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${dept.utilization}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{dept.utilization}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {dept.utilization >= 85 ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Excellent
                      </span>
                    ) : dept.utilization >= 75 ? (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Good
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        Needs Improvement
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="scheduled" stroke="#3B82F6" strokeWidth={2} name="Scheduled" />
            <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} name="Completed" />
            <Line type="monotone" dataKey="cancelled" stroke="#EF4444" strokeWidth={2} name="Cancelled" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">High Efficiency</p>
                <p className="text-sm text-blue-700">Schedule efficiency improved by 12% this month</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <Award className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900">Best Performance</p>
                <p className="text-sm text-green-700">CSE department leads in utilization at 87%</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Peak Hours</p>
                <p className="text-sm text-yellow-700">10-12 AM slots have highest booking rates</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
          <div className="space-y-4">
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm font-medium text-purple-900 mb-1">Optimize Lab Usage</p>
              <p className="text-sm text-purple-700">Consider splitting large lab sessions for better utilization</p>
            </div>
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
              <p className="text-sm font-medium text-indigo-900 mb-1">Faculty Rebalancing</p>
              <p className="text-sm text-indigo-700">Redistribute 3 hours from Dr. Johnson to Prof. Wilson</p>
            </div>
            <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
              <p className="text-sm font-medium text-cyan-900 mb-1">Room Optimization</p>
              <p className="text-sm text-cyan-700">Room 103 can accommodate 2 more classes per week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
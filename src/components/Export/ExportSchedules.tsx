import React, { useState } from 'react';
import { Download, FileText, Calendar, Users, BookOpen, Printer, Mail } from 'lucide-react';

const ExportSchedules: React.FC = () => {
  const [selectedExportType, setSelectedExportType] = useState('timetable');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedClass, setSelectedClass] = useState('CSE-3A');
  const [selectedFaculty, setSelectedFaculty] = useState('all');
  const [dateRange, setDateRange] = useState({
    startDate: '2025-01-01',
    endDate: '2025-06-30'
  });

  const exportTypes = [
    { id: 'timetable', label: 'Class Timetables', icon: Calendar, description: 'Export class-wise timetables' },
    { id: 'faculty', label: 'Faculty Schedules', icon: Users, description: 'Export faculty-wise schedules' },
    { id: 'room', label: 'Room Schedules', icon: BookOpen, description: 'Export room/lab utilization' },
    { id: 'exam', label: 'Exam Schedules', icon: FileText, description: 'Export practical exam schedules' }
  ];

  const handleExport = () => {
    // Simulate export process
    const exportData = {
      type: selectedExportType,
      format: selectedFormat,
      class: selectedClass,
      faculty: selectedFaculty,
      dateRange
    };
    
    console.log('Exporting:', exportData);
    
    // Create a mock download
    const filename = `${selectedExportType}_schedule_${new Date().toISOString().split('T')[0]}.${selectedFormat}`;
    alert(`Exporting ${filename}...`);
    
    // In a real app, this would trigger the actual download
    setTimeout(() => {
      alert(`${filename} has been downloaded successfully!`);
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    alert('Schedule has been sent via email!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Export Schedules</h1>
        <p className="text-gray-600">Download timetables and schedules in various formats</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Export Type Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Export Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.id}
                    onClick={() => setSelectedExportType(type.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedExportType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-6 h-6 ${selectedExportType === type.id ? 'text-blue-600' : 'text-gray-400'}`} />
                      <div>
                        <h4 className={`font-medium ${selectedExportType === type.id ? 'text-blue-900' : 'text-gray-900'}`}>
                          {type.label}
                        </h4>
                        <p className={`text-sm ${selectedExportType === type.id ? 'text-blue-700' : 'text-gray-500'}`}>
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters & Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedExportType === 'timetable' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Classes</option>
                    <option value="CSE-3A">CSE 3rd Year - Section A</option>
                    <option value="CSE-3B">CSE 3rd Year - Section B</option>
                    <option value="ECE-2A">ECE 2nd Year - Section A</option>
                    <option value="ME-1A">ME 1st Year - Section A</option>
                  </select>
                </div>
              )}

              {selectedExportType === 'faculty' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Faculty</label>
                  <select
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Faculty</option>
                    <option value="dr-sarah">Dr. Sarah Johnson</option>
                    <option value="prof-michael">Prof. Michael Chen</option>
                    <option value="dr-emily">Dr. Emily Davis</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Format Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Format</h3>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value="pdf"
                  checked={selectedFormat === 'pdf'}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">PDF</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value="excel"
                  checked={selectedFormat === 'excel'}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Excel</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={selectedFormat === 'csv'}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">CSV</span>
              </label>
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Actions</h3>
            <div className="space-y-3">
              <button
                onClick={handleExport}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download {selectedFormat.toUpperCase()}</span>
              </button>
              
              <button
                onClick={handlePrint}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <Printer className="w-5 h-5" />
                <span>Print Schedule</span>
              </button>
              
              <button
                onClick={handleEmail}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Email Schedule</span>
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Preview</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Type:</strong> {exportTypes.find(t => t.id === selectedExportType)?.label}</p>
              <p><strong>Format:</strong> {selectedFormat.toUpperCase()}</p>
              {selectedExportType === 'timetable' && (
                <p><strong>Class:</strong> {selectedClass === 'all' ? 'All Classes' : selectedClass}</p>
              )}
              {selectedExportType === 'faculty' && (
                <p><strong>Faculty:</strong> {selectedFaculty === 'all' ? 'All Faculty' : selectedFaculty}</p>
              )}
              <p><strong>Date Range:</strong> {dateRange.startDate} to {dateRange.endDate}</p>
            </div>
          </div>

          {/* Recent Exports */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Exports</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">CSE-3A Timetable</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <Download className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Faculty Schedules</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
                <Download className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Exam Schedule</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
                <Download className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportSchedules;
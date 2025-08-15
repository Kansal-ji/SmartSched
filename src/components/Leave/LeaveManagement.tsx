import React, { useState } from 'react';
import { User, Clock, CheckCircle, XCircle, AlertCircle, Users, Calendar } from 'lucide-react';
import { LeaveRequest } from '../../types';

const LeaveManagement: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      facultyId: '1',
      facultyName: 'Dr. Sarah Johnson',
      date: '2025-01-28',
      timeSlot: '10:00-11:00',
      reason: 'Medical appointment',
      status: 'pending',
      submittedAt: '2025-01-25T10:30:00Z'
    },
    {
      id: '2',
      facultyId: '2',
      facultyName: 'Prof. Michael Chen',
      date: '2025-01-29',
      timeSlot: '14:30-15:30',
      reason: 'Conference attendance',
      status: 'approved',
      alternateArrangement: {
        facultyId: '3',
        facultyName: 'Dr. Emily Davis',
        room: 'Room 102'
      },
      submittedAt: '2025-01-24T14:15:00Z'
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [showArrangementModal, setShowArrangementModal] = useState(false);

  const approveLeave = (id: string) => {
    setLeaveRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status: 'approved' as const } : req)
    );
  };

  const rejectLeave = (id: string) => {
    setLeaveRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status: 'rejected' as const } : req)
    );
  };

  const getStatusIcon = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const pendingRequests = leaveRequests.filter(req => req.status === 'pending');
  const processedRequests = leaveRequests.filter(req => req.status !== 'pending');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leave Management</h1>
          <p className="text-gray-600">Manage faculty leave requests and arrangements</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-2 rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">
              {pendingRequests.length} pending requests
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingRequests.length}</p>
              <p className="text-sm text-gray-600">Pending Requests</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {leaveRequests.filter(r => r.status === 'approved').length}
              </p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Arrangements Made</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">This Week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Leave Requests</h3>
          <div className="space-y-4">
            {pendingRequests.map(request => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{request.facultyName}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>{new Date(request.date).toLocaleDateString()}</span>
                        <span>{request.timeSlot}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {request.reason}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowArrangementModal(true);
                      }}
                      className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      Arrange
                    </button>
                    <button 
                      onClick={() => approveLeave(request.id)}
                      className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => rejectLeave(request.id)}
                      className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Faculty</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date & Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Reason</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Arrangement</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map(request => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900">{request.facultyName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    <div>{new Date(request.date).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-500">{request.timeSlot}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{request.reason}</td>
                  <td className="py-3 px-4">
                    <div className={`inline-flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="capitalize">{request.status}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {request.alternateArrangement ? (
                      <div className="text-sm">
                        <div>{request.alternateArrangement.facultyName}</div>
                        <div className="text-gray-500">{request.alternateArrangement.room}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Arrangement Modal */}
      {showArrangementModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Arrange Substitute</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Faculty:</strong> {selectedRequest.facultyName}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Date & Time:</strong> {new Date(selectedRequest.date).toLocaleDateString()} at {selectedRequest.timeSlot}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Faculty</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Dr. Emily Davis (Computer Networks)</option>
                  <option>Prof. David Wilson (Database Systems)</option>
                  <option>Dr. Lisa Zhang (Software Engineering)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alternative Room</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Room 102 (Available)</option>
                  <option>Room 105 (Available)</option>
                  <option>Lab 2 (Available)</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-700">
                  <strong>AI Suggestion:</strong> Dr. Emily Davis is available and has taught Computer Networks before. Room 102 is available and suitable for the class size.
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowArrangementModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Add arrangement logic here
                  approveLeave(selectedRequest.id);
                  setShowArrangementModal(false);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Confirm Arrangement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;
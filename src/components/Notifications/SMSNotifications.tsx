import React, { useState } from 'react';
import { MessageSquare, Send, Users, Clock, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { Notification } from '../../types';

const SMSNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'timetable_change',
      title: 'Timetable Update',
      message: 'Your DBMS class for 10:00 AM on Thu has been rescheduled to Lab 2.',
      recipients: ['faculty', 'students'],
      sentAt: '2025-01-25T10:30:00Z',
      status: 'sent'
    },
    {
      id: '2',
      type: 'exam_schedule',
      title: 'Practical Exam Alert',
      message: 'Internal practical exam for DBMS is on Aug 14, 09:00 AM, Lab 1. Be prepared.',
      recipients: ['students'],
      sentAt: '2025-01-25T09:15:00Z',
      status: 'sent'
    },
    {
      id: '3',
      type: 'arrangement',
      title: 'Class Arrangement',
      message: 'Dr. Seema will take your CN class tomorrow at 11:15 AM.',
      recipients: ['students'],
      sentAt: '2025-01-24T16:45:00Z',
      status: 'sent'
    }
  ]);

  const [smsSettings, setSmsSettings] = useState({
    enableTimetableUpdates: true,
    enableLeaveNotifications: true,
    enableExamAlerts: true,
    enableArrangements: true,
    dailySummary: false,
    instantAlerts: true
  });

  const [newMessage, setNewMessage] = useState({
    type: 'timetable_change' as Notification['type'],
    title: '',
    message: '',
    recipients: [] as string[]
  });

  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const sendMessage = () => {
    if (newMessage.title && newMessage.message && newMessage.recipients.length > 0) {
      const notification: Notification = {
        id: Date.now().toString(),
        type: newMessage.type,
        title: newMessage.title,
        message: newMessage.message,
        recipients: newMessage.recipients,
        sentAt: new Date().toISOString(),
        status: 'sent'
      };
      setNotifications([notification, ...notifications]);
      setNewMessage({
        type: 'timetable_change',
        title: '',
        message: '',
        recipients: []
      });
      setShowComposeModal(false);
    }
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'timetable_change': return '📅';
      case 'leave_request': return '❌';
      case 'exam_schedule': return '🧪';
      case 'arrangement': return '🔁';
      default: return '📢';
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'timetable_change': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'leave_request': return 'bg-red-100 text-red-800 border-red-200';
      case 'exam_schedule': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'arrangement': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const stats = {
    totalSent: notifications.length,
    thisWeek: notifications.filter(n => {
      const sentDate = new Date(n.sentAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return sentDate >= weekAgo;
    }).length,
    quota: { used: 847, total: 1000 }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SMS Notifications</h1>
          <p className="text-gray-600">Manage automated SMS alerts to faculty and students</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button 
            onClick={() => setShowComposeModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Compose SMS</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <MessageSquare className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSent}</p>
              <p className="text-sm text-gray-600">Total Messages</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.thisWeek}</p>
              <p className="text-sm text-gray-600">This Week</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">247</p>
              <p className="text-sm text-gray-600">Recipients</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.quota.used}/{stats.quota.total}</p>
              <p className="text-sm text-gray-600">SMS Quota</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quota Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-6 h-6 text-yellow-600" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-yellow-800">SMS Quota Status</h3>
            <p className="text-yellow-700">
              {stats.quota.used} of {stats.quota.total} SMS messages used this month 
              ({Math.round((stats.quota.used / stats.quota.total) * 100)}%)
            </p>
            <div className="w-full bg-yellow-200 rounded-full h-2 mt-2">
              <div 
                className="bg-yellow-600 h-2 rounded-full" 
                style={{ width: `${(stats.quota.used / stats.quota.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
        <div className="space-y-4">
          {notifications.map(notification => (
            <div key={notification.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{getTypeIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(notification.type)}`}>
                        {notification.type.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{notification.message}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>
                        Sent to: {notification.recipients.join(', ')}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(notification.sentAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {notification.status === 'sent' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Message Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">📅 Timetable Change</h4>
            <p className="text-sm text-blue-700">
              "Your [SUBJECT] class for [TIME] on [DAY] has been rescheduled to [NEW_LOCATION]."
            </p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">🧪 Exam Alert</h4>
            <p className="text-sm text-purple-700">
              "Internal practical exam for [SUBJECT] is on [DATE], [TIME], [LAB]. Be prepared."
            </p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">🔁 Class Arrangement</h4>
            <p className="text-sm text-green-700">
              "[SUBSTITUTE_FACULTY] will take your [SUBJECT] class [WHEN] at [TIME]."
            </p>
          </div>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-900 mb-2">❌ Class Cancellation</h4>
            <p className="text-sm text-red-700">
              "Your [SUBJECT] class scheduled for [TIME] on [DATE] has been cancelled."
            </p>
          </div>
        </div>
      </div>

      {/* Compose Message Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compose SMS Message</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message Type</label>
                <select
                  value={newMessage.type}
                  onChange={(e) => setNewMessage({ ...newMessage, type: e.target.value as Notification['type'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="timetable_change">Timetable Change</option>
                  <option value="exam_schedule">Exam Schedule</option>
                  <option value="arrangement">Class Arrangement</option>
                  <option value="leave_request">Leave Request</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newMessage.title}
                  onChange={(e) => setNewMessage({ ...newMessage, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Message title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={newMessage.message}
                  onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Type your message here..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newMessage.recipients.includes('faculty')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewMessage({ ...newMessage, recipients: [...newMessage.recipients, 'faculty'] });
                        } else {
                          setNewMessage({ ...newMessage, recipients: newMessage.recipients.filter(r => r !== 'faculty') });
                        }
                      }}
                      className="rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Faculty</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newMessage.recipients.includes('students')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewMessage({ ...newMessage, recipients: [...newMessage.recipients, 'students'] });
                        } else {
                          setNewMessage({ ...newMessage, recipients: newMessage.recipients.filter(r => r !== 'students') });
                        }
                      }}
                      className="rounded"
                    />
                    
                    <span className="ml-2 text-sm text-gray-700">Students</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowComposeModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SMS Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Timetable Updates</span>
                <input
                  type="checkbox"
                  checked={smsSettings.enableTimetableUpdates}
                  onChange={(e) => setSmsSettings({ ...smsSettings, enableTimetableUpdates: e.target.checked })}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Leave Notifications</span>
                <input
                  type="checkbox"
                  checked={smsSettings.enableLeaveNotifications}
                  onChange={(e) => setSmsSettings({ ...smsSettings, enableLeaveNotifications: e.target.checked })}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Exam Alerts</span>
                <input
                  type="checkbox"
                  checked={smsSettings.enableExamAlerts}
                  onChange={(e) => setSmsSettings({ ...smsSettings, enableExamAlerts: e.target.checked })}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Class Arrangements</span>
                <input
                  type="checkbox"
                  checked={smsSettings.enableArrangements}
                  onChange={(e) => setSmsSettings({ ...smsSettings, enableArrangements: e.target.checked })}
                  className="rounded"
                />
              </div>
              <hr className="my-4" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Daily Summary</span>
                <input
                  type="checkbox"
                  checked={smsSettings.dailySummary}
                  onChange={(e) => setSmsSettings({ ...smsSettings, dailySummary: e.target.checked })}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Instant Alerts</span>
                <input
                  type="checkbox"
                  checked={smsSettings.instantAlerts}
                  onChange={(e) => setSmsSettings({ ...smsSettings, instantAlerts: e.target.checked })}
                  className="rounded"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SMSNotifications;
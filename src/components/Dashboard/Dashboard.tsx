import React from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Plus,
  FileText,
  Settings
} from 'lucide-react';
import StatsCard from './StatsCard';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardProps {
  onSectionChange?: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSectionChange }) => {
  const { user } = useAuth();

  const getTitleByRole = () => {
    switch (user?.role) {
      case 'tt_coordinator':
        return 'Timetable Coordinator Dashboard';
      case 'faculty':
        return 'Faculty Dashboard';
      case 'student':
        return 'Student Dashboard';
      case 'exam_incharge':
        return 'Exam In-Charge Dashboard';
      case 'hod':
        return 'HOD Dashboard';
      case 'principal':
        return 'Principal Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'tt_coordinator':
        return [
          { title: 'Active Timetables', value: '12', change: '+2 this week', changeType: 'positive' as const, icon: Calendar, color: 'blue' as const },
          { title: 'Pending Leave Requests', value: '5', change: '-3 from yesterday', changeType: 'positive' as const, icon: Clock, color: 'yellow' as const },
          { title: 'Faculty Members', value: '48', change: '+2 new hires', changeType: 'positive' as const, icon: Users, color: 'green' as const },
          { title: 'Scheduled Exams', value: '23', change: '8 this week', changeType: 'neutral' as const, icon: BookOpen, color: 'purple' as const },
        ];
      case 'faculty':
        return [
          { title: 'Classes This Week', value: '18', change: '2 rescheduled', changeType: 'neutral' as const, icon: Calendar, color: 'blue' as const },
          { title: 'Pending Leaves', value: '1', change: 'Awaiting approval', changeType: 'neutral' as const, icon: Clock, color: 'yellow' as const },
          { title: 'Total Students', value: '156', change: 'Across 4 classes', changeType: 'neutral' as const, icon: Users, color: 'green' as const },
          { title: 'Exam Duties', value: '3', change: 'Next week', changeType: 'neutral' as const, icon: BookOpen, color: 'purple' as const },
        ];
      case 'student':
        return [
          { title: 'Classes This Week', value: '24', change: '1 cancelled', changeType: 'neutral' as const, icon: Calendar, color: 'blue' as const },
          { title: 'Upcoming Exams', value: '3', change: 'Next 2 weeks', changeType: 'neutral' as const, icon: BookOpen, color: 'purple' as const },
          { title: 'Attendance', value: '87%', change: '+2% this month', changeType: 'positive' as const, icon: CheckCircle, color: 'green' as const },
          { title: 'Assignments Due', value: '5', change: '2 this week', changeType: 'neutral' as const, icon: FileText, color: 'yellow' as const },
        ];
      case 'exam_incharge':
        return [
          { title: 'Scheduled Exams', value: '15', change: '3 this week', changeType: 'neutral' as const, icon: BookOpen, color: 'purple' as const },
          { title: 'Lab Utilization', value: '78%', change: '+5% this week', changeType: 'positive' as const, icon: TrendingUp, color: 'green' as const },
          { title: 'Examiners Assigned', value: '12', change: 'All slots covered', changeType: 'positive' as const, icon: Users, color: 'blue' as const },
          { title: 'Pending Reviews', value: '2', change: 'Due today', changeType: 'neutral' as const, icon: Clock, color: 'yellow' as const },
        ];
      case 'hod':
        return [
          { title: 'Department Classes', value: '89', change: '+7 this semester', changeType: 'positive' as const, icon: Calendar, color: 'blue' as const },
          { title: 'Faculty Workload', value: '85%', change: 'Well balanced', changeType: 'positive' as const, icon: Users, color: 'green' as const },
          { title: 'Lab Utilization', value: '92%', change: '+8% this month', changeType: 'positive' as const, icon: BookOpen, color: 'purple' as const },
          { title: 'Leave Requests', value: '3', change: 'Pending approval', changeType: 'neutral' as const, icon: Clock, color: 'yellow' as const },
        ];
      case 'principal':
        return [
          { title: 'Total Classes', value: '456', change: '+15 this semester', changeType: 'positive' as const, icon: Calendar, color: 'blue' as const },
          { title: 'Overall Efficiency', value: '94%', change: '+3% this month', changeType: 'positive' as const, icon: TrendingUp, color: 'green' as const },
          { title: 'Faculty Count', value: '127', change: '+5 new hires', changeType: 'positive' as const, icon: Users, color: 'purple' as const },
          { title: 'System Alerts', value: '2', change: 'Requires attention', changeType: 'neutral' as const, icon: AlertCircle, color: 'yellow' as const },
        ];
      default:
        return [
          { title: 'Total Classes', value: '156', change: '+12% from last month', changeType: 'positive' as const, icon: Calendar, color: 'blue' as const },
          { title: 'Faculty Utilization', value: '87%', change: '+5% this week', changeType: 'positive' as const, icon: TrendingUp, color: 'green' as const },
          { title: 'Lab Bookings', value: '234', change: '18 today', changeType: 'neutral' as const, icon: BookOpen, color: 'purple' as const },
          { title: 'Active Notifications', value: '12', change: '4 sent today', changeType: 'neutral' as const, icon: MessageSquare, color: 'yellow' as const },
        ];
    }
  };

  const getQuickActionsForRole = () => {
    switch (user?.role) {
      case 'tt_coordinator':
        return [
          { 
            icon: Calendar, 
            label: 'Generate New Timetable', 
            color: 'blue',
            action: () => onSectionChange?.('timetable')
          },
          { 
            icon: CheckCircle, 
            label: 'Approve Leave Requests', 
            color: 'green',
            action: () => onSectionChange?.('leave-management')
          },
          { 
            icon: BookOpen, 
            label: 'Schedule Practical Exams', 
            color: 'purple',
            action: () => onSectionChange?.('practical-exams')
          },
          { 
            icon: MessageSquare, 
            label: 'Send SMS Notifications', 
            color: 'yellow',
            action: () => onSectionChange?.('notifications')
          }
        ];
      case 'faculty':
        return [
          { 
            icon: Calendar, 
            label: 'View My Schedule', 
            color: 'blue',
            action: () => onSectionChange?.('my-schedule')
          },
          { 
            icon: Clock, 
            label: 'Request Leave', 
            color: 'yellow',
            action: () => onSectionChange?.('leave-request')
          },
          { 
            icon: MessageSquare, 
            label: 'View Notifications', 
            color: 'green',
            action: () => onSectionChange?.('notifications')
          },
          { 
            icon: Settings, 
            label: 'Update Profile', 
            color: 'purple',
            action: () => onSectionChange?.('settings')
          }
        ];
      case 'student':
        return [
          { 
            icon: Calendar, 
            label: 'View Class Schedule', 
            color: 'blue',
            action: () => onSectionChange?.('class-schedule')
          },
          { 
            icon: BookOpen, 
            label: 'Check Exam Schedule', 
            color: 'purple',
            action: () => onSectionChange?.('exam-schedule')
          },
          { 
            icon: MessageSquare, 
            label: 'View Updates', 
            color: 'green',
            action: () => onSectionChange?.('notifications')
          },
          { 
            icon: FileText, 
            label: 'Download Timetable', 
            color: 'yellow',
            action: () => alert('Timetable downloaded!')
          }
        ];
      case 'exam_incharge':
        return [
          { 
            icon: BookOpen, 
            label: 'Schedule New Exam', 
            color: 'purple',
            action: () => onSectionChange?.('practical-exams')
          },
          { 
            icon: TrendingUp, 
            label: 'View Exam Reports', 
            color: 'green',
            action: () => onSectionChange?.('exam-analytics')
          },
          { 
            icon: Users, 
            label: 'Assign Examiners', 
            color: 'blue',
            action: () => onSectionChange?.('practical-exams')
          },
          { 
            icon: MessageSquare, 
            label: 'Send Exam Alerts', 
            color: 'yellow',
            action: () => onSectionChange?.('notifications')
          }
        ];
      case 'hod':
        return [
          { 
            icon: TrendingUp, 
            label: 'Department Analytics', 
            color: 'green',
            action: () => onSectionChange?.('department-analytics')
          },
          { 
            icon: Users, 
            label: 'Faculty Workload', 
            color: 'blue',
            action: () => onSectionChange?.('faculty-workload')
          },
          { 
            icon: FileText, 
            label: 'Export Reports', 
            color: 'purple',
            action: () => onSectionChange?.('exports')
          },
          { 
            icon: CheckCircle, 
            label: 'Approve Requests', 
            color: 'yellow',
            action: () => alert('No pending requests')
          }
        ];
      case 'principal':
        return [
          { 
            icon: TrendingUp, 
            label: 'Institution Overview', 
            color: 'green',
            action: () => onSectionChange?.('overview')
          },
          { 
            icon: BarChart3, 
            label: 'View Analytics', 
            color: 'blue',
            action: () => onSectionChange?.('analytics')
          },
          { 
            icon: FileText, 
            label: 'Export Reports', 
            color: 'purple',
            action: () => onSectionChange?.('exports')
          },
          { 
            icon: Settings, 
            label: 'System Settings', 
            color: 'yellow',
            action: () => onSectionChange?.('settings')
          }
        ];
      default:
        return [];
    }
  };

  const quickActions = getQuickActionsForRole();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{getTitleByRole()}</h1>
        <p className="text-gray-600">
          Overview of your academic scheduling system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getStatsForRole().map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const colorClasses = {
                blue: 'bg-blue-50 hover:bg-blue-100 text-blue-700',
                green: 'bg-green-50 hover:bg-green-100 text-green-700',
                purple: 'bg-purple-50 hover:bg-purple-100 text-purple-700',
                yellow: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700'
              };
              
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${colorClasses[action.color as keyof typeof colorClasses]}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Timetable updated for CSE 3rd Year
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Leave request approved for Dr. Smith
                </p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Practical exam scheduled for DBMS Lab
                </p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-3">
          <AlertCircle className="w-6 h-6 text-yellow-600" />
          <h3 className="text-lg font-semibold text-yellow-800">System Alerts</h3>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-yellow-700">
            • 3 classrooms require maintenance scheduling
          </p>
          <p className="text-sm text-yellow-700">
            • Faculty workload balancing needed for next semester
          </p>
          <p className="text-sm text-yellow-700">
            • SMS notification quota: 847/1000 remaining this month
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('smartsched_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - determine role based on email
    let role: UserRole = 'faculty';
    let name = 'User';
    let department = 'General';

    if (email.includes('coordinator')) {
      role = 'tt_coordinator';
      name = 'Dr. Sarah Johnson';
      department = 'Computer Science';
    } else if (email.includes('faculty')) {
      role = 'faculty';
      name = 'Prof. Michael Chen';
      department = 'Computer Science';
    } else if (email.includes('student')) {
      role = 'student';
      name = 'John Smith';
      department = 'Computer Science';
    } else if (email.includes('examiner')) {
      role = 'exam_incharge';
      name = 'Dr. Emily Davis';
      department = 'Computer Science';
    } else if (email.includes('hod')) {
      role = 'hod';
      name = 'Prof. David Wilson';
      department = 'Computer Science';
    } else if (email.includes('principal')) {
      role = 'principal';
      name = 'Dr. Lisa Zhang';
      department = 'Administration';
    }

    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      department,
      phone: '+1-555-0123'
    };
    
    setUser(mockUser);
    localStorage.setItem('smartsched_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartsched_user');
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('smartsched_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
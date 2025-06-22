
import { useState } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import DashboardRouter from '@/components/dashboard/DashboardRouter';

const Index = () => {
  const [user, setUser] = useState(null);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {!user ? (
          <LoginForm onLogin={setUser} />
        ) : (
          <DashboardRouter user={user} onLogout={() => setUser(null)} />
        )}
      </div>
    </AuthProvider>
  );
};

export default Index;

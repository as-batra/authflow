import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/api/user/profile');
        setProfile(data.user);
      } catch (err) {
        setFetchError(err.response?.data?.message || 'Failed to load profile.');
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const displayUser = profile || user;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <span className="text-indigo-600 font-bold text-lg tracking-tight">DevAuth</span>
          <button onClick={handleLogout} className="btn-secondary text-sm py-1.5 px-4">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Welcome banner */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome,{' '}
            <span className="text-indigo-600">{displayUser?.name || 'there'}</span>! 👋
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Here's your account overview.</p>
        </div>

        {fetchError && <p className="error-msg mb-6">{fetchError}</p>}

        {loadingProfile ? (
          <div className="flex items-center gap-3 text-gray-400">
            <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Loading profile…</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Profile card */}
            <div className="card">
              <div className="flex items-center gap-4 mb-5">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl flex-shrink-0">
                  {displayUser?.name?.charAt(0).toUpperCase() || '?'}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 text-lg leading-tight">
                    {displayUser?.name}
                  </h2>
                  <p className="text-gray-500 text-sm">{displayUser?.email}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">User ID</span>
                  <span className="text-gray-700 font-mono text-xs truncate max-w-[160px]">
                    {displayUser?.id || displayUser?._id}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Email</span>
                  <span className="text-gray-700">{displayUser?.email}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500 font-medium">Member since</span>
                  <span className="text-gray-700">{formatDate(displayUser?.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Status card */}
            <div className="card flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Account Status</h3>
                <p className="text-gray-500 text-sm mb-4">Your account is active and verified.</p>

                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    Active
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full border border-indigo-200">
                    JWT Authenticated
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Authenticated via JSON Web Token. Token stored securely in localStorage.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

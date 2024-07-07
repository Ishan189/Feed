'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const AboutPage = () => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (session) {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(`/api/user/${session.user.email}`);
          setUserInfo(response.data.user);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
      fetchUserInfo();
    }
  }, [session]);

  if (!session) {
    return <p>Please sign in to view your information.</p>;
  }

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">About Me</h1>
      <p><strong>Username:</strong> {userInfo.username}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default AboutPage;

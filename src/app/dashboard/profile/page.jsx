"use client";
import { getCall } from '@/utils/apiCall';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Replace with your actual API call
                const response = await getCall('profile');
                console.log(response);

                if (response.data.status === 200) {
                    setProfile(response.data.data);
                } else {
                    throw new Error(data.message || 'Failed to fetch profile');
                }
            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong>Error:</strong> {error}
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    No profile data found
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-blue-600 text-4xl font-bold">
                                    {profile.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{profile.name}</h1>
                                <p className="text-blue-100">{profile.email}</p>
                                <span className="inline-block mt-2 px-3 py-1 bg-blue-400 bg-opacity-20 rounded-full text-sm">
                                    {profile.userType.charAt(0).toUpperCase() + profile.userType.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h2>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <p className="font-medium">{profile.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Username</p>
                                        <p className="font-medium">@{profile.userName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium">{profile.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Mobile</p>
                                        <p className="font-medium">{profile.mobile}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Account Information */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Account Information</h2>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">User ID</p>
                                        <p className="font-medium text-sm text-gray-600">{profile._id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Account Type</p>
                                        <p className="font-medium capitalize">{profile.userType}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Member Since</p>
                                        <p className="font-medium">--</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-wrap gap-3">
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span>Edit Profile</span>
                            </button>
                            <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>Change Password</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
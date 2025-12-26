import { router } from "expo-router";
import { ArrowLeft, Book, BookOpen, Calendar, GraduationCap, LogOut, Mail, MapPin, Phone, Target, User, Users } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/authContext";

export default function UserScreen() {
  const { logout, user: authUser, userProfile, selectedRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    console.log("📊 UserScreen - Auth User:", authUser);
    console.log("📊 UserScreen - User Profile:", userProfile);
    console.log("📊 UserScreen - Selected Role:", selectedRole);
    
    if (authUser && userProfile) {
      // We have both auth user and profile data
      setProfileData(userProfile);
      setLoading(false);
    } else if (authUser && !userProfile) {
      // We have auth user but no profile yet
      console.log(" Waiting for profile data...");
      // You might want to fetch it manually here if needed
      setLoading(false);
    } else {
      // No user logged in
      setLoading(false);
    }
  }, [authUser, userProfile]);

  const handleLogOut = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text className="text-white mt-4">Loading profile...</Text>
      </View>
    );
  }

  if (!authUser) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-white text-lg mb-4">No user logged in</Text>
        <TouchableOpacity 
          onPress={() => router.replace("/login")}
          className="bg-white px-6 py-3 rounded-lg"
        >
          <Text className="text-primary font-semibold">Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Get display data from Firebase
  const displayName = profileData?.username || authUser?.displayName || authUser?.email?.split('@')[0] || "User";
  const email = authUser?.email || "No email";
  const userRole = selectedRole || profileData?.role || "student";
  
  // Format join date
  const joinDate = profileData?.createdAt 
    ? `Joined ${new Date(profileData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
    : "Joined recently";

  // Role-based header color
  const headerColor = userRole === 'teacher' ? 'bg-purple-600' : 'bg-primary';

  return (
    <View className="flex-1">
      {/* Header with role-based color */}
      <View className={`pt-12 px-6 ${headerColor}`}>
        <View className="flex-row items-center justify-between mb-8 w-full">
          {/* Left side */}
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-white/20 w-10 h-10 rounded-full items-center justify-center mr-4"
            >
              <ArrowLeft size={22} color="white" />
            </TouchableOpacity>

            <Text className="text-2xl font-outfit-bold text-white">
              Profile
            </Text>
          </View>

          {/* Right side with role badge and logout */}
          <View className="flex-row items-center">
            {/* Role Badge */}
            <View className={`px-3 py-1 rounded-full mr-3 ${userRole === 'teacher' ? 'bg-yellow-500' : 'bg-green-500'}`}>
              <Text className="text-white text-xs font-bold uppercase">
                {userRole === 'teacher' ? 'TEACHER' : 'STUDENT'}
              </Text>
            </View>
            
            <TouchableOpacity onPress={handleLogOut} className="flex-row items-center bg-white/20 px-3 py-2 rounded-lg">
              <Text className="text-white mr-2 font-semibold">Logout</Text>
              <LogOut size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Section */}
        <View className="items-center mb-6">
          {/* Avatar with role indicator */}
          <View className="relative">
            <Image
              source={profileData?.avatar ? { uri: profileData.avatar } : require("../../assets/images/profile.jpg")}
              className="w-28 h-28 rounded-full border-4 border-white mb-4"
              resizeMode="cover"
              defaultSource={require("../../assets/images/profile.jpg")}
            />
            {/* Role indicator dot */}
            <View className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white ${userRole === 'teacher' ? 'bg-yellow-500' : 'bg-green-500'} items-center justify-center`}>
              {userRole === 'teacher' ? (
                <GraduationCap size={12} color="white" />
              ) : (
                <Book size={12} color="white" />
              )}
            </View>
          </View>
          
          <Text className="text-2xl font-outfit-bold text-white">
            {displayName}
          </Text>
          <Text className="text-base font-outfit-medium text-white/90 mt-1">
            {userRole === 'teacher' ? 'Educator' : 'Learner'}
          </Text>
          <Text className="text-sm font-outfit-medium text-white/70 mt-1">
            {joinDate}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 bg-white rounded-t-[40px] pt-8 px-6">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Debug Info (Remove in production) */}
          <View className="mb-4 p-3 bg-gray-100 rounded-lg">
            <Text className="text-xs text-gray-600">User ID: {authUser?.uid?.substring(0, 12)}...</Text>
            <Text className="text-xs text-gray-600">Email Verified: {authUser?.emailVerified ? 'Yes' : 'No'}</Text>
          </View>

          {/* Personal Details */}
          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <View className="w-8 h-0.5 bg-primary mr-3" />
              <Text className="text-xl font-outfit-bold text-grayPro-800">
                Personal Details
              </Text>
            </View>

            <View className="space-y-4">
              <DetailItem
                icon={<Mail size={20} color="#4F46E5" />}
                label="Email"
                value={email}
              />
              
              <DetailItem
                icon={<User size={20} color="#10B981" />}
                label="Username"
                value={profileData?.username || displayName}
              />
              
              {profileData?.gender && (
                <DetailItem
                  icon={<Users size={20} color="#EF4444" />}
                  label="Gender"
                  value={profileData.gender}
                />
              )}
              
              {profileData?.phone && (
                <DetailItem
                  icon={<Phone size={20} color="#F59E0B" />}
                  label="Phone"
                  value={profileData.phone}
                />
              )}
              
              {profileData?.location && (
                <DetailItem
                  icon={<MapPin size={20} color="#8B5CF6" />}
                  label="Location"
                  value={profileData.location}
                />
              )}
            </View>
          </View>

          {/* TEACHER-SPECIFIC SECTION */}
          {userRole === 'teacher' && profileData && (
            <View className="mb-8">
              <View className="flex-row items-center mb-4">
                <View className="w-8 h-0.5 bg-primary mr-3" />
                <Text className="text-xl font-outfit-bold text-grayPro-800">
                  Teaching Profile
                </Text>
              </View>

              <View className="space-y-4">
                {profileData.qualification && (
                  <DetailItem
                    icon={<BookOpen size={20} color="#8B5CF6" />}
                    label="Qualification"
                    value={profileData.qualification}
                  />
                )}
                
                {profileData.specialization && (
                  <DetailItem
                    icon={<Target size={20} color="#10B981" />}
                    label="Specialization"
                    value={profileData.specialization}
                  />
                )}
                
                {profileData.yearsOfExperience && (
                  <DetailItem
                    icon={<Calendar size={20} color="#3B82F6" />}
                    label="Experience"
                    value={`${profileData.yearsOfExperience} years`}
                  />
                )}
                
                {profileData.hourlyRate > 0 && (
                  <DetailItem
                    icon={<Text className="text-lg">💰</Text>}
                    label="Hourly Rate"
                    value={`$${profileData.hourlyRate}/hour`}
                  />
                )}
              </View>

              {/* Teacher's Subjects */}
              {profileData.subjects && profileData.subjects.length > 0 && (
                <View className="mt-6">
                  <Text className="text-lg font-outfit-semibold text-grayPro-800 mb-3">
                    Teaching Subjects
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {profileData.subjects.map((subject, index) => (
                      <View
                        key={index}
                        className="bg-purple-100 px-4 py-2 rounded-full"
                      >
                        <Text className="text-purple-700 font-outfit-medium">
                          {subject}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Teacher Stats */}
              <View className="flex-row justify-between mt-6">
                <StatBox 
                  label="Rating"
                  value={profileData.rating || "4.5"}
                  suffix="/5"
                  color="text-yellow-600"
                />
                
                <StatBox 
                  label="Students"
                  value={profileData.totalStudents || "0"}
                  color="text-blue-600"
                />
                
                <StatBox 
                  label="Classes"
                  value={profileData.totalClasses || "0"}
                  color="text-green-600"
                />
              </View>
            </View>
          )}

          {/* STUDENT-SPECIFIC SECTION */}
          {userRole === 'student' && profileData && (
            <View className="mb-8">
              <View className="flex-row items-center mb-4">
                <View className="w-8 h-0.5 bg-green-600 mr-3" />
                <Text className="text-xl font-outfit-bold text-grayPro-800">
                  Learning Profile
                </Text>
              </View>
              
              {/* Student Interests */}
              {profileData.subjectInterest && (
                <View className="mb-4">
                  <Text className="text-lg font-outfit-semibold text-grayPro-800 mb-3">
                    Areas of Interest
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {Array.isArray(profileData.subjectInterest) ? (
                      profileData.subjectInterest.map((interest, index) => (
                        <View
                          key={index}
                          className="bg-green-100 px-4 py-2 rounded-full"
                        >
                          <Text className="text-green-700 font-outfit-medium">
                            {interest}
                          </Text>
                        </View>
                      ))
                    ) : (
                      <View className="bg-green-100 px-4 py-2 rounded-full">
                        <Text className="text-green-700 font-outfit-medium">
                          {profileData.subjectInterest}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}

              {/* Student Stats */}
              <View className="flex-row justify-between mt-4">
                <StatBox 
                  label="Enrolled"
                  value={profileData.enrolledCourses?.length || "0"}
                  suffix=" courses"
                  color="text-blue-600"
                />
                
                <StatBox 
                  label="Completed"
                  value={profileData.completedCourses?.length || "0"}
                  suffix=" courses"
                  color="text-green-600"
                />
              </View>
            </View>
          )}

          {/* BIO SECTION */}
          {profileData?.bio && (
            <View className="mb-8">
              <View className="flex-row items-center mb-4">
                <View className="w-8 h-0.5 bg-blue-600 mr-3" />
                <Text className="text-xl font-outfit-bold text-grayPro-800">
                  About
                </Text>
              </View>
              
              <View className="bg-grayPro-50 p-4 rounded-xl">
                <Text className="text-grayPro-700">
                  {profileData.bio}
                </Text>
              </View>
            </View>
          )}

          {/* COURSES SECTION (For students or teachers) */}
          <View className="mb-10">
            <View className="flex-row items-center mb-4">
              <View className="w-8 h-0.5 bg-primary mr-3" />
              <Text className="text-xl font-outfit-bold text-grayPro-800">
                {userRole === 'teacher' ? 'Teaching Areas' : 'Learning Areas'}
              </Text>
            </View>

            <View className="flex-row flex-wrap gap-3">
              {/* Display subjects for teachers */}
              {userRole === 'teacher' && profileData?.subjects && profileData.subjects.length > 0 ? (
                profileData.subjects.map((subject, index) => (
                  <View
                    key={index}
                    className="bg-primary/10 px-4 py-3 rounded-full"
                  >
                    <Text className="text-primary font-outfit-medium">
                      {subject}
                    </Text>
                  </View>
                ))
              ) : userRole === 'student' && profileData?.subjectInterest ? (
                // Display interests for students
                Array.isArray(profileData.subjectInterest) ? (
                  profileData.subjectInterest.map((interest, index) => (
                    <View
                      key={index}
                      className="bg-primary/10 px-4 py-3 rounded-full"
                    >
                      <Text className="text-primary font-outfit-medium">
                        {interest}
                      </Text>
                    </View>
                  ))
                ) : (
                  <View className="bg-primary/10 px-4 py-3 rounded-full">
                    <Text className="text-primary font-outfit-medium">
                      {profileData.subjectInterest}
                    </Text>
                  </View>
                )
              ) : (
                <Text className="text-gray-500">No {userRole === 'teacher' ? 'subjects' : 'interests'} added yet</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

// Helper component for detail items
function DetailItem({ icon, label, value }) {
  return (
    <View className="flex-row items-center p-4 bg-grayPro-50 rounded-xl">
      <View className="w-10 h-10 bg-white rounded-full items-center justify-center mr-4 shadow-sm">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-sm font-outfit-medium text-grayPro-500">
          {label}
        </Text>
        <Text className="text-base font-outfit-semibold text-grayPro-800">
          {value}
        </Text>
      </View>
    </View>
  );
}

// Helper component for stats boxes
function StatBox({ label, value, suffix = "", color = "text-gray-800" }) {
  return (
    <View className="flex-1 items-center bg-gray-50 p-3 rounded-xl mx-1">
      <Text className="text-sm font-outfit-medium text-gray-600">{label}</Text>
      <Text className={`text-xl font-outfit-bold ${color}`}>
        {value}
        {suffix && <Text className="text-sm font-normal">{suffix}</Text>}
      </Text>
    </View>
  );
}
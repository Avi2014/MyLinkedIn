"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/Card";
import { PostFeed } from "@/components/PostFeed";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { ProfileLoadingScreen } from "@/components/LoadingScreen";
import {
  Edit3,
  Save,
  X,
  MapPin,
  Building,
  Calendar,
  User,
  Camera,
  Upload,
  UserPlus,
  UserMinus,
  Users,
} from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const params = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showConnections, setShowConnections] = useState(false);
  const [connectionTab, setConnectionTab] = useState("followers");
  const [editData, setEditData] = useState({
    name: "",
    headline: "",
    bio: "",
    profilePicture: "",
  });

  const isOwnProfile = user && user.uid === params.id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users/${params.id}`);
        if (response.ok) {
          const userData = await response.json();
          setProfile(userData);
          setEditData({
            name: userData.name || "",
            headline: userData.headline || "",
            bio: userData.bio || "",
            profilePicture: userData.profilePicture || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchConnections = async () => {
      try {
        const [followersRes, followingRes] = await Promise.all([
          fetch(`/api/users/${params.id}/followers`),
          fetch(`/api/users/${params.id}/following`),
        ]);

        if (followersRes.ok) {
          const followersData = await followersRes.json();
          setFollowers(followersData);
        }

        if (followingRes.ok) {
          const followingData = await followingRes.json();
          setFollowing(followingData);
        }
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    const checkFollowStatus = async () => {
      if (!user || isOwnProfile) return;

      try {
        const targetUser = await fetch(`/api/users/${params.id}`).then((r) =>
          r.json()
        );
        const currentUser = await fetch(`/api/users/${user.uid}`).then((r) =>
          r.json()
        );

        if (targetUser._id && currentUser.following) {
          const isFollowingUser = currentUser.following.some(
            (id) => id === targetUser._id
          );
          setIsFollowing(isFollowingUser);
        }
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };

    if (params.id) {
      fetchProfile();
      fetchConnections();
      checkFollowStatus();
    }
  }, [params.id, user, isOwnProfile]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditData({
      name: profile.name || "",
      headline: profile.headline || "",
      bio: profile.bio || "",
      profilePicture: profile.profilePicture || "",
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/${user.uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editData.name,
          headline: editData.headline,
          bio: editData.bio,
          profilePicture: editData.profilePicture,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setProfile(updatedUser);
        setEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    setUploadingImage(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append("profilePicture", file);

      const response = await fetch("/api/upload/profile-picture", {
        method: "POST",
        body: formDataObj,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setEditData((prev) => ({
        ...prev,
        profilePicture: data.url,
      }));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleFollow = async () => {
    if (!user) return;

    setFollowLoading(true);
    try {
      const endpoint = isFollowing
        ? `/api/users/${params.id}/unfollow`
        : `/api/users/${params.id}/follow`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followerUid: user.uid }),
      });

      if (response.ok) {
        setIsFollowing(!isFollowing);

        // Refresh connections
        const [followersRes, followingRes] = await Promise.all([
          fetch(`/api/users/${params.id}/followers`),
          fetch(`/api/users/${params.id}/following`),
        ]);

        if (followersRes.ok) {
          const followersData = await followersRes.json();
          setFollowers(followersData);
        }

        if (followingRes.ok) {
          const followingData = await followingRes.json();
          setFollowing(followingData);
        }
      }
    } catch (error) {
      console.error("Error following/unfollowing:", error);
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return <ProfileLoadingScreen />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            User not found
          </h1>
          <p className="text-gray-600">
            The requested profile could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Main Profile Card */}
        <Card className="mb-6 overflow-hidden">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-800 relative">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>

          {/* Profile Information */}
          <div className="px-6 pb-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
              {/* Profile Picture */}
              <div className="relative -mt-16 mb-4 lg:mb-0">
                {editing ? (
                  <div className="relative">
                    {editData.profilePicture ? (
                      <Image
                        src={editData.profilePicture}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full border-4 border-white bg-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        {getInitials(editData.name || "U")}
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="profilePictureEdit"
                      disabled={uploadingImage}
                    />
                    <label
                      htmlFor="profilePictureEdit"
                      className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50"
                    >
                      <Camera className="h-4 w-4 text-gray-600" />
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    {profile.profilePicture ? (
                      <Image
                        src={profile.profilePicture}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full border-4 border-white bg-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        {getInitials(profile.name || "U")}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Profile Details */}
              <div className="flex-1 pt-4">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    {editing ? (
                      <div className="space-y-4">
                        <div>
                          <Input
                            value={editData.name}
                            onChange={(e) =>
                              setEditData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            placeholder="Full Name"
                            className="text-2xl font-bold border-0 border-b-2 border-gray-200 rounded-none px-0 focus:border-blue-600"
                          />
                        </div>
                        <div>
                          <Input
                            value={editData.headline}
                            onChange={(e) =>
                              setEditData((prev) => ({
                                ...prev,
                                headline: e.target.value,
                              }))
                            }
                            placeholder="Professional Headline"
                            className="text-lg border-0 border-b-2 border-gray-200 rounded-none px-0 focus:border-blue-600"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                          {profile.name}
                        </h1>
                        {profile.headline && (
                          <p className="text-lg text-gray-700 mb-2">
                            {profile.headline}
                          </p>
                        )}
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>Location • </span>
                          <Building className="h-4 w-4 mr-1 ml-2" />
                          <span>Company</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col lg:flex-row gap-2 mt-4 lg:mt-0">
                    {isOwnProfile ? (
                      editing ? (
                        <>
                          <Button
                            onClick={handleSave}
                            disabled={uploadingImage}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            {uploadingImage ? "Uploading..." : "Save"}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleCancel}
                            className="border-gray-300"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={handleEdit}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit Profile
                          </Button>
                        </>
                      )
                    ) : (
                      <>
                        <Button
                          onClick={handleFollow}
                          disabled={followLoading}
                          className={
                            isFollowing
                              ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }
                        >
                          {isFollowing ? (
                            <>
                              <UserMinus className="h-4 w-4 mr-2" />
                              Following
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-4 w-4 mr-2" />
                              Follow
                            </>
                          )}
                        </Button>
                        <Button variant="outline" className="border-gray-300">
                          Message
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Connections Count */}
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <button
                    onClick={() => {
                      setShowConnections(true);
                      setConnectionTab("followers");
                    }}
                    className="hover:text-blue-600 transition-colors"
                  >
                    <span className="font-semibold">{followers.length}</span>{" "}
                    <span className="text-gray-600">Followers</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowConnections(true);
                      setConnectionTab("following");
                    }}
                    className="hover:text-blue-600 transition-colors"
                  >
                    <span className="font-semibold">{following.length}</span>{" "}
                    <span className="text-gray-600">Following</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* About Section */}
        <Card className="mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">About</h2>
            </div>
            {editing ? (
              <Textarea
                value={editData.bio}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, bio: e.target.value }))
                }
                placeholder="Write about yourself, your career journey, interests, or anything you'd like others to know..."
                rows={6}
                className="w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              />
            ) : (
              <div className="text-gray-700 leading-relaxed">
                {profile.bio ? (
                  <p className="whitespace-pre-wrap">{profile.bio}</p>
                ) : (
                  <p className="text-gray-500 italic">
                    {isOwnProfile
                      ? "Add information about yourself to help others get to know you better."
                      : "No information available."}
                  </p>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Connections Section */}
        {showConnections && (
          <Card className="mb-6">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Connections
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setShowConnections(false)}
                  className="text-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  onClick={() => setConnectionTab("followers")}
                  className={`px-4 py-2 font-medium transition-colors ${
                    connectionTab === "followers"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Followers ({followers.length})
                </button>
                <button
                  onClick={() => setConnectionTab("following")}
                  className={`px-4 py-2 font-medium transition-colors ${
                    connectionTab === "following"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Following ({following.length})
                </button>
              </div>

              {/* User List */}
              <div className="space-y-3">
                {connectionTab === "followers" ? (
                  followers.length > 0 ? (
                    followers.map((follower) => (
                      <div
                        key={follower.firebaseUid}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {follower.profilePicture ? (
                            <Image
                              src={follower.profilePicture}
                              alt={follower.name}
                              width={48}
                              height={48}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                              {getInitials(follower.name)}
                            </div>
                          )}
                          <div>
                            <a
                              href={`/profile/${follower.firebaseUid}`}
                              className="font-semibold text-gray-900 hover:text-blue-600"
                            >
                              {follower.name}
                            </a>
                            {follower.headline && (
                              <p className="text-sm text-gray-600">
                                {follower.headline}
                              </p>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            window.location.href = `/profile/${follower.firebaseUid}`;
                          }}
                        >
                          View Profile
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No followers yet
                    </p>
                  )
                ) : following.length > 0 ? (
                  following.map((followingUser) => (
                    <div
                      key={followingUser.firebaseUid}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {followingUser.profilePicture ? (
                          <Image
                            src={followingUser.profilePicture}
                            alt={followingUser.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                            {getInitials(followingUser.name)}
                          </div>
                        )}
                        <div>
                          <a
                            href={`/profile/${followingUser.firebaseUid}`}
                            className="font-semibold text-gray-900 hover:text-blue-600"
                          >
                            {followingUser.name}
                          </a>
                          {followingUser.headline && (
                            <p className="text-sm text-gray-600">
                              {followingUser.headline}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          window.location.href = `/profile/${followingUser.firebaseUid}`;
                        }}
                      >
                        View Profile
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Not following anyone yet
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Activity/Posts Section */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Activity
            </h2>
            <div className="border-t border-gray-200 pt-4">
              <PostFeed userId={params.id} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

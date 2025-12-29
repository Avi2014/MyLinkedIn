"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Users, UserPlus, UserMinus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NetworkPage() {
  const { user } = useAuth();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [allConnections, setAllConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [followingIds, setFollowingIds] = useState(new Set());

  useEffect(() => {
    const fetchConnections = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const [followersRes, followingRes] = await Promise.all([
          fetch(`/api/users/${user.uid}/followers`),
          fetch(`/api/users/${user.uid}/following`),
        ]);

        let followersData = [];
        let followingData = [];

        if (followersRes.ok) {
          followersData = await followersRes.json();
          setFollowers(followersData);
        }

        if (followingRes.ok) {
          followingData = await followingRes.json();
          setFollowing(followingData);

          // Create a set of following IDs for quick lookup
          const followingIdSet = new Set(
            followingData.map((u) => u.firebaseUid)
          );
          setFollowingIds(followingIdSet);
        }

        // Combine and deduplicate connections
        const allConnectionsMap = new Map();

        followersData.forEach((user) => {
          allConnectionsMap.set(user.firebaseUid, user);
        });

        followingData.forEach((user) => {
          allConnectionsMap.set(user.firebaseUid, user);
        });

        setAllConnections(Array.from(allConnectionsMap.values()));
      } catch (error) {
        console.error("Error fetching connections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, [user]);

  const handleFollow = async (targetUserId, currentlyFollowing) => {
    if (!user) return;

    try {
      const endpoint = currentlyFollowing
        ? `/api/users/${targetUserId}/unfollow`
        : `/api/users/${targetUserId}/follow`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followerUid: user.uid }),
      });

      if (response.ok) {
        // Update following IDs
        setFollowingIds((prev) => {
          const newSet = new Set(prev);
          if (currentlyFollowing) {
            newSet.delete(targetUserId);
          } else {
            newSet.add(targetUserId);
          }
          return newSet;
        });

        // Refresh connections
        const [followersRes, followingRes] = await Promise.all([
          fetch(`/api/users/${user.uid}/followers`),
          fetch(`/api/users/${user.uid}/following`),
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

  const renderUserCard = (connection) => {
    const isFollowing = followingIds.has(connection.firebaseUid);
    const isCurrentUser = user && user.uid === connection.firebaseUid;

    return (
      <Card
        key={connection.firebaseUid}
        className="p-4 hover:shadow-lg transition-shadow"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Link href={`/profile/${connection.firebaseUid}`}>
              {connection.profilePicture ? (
                <Image
                  src={connection.profilePicture}
                  alt={connection.name}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg cursor-pointer hover:bg-blue-600 transition-colors">
                  {getInitials(connection.name)}
                </div>
              )}
            </Link>
            <div className="flex-1">
              <Link
                href={`/profile/${connection.firebaseUid}`}
                className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {connection.name}
              </Link>
              {connection.headline && (
                <p className="text-sm text-gray-600 mt-1">
                  {connection.headline}
                </p>
              )}
              {connection.bio && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {connection.bio}
                </p>
              )}
            </div>
          </div>

          {!isCurrentUser && (
            <Button
              onClick={() => handleFollow(connection.firebaseUid, isFollowing)}
              className={
                isFollowing
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
              size="sm"
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
          )}
        </div>
      </Card>
    );
  };

  const getDisplayList = () => {
    switch (activeTab) {
      case "followers":
        return followers;
      case "following":
        return following;
      default:
        return allConnections;
    }
  };

  const displayList = getDisplayList();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="p-8 text-center">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Please log in
          </h2>
          <p className="text-gray-600">
            You need to be logged in to view your network
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Users className="h-8 w-8 mr-3 text-blue-600" />
            My Network
          </h1>
          <p className="text-gray-600">
            Manage your professional connections and grow your network
          </p>
        </div>

        {/* Stats Card */}
        <Card className="mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {allConnections.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Total Connections
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {followers.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {following.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Following</div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Card className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All Connections ({allConnections.length})
            </button>
            <button
              onClick={() => setActiveTab("followers")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "followers"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Followers ({followers.length})
            </button>
            <button
              onClick={() => setActiveTab("following")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "following"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Following ({following.length})
            </button>
          </div>
        </Card>

        {/* Connections List */}
        {loading ? (
          <Card className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading connections...</p>
          </Card>
        ) : displayList.length > 0 ? (
          <div className="space-y-4">
            {displayList.map((connection) => renderUserCard(connection))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No connections yet
            </h3>
            <p className="text-gray-600 mb-4">
              {activeTab === "followers"
                ? "You don't have any followers yet"
                : activeTab === "following"
                ? "You're not following anyone yet"
                : "Start building your network by following other users"}
            </p>
            <Link href="/search">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Find People
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}

const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Test route to verify router is working
router.get("/test", (req, res) => {
  res.json({
    message: "Users router is working!",
    timestamp: new Date().toISOString(),
  });
});

// Get all users (for testing)
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).select("-__v");
    res.json({
      message: "Users fetched successfully",
      count: users.length,
      users: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    // console.log("User search query:", q); // Debug log

    if (!q || q.trim().length < 2) {
      return res.json([]);
    }

    const searchQuery = q.trim();
    // console.log("Searching for users with name containing:", searchQuery);

    // Search users by name (case-insensitive)
    const users = await User.find({
      name: { $regex: searchQuery, $options: "i" },
    })
      .select("firebaseUid name headline bio profilePicture")
      .limit(10);

    // console.log(`Found ${users.length} users:`, users.map((u) => u.name));
    res.json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Failed to search users" });
  }
});

// Debug route for temporary use
// This route is for debugging purposes only and should not be used in production
router.get("/debug/all", async (req, res) => {
  try {
    const users = await User.find({}).select("name firebaseUid").limit(5);
    // console.log("All users in database:", users);
    res.json({
      count: users.length,
      users: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Get user profile
router.get("/:firebaseUid", async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create or update user profile
router.post("/", async (req, res) => {
  try {
    const { firebaseUid, email, name, bio, headline, profilePicture } =
      req.body;

    let user = await User.findOne({ firebaseUid });

    if (user) {
      // Update existing user
      user.name = name || user.name;
      user.bio = bio !== undefined ? bio : user.bio;
      user.headline = headline !== undefined ? headline : user.headline;
      user.profilePicture =
        profilePicture !== undefined ? profilePicture : user.profilePicture;

      await user.save();
    } else {
      // Create new user
      user = new User({
        firebaseUid,
        email,
        name: name || "",
        bio: bio || "",
        headline: headline || "",
        profilePicture: profilePicture || "",
      });
      await user.save();
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Complete profile endpoint
router.post("/complete-profile", async (req, res) => {
  try {
    const { firebaseUid, name, headline, bio, profilePicture, email } =
      req.body;

    console.log("Complete profile request:", {
      firebaseUid,
      name,
      headline,
      bio,
    });

    if (!firebaseUid) {
      return res.status(400).json({
        message: "Firebase UID is required",
      });
    }

    if (!name || !headline || !bio) {
      return res.status(400).json({
        message: "Required fields: name, headline, and bio",
      });
    }

    let user = await User.findOne({ firebaseUid });

    if (!user) {
      // Create user if doesn't exist
      user = new User({
        firebaseUid,
        email: email || "",
        name,
        headline,
        bio,
        profilePicture: profilePicture || "",
      });
    } else {
      // Update existing user
      user.name = name;
      user.headline = headline;
      user.bio = bio;
      user.profilePicture = profilePicture || user.profilePicture || "";
    }

    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Complete profile error:", error);
    res.status(400).json({ message: error.message });
  }
});

// Update user profile
router.put("/:firebaseUid", async (req, res) => {
  try {
    const { firebaseUid } = req.params;
    const updates = req.body;

    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        user[key] = updates[key];
      }
    });

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Follow a user
router.post("/:firebaseUid/follow", async (req, res) => {
  try {
    const { firebaseUid } = req.params;
    const { followerUid } = req.body;

    if (!followerUid) {
      return res.status(400).json({ message: "Follower UID is required" });
    }

    if (firebaseUid === followerUid) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    // Find both users
    const userToFollow = await User.findOne({ firebaseUid });
    const follower = await User.findOne({ firebaseUid: followerUid });

    if (!userToFollow || !follower) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already following
    if (follower.following.includes(userToFollow._id)) {
      return res.status(400).json({ message: "Already following this user" });
    }

    // Add to following and followers arrays
    follower.following.push(userToFollow._id);
    userToFollow.followers.push(follower._id);

    await follower.save();
    await userToFollow.save();

    res.json({
      message: "Successfully followed user",
      isFollowing: true,
    });
  } catch (error) {
    console.error("Follow error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Unfollow a user
router.post("/:firebaseUid/unfollow", async (req, res) => {
  try {
    const { firebaseUid } = req.params;
    const { followerUid } = req.body;

    if (!followerUid) {
      return res.status(400).json({ message: "Follower UID is required" });
    }

    // Find both users
    const userToUnfollow = await User.findOne({ firebaseUid });
    const follower = await User.findOne({ firebaseUid: followerUid });

    if (!userToUnfollow || !follower) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove from following and followers arrays
    follower.following = follower.following.filter(
      (id) => !id.equals(userToUnfollow._id)
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => !id.equals(follower._id)
    );

    await follower.save();
    await userToUnfollow.save();

    res.json({
      message: "Successfully unfollowed user",
      isFollowing: false,
    });
  } catch (error) {
    console.error("Unfollow error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get followers list
router.get("/:firebaseUid/followers", async (req, res) => {
  try {
    const { firebaseUid } = req.params;

    const user = await User.findOne({ firebaseUid }).populate(
      "followers",
      "firebaseUid name headline profilePicture"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.followers);
  } catch (error) {
    console.error("Error fetching followers:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get following list
router.get("/:firebaseUid/following", async (req, res) => {
  try {
    const { firebaseUid } = req.params;

    const user = await User.findOne({ firebaseUid }).populate(
      "following",
      "firebaseUid name headline profilePicture"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.following);
  } catch (error) {
    console.error("Error fetching following:", error);
    res.status(500).json({ message: error.message });
  }
});

// Check if user is following another user
router.get("/:firebaseUid/is-following/:targetUid", async (req, res) => {
  try {
    const { firebaseUid, targetUid } = req.params;

    const user = await User.findOne({ firebaseUid });
    const targetUser = await User.findOne({ firebaseUid: targetUid });

    if (!user || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = user.following.includes(targetUser._id);

    res.json({ isFollowing });
  } catch (error) {
    console.error("Error checking follow status:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

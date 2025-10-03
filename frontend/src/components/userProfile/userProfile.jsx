import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userProfile.css";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthToken = () => {
    return localStorage.getItem("accessToken") || localStorage.getItem("token");
  };

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${getAuthToken()}`,
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const googleUser = localStorage.getItem("user");
      const googleToken = localStorage.getItem("token");

      if (googleUser && googleToken) {
        const userData = JSON.parse(googleUser);
        setUser(userData);
        await fetchUserPosts(userData._id);
        await fetchLikedPosts(userData._id);
        await fetchUserComments(userData._id);
      } else {
        const response = await axios.get("http://localhost:5252/api/v1/users/current-user", {
          headers: getAuthHeaders(),
          withCredentials: true,
        });
        
        const userData = response.data.data;
        setUser(userData);
        await fetchUserPosts(userData._id);
        await fetchLikedPosts(userData._id);
        await fetchUserComments(userData._id);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load user data");
    } finally {
      setLoading(false); 
    }
  };

  const fetchUserPosts = async (userId) => {
    try {
      const response = await axios.get("http://localhost:5252/api/v2/posts/get-all-post", {
        headers: getAuthHeaders(),
        withCredentials: true,
      });
      
      // Filter posts by current user
      const allPosts = response.data.data || response.data || [];
      const filteredPosts = allPosts.filter(post => {
        if (!post.author) return false;
        return (post.author._id === userId) || (post.author === userId);
      });
      setUserPosts(filteredPosts);
    } catch (err) {
      console.error("Error fetching user posts:", err);
    }
  };

  const fetchLikedPosts = async (userId) => {
    try {
      const response = await axios.get("http://localhost:5252/api/v2/posts/get-all-post", {
        headers: getAuthHeaders(),
        withCredentials: true,
      });
      
      // Filter posts liked by current user
      const allPosts = response.data.data || response.data || [];
      const likedPostsFiltered = allPosts.filter(post => 
        post.likes && post.likes.includes(userId)
      );
      setLikedPosts(likedPostsFiltered);
    } catch (err) {
      console.error("Error fetching liked posts:", err);
    }
  };

  const fetchUserComments = async (userId) => {
    try {
      const response = await axios.get("http://localhost:5252/api/v2/posts/get-all-post", {
        headers: getAuthHeaders(),
        withCredentials: true,
      });
      
      // Extract comments made by current user
      const allPosts = response.data.data || response.data || [];
      const comments = [];
      
      allPosts.forEach(post => {
        if (post.comments && post.comments.length > 0) {
          post.comments.forEach(comment => {
            if (!comment.user) return;
            if (comment.user === userId || (comment.user._id && comment.user._id === userId)) {
              comments.push({
                ...comment,
                postTitle: post.title,
                postId: post._id
              });
            }
          });
        }
      });
      
      setUserComments(comments);
    } catch (err) {
      console.error("Error fetching user comments:", err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchUserData}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="error-message">
          <h2>User not found</h2>
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header glass-effect">
        <div className="profile-avatar-section">
          <div className="avatar-container">
            <img 
              src={user.avatar || user.profileImage || '/default-avatar.png'} 
              alt="Profile Avatar" 
              className="profile-avatar"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150/0ea5e9/ffffff?text=' + (user.fullName?.charAt(0) || 'U');
              }}
            />
            <div className="avatar-overlay">
              <span className="edit-icon">📷</span>
            </div>
          </div>
        </div>
        
        <div className="profile-info">
          <h1 className="profile-name text-gradient">{user.fullName}</h1>
          <p className="profile-username">@{user.username}</p>
          <p className="profile-email">{user.email}</p>
          {user.bio && <p className="profile-bio">{user.bio}</p>}
          
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{userPosts.length}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{likedPosts.length}</span>
              <span className="stat-label">Liked</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userComments.length}</span>
              <span className="stat-label">Comments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          My Posts ({userPosts.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'liked' ? 'active' : ''}`}
          onClick={() => setActiveTab('liked')}
        >
          Liked Posts ({likedPosts.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'comments' ? 'active' : ''}`}
          onClick={() => setActiveTab('comments')}
        >
          My Comments ({userComments.length})
        </button>
      </div>

      {/* Content Area */}
      <div className="profile-content">
        {/* My Posts Tab */}
        {activeTab === 'posts' && (
          <div className="posts-grid">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div key={post._id} className="post-card glass-effect">
                  {post.postImage && (
                    <div className="post-image">
                      <img src={post.postImage} alt={post.title} />
                    </div>
                  )}
                  <div className="post-content">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{truncateText(post.content)}</p>
                    <div className="post-meta">
                      <span className="post-date">{formatDate(post.createdAt)}</span>
                      <div className="post-stats">
                        <span className="stat">❤️ {post.likes?.length || 0}</span>
                        <span className="stat">💬 {post.comments?.length || 0}</span>
                        <span className="stat">👁️ {post.Views || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No posts yet</h3>
                <p>Start sharing your thoughts with the world!</p>
                <button className="btn btn-primary">Create Your First Post</button>
              </div>
            )}
          </div>
        )}

        {/* Liked Posts Tab */}
        {activeTab === 'liked' && (
          <div className="posts-grid">
            {likedPosts.length > 0 ? (
              likedPosts.map((post) => (
                <div key={post._id} className="post-card glass-effect">
                  {post.postImage && (
                    <div className="post-image">
                      <img src={post.postImage} alt={post.title} />
                    </div>
                  )}
                  <div className="post-content">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{truncateText(post.content)}</p>
                    <div className="post-meta">
                      <span className="post-author">By {post.author?.fullName || 'Unknown'}</span>
                      <span className="post-date">{formatDate(post.createdAt)}</span>
                      <div className="post-stats">
                        <span className="stat">❤️ {post.likes?.length || 0}</span>
                        <span className="stat">💬 {post.comments?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">❤️</div>
                <h3>No liked posts yet</h3>
                <p>Explore and like posts that inspire you!</p>
              </div>
            )}
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div className="comments-list">
            {userComments.length > 0 ? (
              userComments.map((comment, index) => (
                <div key={index} className="comment-card glass-effect">
                  <div className="comment-content">
                    <p className="comment-text">{comment.comment}</p>
                    <div className="comment-meta">
                      <span className="comment-post">On: "{comment.postTitle}"</span>
                      <span className="comment-date">{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">💬</div>
                <h3>No comments yet</h3>
                <p>Join the conversation by commenting on posts!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;

import React, { useState } from 'react';
import axios from 'axios';
import './createPost.css';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    postImage: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      postImage: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      setLoading(false);
      return;
    }

    if (formData.content.trim().length < 3) {
      setError('Content must be at least 3 characters long');
      setLoading(false);
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title.trim());
      submitData.append('content', formData.content.trim());

      if (formData.postImage) {
        submitData.append('postImage', formData.postImage);
      }

      // Get token from localStorage or wherever you store it
      const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
          

      const response = await axios.post('http://localhost:5252/api/v2/posts/create-post', submitData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess('Post created successfully!');
      // Reset form
      setFormData({
        title: '',
        content: '',
        postImage: null
      });

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <h2 className="create-post-title">Create New Post</h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={6}
            className="form-textarea"
            placeholder="Write your post content here..."
            required
          />
          <p className="helper-text">
            Minimum 3 characters ({formData.content.length}/3)
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="postImage" className="form-label">
            Post Image (Optional)
          </label>
          <input
            type="file"
            id="postImage"
            name="postImage"
            onChange={handleFileChange}
            accept="image/*"
            className="file-input"
          />
          {formData.postImage && (
            <p className="helper-text">
              Selected: {formData.postImage.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? 'Creating Post...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

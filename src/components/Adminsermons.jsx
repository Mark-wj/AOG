import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MicrophoneIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  PlayIcon,
  EyeIcon,
  PhotoIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
} from '@heroicons/react/24/outline';

const AdminSermons = () => {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSermon, setEditingSermon] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    speaker: '',
    date: '',
    series: '',
    description: '',
    image: '',
    videoUrl: '',
    audioUrl: ''
  });

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sermons');
      const data = await response.json();
      setSermons(data);
    } catch (error) {
      console.error('Error fetching sermons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingSermon 
        ? `http://localhost:5000/api/sermons/${editingSermon._id}`
        : 'http://localhost:5000/api/sermons';
      
      const method = editingSermon ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchSermons();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving sermon:', error);
    }
  };

  const handleDelete = async (sermonId) => {
    if (!window.confirm('Are you sure you want to delete this sermon?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/sermons/${sermonId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchSermons();
      }
    } catch (error) {
      console.error('Error deleting sermon:', error);
    }
  };

  const openModal = (sermon = null) => {
    if (sermon) {
      setEditingSermon(sermon);
      setFormData({
        title: sermon.title,
        speaker: sermon.speaker,
        date: sermon.date,
        series: sermon.series || '',
        description: sermon.description,
        image: sermon.image,
        videoUrl: sermon.videoUrl || '',
        audioUrl: sermon.audioUrl || ''
      });
    } else {
      setEditingSermon(null);
      setFormData({
        title: '',
        speaker: 'Pastor Gary Morgan',
        date: '',
        series: '',
        description: '',
        image: '',
        videoUrl: '',
        audioUrl: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSermon(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading sermons...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white font-display flex items-center">
            <MicrophoneIcon className="w-10 h-10 text-amber-400 mr-3" />
            Sermons Management
          </h1>
          <p className="text-gray-300 mt-2 font-accent">Manage sermon library and messages</p>
        </div>
        <motion.button
          onClick={() => openModal()}
          className="btn-primary flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add New Sermon</span>
        </motion.button>
      </div>

      {/* Sermons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sermons.map((sermon, index) => (
          <motion.div
            key={sermon._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect-strong rounded-2xl overflow-hidden border border-white/10 group hover:border-purple-400/30 transition-all duration-300"
          >
            {/* Sermon Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={sermon.image}
                alt={sermon.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                  <PlayIcon className="w-8 h-8 text-white ml-1" />
                </div>
              </div>

              {/* Views Badge */}
              <div className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                <EyeIcon className="w-4 h-4 text-white" />
                <span className="text-white text-xs font-semibold">{sermon.views || 0}</span>
              </div>
            </div>

            {/* Sermon Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 font-display group-hover:text-purple-400 transition-colors line-clamp-2">
                {sermon.title}
              </h3>
              
              <p className="text-gray-300 text-sm mb-2">{sermon.speaker}</p>
              <p className="text-amber-400 text-sm font-semibold mb-3">{sermon.date}</p>

              {sermon.series && (
                <div className="mb-3">
                  <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs rounded-full">
                    {sermon.series}
                  </span>
                </div>
              )}

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {sermon.description}
              </p>

              {/* Media Indicators */}
              <div className="flex items-center space-x-3 mb-4">
                {sermon.videoUrl && (
                  <div className="flex items-center text-purple-400 text-xs">
                    <VideoCameraIcon className="w-4 h-4 mr-1" />
                    Video
                  </div>
                )}
                {sermon.audioUrl && (
                  <div className="flex items-center text-amber-400 text-xs">
                    <MusicalNoteIcon className="w-4 h-4 mr-1" />
                    Audio
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <motion.button
                  onClick={() => openModal(sermon)}
                  className="flex-1 btn-outline text-sm py-2 flex items-center justify-center space-x-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PencilIcon className="w-4 h-4" />
                  <span>Edit</span>
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(sermon._id)}
                  className="flex-1 bg-red-600/20 border-2 border-red-500/30 text-red-400 hover:bg-red-600/30 hover:border-red-500/50 rounded-xl text-sm py-2 flex items-center justify-center space-x-1 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TrashIcon className="w-4 h-4" />
                  <span>Delete</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {sermons.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-effect-strong rounded-2xl p-12 text-center border border-white/10"
        >
          <MicrophoneIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2 font-display">No Sermons Yet</h3>
          <p className="text-gray-400 mb-6">Upload your first sermon to get started</p>
          <button
            onClick={() => openModal()}
            className="btn-primary"
          >
            Upload Sermon
          </button>
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-effect-divine rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-gold-soft/20"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white font-display">
                  {editingSermon ? 'Edit Sermon' : 'Upload New Sermon'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-8 h-8" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 font-display">
                    Sermon Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-300"
                    placeholder="The Power of Faith"
                    required
                  />
                </div>

                {/* Speaker and Date */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2 font-display">
                      Speaker
                    </label>
                    <input
                      type="text"
                      name="speaker"
                      value={formData.speaker}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-300"
                      placeholder="Pastor Gary Morgan"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2 font-display">
                      Date
                    </label>
                    <input
                      type="text"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-300"
                      placeholder="Nov 12, 2024"
                      required
                    />
                  </div>
                </div>

                {/* Series */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 font-display">
                    Series (Optional)
                  </label>
                  <input
                    type="text"
                    name="series"
                    value={formData.series}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-300"
                    placeholder="Faith Series"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 font-display">
                    Thumbnail Image URL
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-300"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                    <button
                      type="button"
                      className="px-4 bg-white/5 border-2 border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <PhotoIcon className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Video URL */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 font-display">
                    Video URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-300"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                {/* Audio URL */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 font-display">
                    Audio URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="audioUrl"
                    value={formData.audioUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-300"
                    placeholder="https://example.com/sermon.mp3"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 font-display">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-300 resize-none"
                    placeholder="Sermon description..."
                    required
                  />
                </div>

                {/* Form Actions */}
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary bg-gradient-to-r from-purple-600 to-purple-700"
                  >
                    {editingSermon ? 'Update Sermon' : 'Upload Sermon'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSermons;
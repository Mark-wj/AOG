import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhotoIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'general'
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('https://aog-backend-production.up.railway.app/api/gallery');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
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
      const response = await fetch('https://aog-backend-production.up.railway.app/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchImages();
        closeModal();
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDelete = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://aog-backend-production.up.railway.app/api/gallery/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchImages();
        setShowImageModal(false);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const openModal = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      category: 'general'
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const viewImage = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white font-display flex items-center">
            <PhotoIcon className="w-10 h-10 text-amber-400 mr-3" />
            Gallery Management
          </h1>
          <p className="text-gray-300 mt-2 font-accent">{images.length} images in gallery</p>
        </div>
        <motion.button
          onClick={openModal}
          className="btn-primary flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add New Image</span>
        </motion.button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative group aspect-square rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => viewImage(image)}
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold font-display mb-1 line-clamp-2">
                  {image.title}
                </h3>
                {image.description && (
                  <p className="text-gray-300 text-sm line-clamp-1">
                    {image.description}
                  </p>
                )}
                <div className="mt-2">
                  <span className="px-2 py-1 bg-amber-500/80 text-white text-xs rounded-full">
                    {image.category}
                  </span>
                </div>
              </div>

              {/* View Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MagnifyingGlassIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Delete Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(image._id);
              }}
              className="absolute top-3 right-3 p-2 bg-red-600/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <TrashIcon className="w-4 h-4 text-white" />
            </motion.button>

            {/* Category Badge */}
            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
                {image.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {images.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-effect-strong rounded-2xl p-12 text-center border border-white/10"
        >
          <PhotoIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2 font-display">No Images Yet</h3>
          <p className="text-gray-400 mb-6">Start building your gallery</p>
          <button
            onClick={openModal}
            className="btn-primary"
          >
            Add First Image
          </button>
        </motion.div>
      )}

      {/* Upload Modal */}
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
              className="glass-effect-divine rounded-3xl p-8 max-w-2xl w-full border-2 border-gold-soft/20"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white font-display">Add New Image</h2>
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
                    Image Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-all duration-300"
                    placeholder="Sunday Service - March 2024"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 font-display">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-green-400 transition-all duration-300"
                  >
                    <option value="general">General</option>
                    <option value="worship">Worship</option>
                    <option value="events">Events</option>
                    <option value="youth">Youth</option>
                    <option value="community">Community</option>
                  </select>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 font-display">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-all duration-300"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                  <p className="text-gray-500 text-xs mt-2">
                    Paste a direct link to your image (from Unsplash, Imgur, etc.)
                  </p>
                </div>

                {/* Image Preview */}
                {formData.imageUrl && (
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2 font-display">
                      Preview
                    </label>
                    <div className="rounded-xl overflow-hidden border-2 border-white/10">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 font-display">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-all duration-300 resize-none"
                    placeholder="Brief description of the image..."
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
                    className="flex-1 btn-primary bg-gradient-to-r from-green-600 to-green-700"
                  >
                    Add to Gallery
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image View Modal */}
      <AnimatePresence>
        {showImageModal && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full"
            >
              {/* Close Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowImageModal(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-8 h-8 text-white" />
                </button>
              </div>

              {/* Image */}
              <div className="glass-effect-divine rounded-2xl overflow-hidden border-2 border-gold-soft/20">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="w-full max-h-[70vh] object-contain"
                />
                
                {/* Image Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white font-display mb-2">
                        {selectedImage.title}
                      </h3>
                      {selectedImage.description && (
                        <p className="text-gray-300">{selectedImage.description}</p>
                      )}
                    </div>
                    <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm rounded-full">
                      {selectedImage.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>
                      Uploaded: {new Date(selectedImage.uploadedAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDelete(selectedImage._id)}
                      className="px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 hover:border-red-500/50 rounded-lg transition-all duration-300 flex items-center space-x-2"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span>Delete Image</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminGallery;
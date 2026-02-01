import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  MapPinIcon,
  ClockIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { eventsAPI } from '../services/api';  

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
    category: 'upcoming'
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventsAPI.getAll();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
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
      if (editingEvent) {
        await eventsAPI.update(editingEvent._id, formData);
      } else {
        await eventsAPI.create(formData);
      }
      
      fetchEvents();
      closeModal();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await eventsAPI.delete(eventId);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again.');
    }
  };

  const openModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
        image: event.image,
        category: event.category || 'upcoming'
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        image: '',
        category: 'upcoming'
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEvent(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white font-display flex items-center">
            <CalendarIcon className="w-10 h-10 text-amber-400 mr-3" />
            Events Management
          </h1>
          <p className="text-gray-300 mt-2 font-accent">Manage church events and activities</p>
        </div>
        <motion.button
          onClick={() => openModal()}
          className="btn-primary flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add New Event</span>
        </motion.button>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect-strong rounded-2xl overflow-hidden border border-white/10 group hover:border-amber-400/30 transition-all duration-300"
          >
            {/* Event Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              
              {/* Category Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                  {event.category}
                </span>
              </div>
            </div>

            {/* Event Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3 font-display group-hover:text-amber-400 transition-colors">
                {event.title}
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-300 text-sm">
                  <CalendarIcon className="w-4 h-4 mr-2 text-amber-400" />
                  {event.date}
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <ClockIcon className="w-4 h-4 mr-2 text-amber-400" />
                  {event.time}
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <MapPinIcon className="w-4 h-4 mr-2 text-amber-400" />
                  {event.location}
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <motion.button
                  onClick={() => openModal(event)}
                  className="flex-1 btn-outline text-sm py-2 flex items-center justify-center space-x-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PencilIcon className="w-4 h-4" />
                  <span>Edit</span>
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(event._id)}
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
      {events.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-effect-strong rounded-2xl p-12 text-center border border-white/10"
        >
          <CalendarIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2 font-display">No Events Yet</h3>
          <p className="text-gray-400 mb-6">Create your first event to get started</p>
          <button
            onClick={() => openModal()}
            className="btn-primary"
          >
            Create Event
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
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
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
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-all duration-300"
                    placeholder="Sunday Worship Service"
                    required
                  />
                </div>

                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2 font-display">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2 font-display">
                      Time
                    </label>
                    <input
                      type="text"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-all duration-300"
                      placeholder="10:00 AM"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 font-display">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-all duration-300"
                    placeholder="Main Sanctuary"
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
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all duration-300"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="weekly">Weekly</option>
                    <option value="special">Special Event</option>
                  </select>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 font-display">
                    Image URL
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-all duration-300"
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
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-all duration-300 resize-none"
                    placeholder="Event description..."
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
                    className="flex-1 btn-primary"
                  >
                    {editingEvent ? 'Update Event' : 'Create Event'}
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

export default AdminEvents;
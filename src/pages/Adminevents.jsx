import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Mock data for development
      setEvents([
        {
          id: 1,
          title: "Christmas Eve Service",
          date: "2024-12-24",
          time: "6:00 PM",
          location: "Main Sanctuary",
          description: "Join us for a magical Christmas Eve service",
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
          category: "upcoming"
        },
        {
          id: 2,
          title: "New Year Prayer Night",
          date: "2024-12-31",
          time: "9:00 PM",
          location: "Prayer Chapel",
          description: "Welcome 2025 in prayer and worship",
          image: "https://images.unsplash.com/photo-1530016555861-3d1f3f5ca94b",
          category: "upcoming"
        }
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingEvent
        ? `http://localhost:5000/api/events/${editingEvent.id}`
        : 'http://localhost:5000/api/events';
      
      const method = editingEvent ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchEvents();
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await fetch(`http://localhost:5000/api/events/${id}`, {
          method: 'DELETE',
        });
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white font-display">Events Management</h2>
          <p className="text-gray-400 mt-1">Manage church events and activities</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Add New Event</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Events', value: events.length, icon: '📅', color: 'from-blue-500 to-blue-700' },
          { label: 'Upcoming', value: events.filter(e => e.category === 'upcoming').length, icon: '⏰', color: 'from-green-500 to-green-700' },
          { label: 'Past Events', value: events.filter(e => e.category === 'past').length, icon: '📚', color: 'from-purple-500 to-purple-700' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass-effect-strong rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-4xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-3xl`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Events Grid */}
      <div className="glass-effect-strong rounded-2xl p-6 border border-white/10">
        <div className="grid gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Event Image */}
                <div className="w-full md:w-48 h-48 flex-shrink-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Event Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center text-amber-400">
                          <span className="mr-2">📅</span>
                          {event.date}
                        </span>
                        <span className="flex items-center text-gray-300">
                          <span className="mr-2">⏰</span>
                          {event.time}
                        </span>
                        <span className="flex items-center text-gray-300">
                          <span className="mr-2">📍</span>
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      event.category === 'upcoming' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {event.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{event.description}</p>
                  
                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(event)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span>✏️</span>
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span>🗑️</span>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {events.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Events Yet</h3>
              <p className="text-gray-400">Click "Add New Event" to create your first event.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-effect-strong rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white font-display">
                  {editingEvent ? 'Edit Event' : 'Add New Event'}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <span className="text-2xl text-white">×</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Event Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Date *</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Time *</label>
                    <input
                      type="text"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="e.g., 6:00 PM"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors duration-300"
                  >
                    Cancel
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
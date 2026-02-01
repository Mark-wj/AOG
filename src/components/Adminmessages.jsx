import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EnvelopeIcon,
  TrashIcon,
  XMarkIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  AtSymbolIcon,
} from '@heroicons/react/24/outline';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all'); // all, new, read

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://aog-backend-production.up.railway.app/api/messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (messageId, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://aog-backend-production.up.railway.app/api/messages/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleDelete = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://aog-backend-production.up.railway.app/api/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchMessages();
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const openMessage = (message) => {
    setSelectedMessage(message);
    if (message.status === 'new') {
      updateMessageStatus(message._id, 'read');
    }
  };

  const closeMessage = () => {
    setSelectedMessage(null);
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'new') return msg.status === 'new';
    if (filter === 'read') return msg.status === 'read';
    return true;
  });

  const newMessagesCount = messages.filter(msg => msg.status === 'new').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white font-display flex items-center">
            <EnvelopeIcon className="w-10 h-10 text-amber-400 mr-3" />
            Messages
          </h1>
          <p className="text-gray-300 mt-2 font-accent">
            {newMessagesCount} new message{newMessagesCount !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'all'
                ? 'bg-amber-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('new')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'new'
                ? 'bg-amber-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            New ({newMessagesCount})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'read'
                ? 'bg-amber-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Read ({messages.length - newMessagesCount})
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message, index) => (
          <motion.div
            key={message._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => openMessage(message)}
            className={`glass-effect-strong rounded-2xl p-6 border cursor-pointer transition-all duration-300 ${
              message.status === 'new'
                ? 'border-amber-400/30 bg-gradient-to-r from-amber-500/10 to-transparent hover:border-amber-400/50'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">
                      {message.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold text-white font-display">
                        {message.name}
                      </h3>
                      {message.status === 'new' && (
                        <span className="px-2 py-1 bg-amber-500 text-white text-xs rounded-full font-semibold">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{message.email}</p>
                  </div>
                </div>

                <div className="ml-15">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {message.subject}
                  </h4>
                  <p className="text-gray-300 line-clamp-2">
                    {message.message}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm mt-3">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {new Date(message.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateMessageStatus(
                      message._id,
                      message.status === 'new' ? 'read' : 'new'
                    );
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    message.status === 'read'
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <CheckCircleIcon className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(message._id);
                  }}
                  className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <TrashIcon className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMessages.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-effect-strong rounded-2xl p-12 text-center border border-white/10"
        >
          <EnvelopeIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2 font-display">
            {filter === 'new' ? 'No New Messages' : 'No Messages'}
          </h3>
          <p className="text-gray-400">
            {filter === 'new' 
              ? "You're all caught up!" 
              : 'Messages from your contact form will appear here'}
          </p>
        </motion.div>
      )}

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeMessage}
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
                <h2 className="text-3xl font-bold text-white font-display">Message Details</h2>
                <button
                  onClick={closeMessage}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-8 h-8" />
                </button>
              </div>

              {/* Message Content */}
              <div className="space-y-6">
                {/* Sender Info */}
                <div className="glass-effect-strong rounded-xl p-6 border border-white/10">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {selectedMessage.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <UserIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-white font-semibold text-lg">
                          {selectedMessage.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AtSymbolIcon className="w-5 h-5 text-gray-400" />
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          {selectedMessage.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-400 text-sm">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    {new Date(selectedMessage.createdAt).toLocaleString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-gray-400 text-sm font-semibold mb-2">
                    Subject
                  </label>
                  <div className="glass-effect-strong rounded-xl p-4 border border-white/10">
                    <p className="text-white text-lg font-semibold">{selectedMessage.subject}</p>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-400 text-sm font-semibold mb-2">
                    Message
                  </label>
                  <div className="glass-effect-strong rounded-xl p-6 border border-white/10">
                    <p className="text-white leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => {
                      updateMessageStatus(
                        selectedMessage._id,
                        selectedMessage.status === 'new' ? 'read' : 'new'
                      );
                      closeMessage();
                    }}
                    className="flex-1 btn-outline flex items-center justify-center space-x-2"
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                    <span>Mark as {selectedMessage.status === 'new' ? 'Read' : 'Unread'}</span>
                  </button>
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2"
                  >
                    <EnvelopeIcon className="w-5 h-5" />
                    <span>Reply</span>
                  </a>
                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="px-6 bg-red-600/20 border-2 border-red-500/30 text-red-400 hover:bg-red-600/30 hover:border-red-500/50 rounded-xl transition-all duration-300"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminMessages;
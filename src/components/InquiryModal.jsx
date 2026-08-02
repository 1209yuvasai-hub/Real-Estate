import React, { useState } from 'react';
import { X, Send, CheckCircle, User, Mail, Phone, Calendar, MessageSquare, Building } from 'lucide-react';
import { api } from '../services/api';

export default function InquiryModal({ property, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: `Hello, I would like more information or to schedule a private walkthrough for ${property?.title || 'this property'}.`
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    try {
      setLoading(true);
      await api.submitInquiry({
        propertyId: property.id,
        propertyTitle: property.title,
        ...formData
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'rgba(255,255,255,0.08)', border: 'none', color: '#9CA3AF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '0.6rem', borderRadius: '12px' }}>
                <Building size={24} color="#3B82F6" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.3rem' }}>Contact Property Agent</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Send a direct message regarding {property.title}</p>
              </div>
            </div>

            {/* Target Property Snippet */}
            <div style={{ display: 'flex', gap: '1rem', background: 'rgba(15, 23, 42, 0.7)', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--border-glass)', marginBottom: '1.5rem', alignItems: 'center' }}>
              <img 
                src={property.images?.[0]} 
                alt={property.title}
                style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontSize: '0.95rem', color: '#fff' }}>{property.title}</h4>
                <p style={{ fontSize: '0.8rem', color: '#60A5FA', fontWeight: 700 }}>
                  ${property.price?.toLocaleString()} {property.status === 'For Rent' && '/mo'}
                </p>
              </div>
            </div>

            {error && (
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#FCA5A5', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div className="input-group">
                <label className="input-label">Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="John Doe" 
                    style={{ paddingLeft: '2.4rem' }}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Email Address *</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="email" 
                      className="input-field" 
                      placeholder="john@example.com" 
                      style={{ paddingLeft: '2.4rem' }}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Phone Number</label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="tel" 
                      className="input-field" 
                      placeholder="+1 (555) 000-0000" 
                      style={{ paddingLeft: '2.4rem' }}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Preferred Tour Date (Optional)</label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="date" 
                    className="input-field" 
                    style={{ paddingLeft: '2.4rem' }}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Message *</label>
                <div style={{ position: 'relative' }}>
                  <textarea 
                    className="input-field" 
                    rows={4} 
                    placeholder="Specify details or walkthrough request..." 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.85rem' }}
              >
                {loading ? 'Sending Message...' : <><Send size={18} /> Send Inquiry to Agent</>}
              </button>

            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <CheckCircle size={64} color="#10B981" style={{ margin: '0 auto 1rem auto' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Inquiry Sent Successfully!</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Thank you {formData.name}. The property agent for <strong>{property.title}</strong> has received your inquiry and will contact you at {formData.email}.
            </p>
            <button className="btn-primary" onClick={onClose} style={{ padding: '0.75rem 2rem' }}>
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

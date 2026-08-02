import React from 'react';
import { Building2, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#070A12', borderTop: '1px solid var(--border-glass)', padding: '4rem 0 2rem 0', marginTop: '6rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        
        {/* Col 1: Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Building2 size={24} color="#3B82F6" />
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>LUXESTATE</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>
            The premiere full-stack platform for discovering luxury residences, modern lofts, commercial real estate, and direct owner inquiries.
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1.2rem' }}>Property Types</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <li>Luxury Villas</li>
            <li>Downtown Penthouses</li>
            <li>Waterfront Residences</li>
            <li>Commercial Spaces</li>
            <li>Family Houses</li>
          </ul>
        </div>

        {/* Col 3: Locations */}
        <div>
          <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1.2rem' }}>Featured Cities</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <li>Los Angeles, CA</li>
            <li>New York, NY</li>
            <li>Miami, FL</li>
            <li>Austin, TX</li>
            <li>San Francisco, CA</li>
          </ul>
        </div>

        {/* Col 4: Contact */}
        <div>
          <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1.2rem' }}>Direct Support</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <MapPin size={16} color="#3B82F6" />
              <span>742 Beverly Hills Crest, CA</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Phone size={16} color="#10B981" />
              <span>+1 (800) 555-LUXE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Mail size={16} color="#F59E0B" />
              <span>inquiry@luxestate.com</span>
            </div>
          </div>
        </div>

      </div>

      <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <div>© 2026 LUXESTATE Real Estate Portal. All rights reserved.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          Crafted with <Heart size={14} color="#EF4444" fill="#EF4444" /> for Windows Full-Stack Execution
        </div>
      </div>
    </footer>
  );
}

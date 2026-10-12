/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Education } from './components/Education.tsx';
import { Skills } from './components/Skills.tsx';
import { Projects } from './components/Projects.tsx';
import { Journey } from './components/Journey.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { ScrollProgress } from './components/ScrollProgress.tsx';
import { EditPhotoModal } from './components/EditPhotoModal.tsx';
import { PERSONAL_INFO } from './data/portfolioData.ts';
import {
  saveProfilePhoto,
  loadSavedProfilePhoto,
  resetProfilePhoto,
  compressImage,
} from './utils/imageStorage.ts';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [profilePhoto, setProfilePhoto] = useState<string>(PERSONAL_INFO.profileImage);
  const [photoSizeLevel, setPhotoSizeLevel] = useState<number>(3);
  const [isEditPhotoOpen, setIsEditPhotoOpen] = useState(false);

  // Initialize and persist theme, custom profile photo, & size
  useEffect(() => {
    // Theme setup
    const savedTheme = localStorage.getItem('sudarshan_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Photo size setup
    const savedSize = localStorage.getItem('sudarshan_photo_size_level');
    if (savedSize) {
      const parsed = parseInt(savedSize, 10);
      if (parsed >= 1 && parsed <= 5) setPhotoSizeLevel(parsed);
    }

    // Load saved custom photo from IndexedDB / LocalStorage / Server
    (async () => {
      try {
        const saved = await loadSavedProfilePhoto();
        if (saved) {
          setProfilePhoto(saved);
          return;
        }

        // Check server fallback
        const res = await fetch('/api/upload-profile');
        if (res.ok) {
          const data = await res.json();
          if (data?.image) {
            setProfilePhoto(data.image);
            saveProfilePhoto(data.image);
          }
        }
      } catch (err) {
        console.warn('Error loading custom photo:', err);
      }
    })();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('sudarshan_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleSavePhoto = async (newPhotoUrl: string) => {
    setProfilePhoto(newPhotoUrl);
    await saveProfilePhoto(newPhotoUrl);
  };

  const handleResetPhoto = async () => {
    setProfilePhoto(PERSONAL_INFO.profileImage);
    await resetProfilePhoto();
  };

  const handlePhotoSizeChange = (newLevel: number) => {
    setPhotoSizeLevel(newLevel);
    localStorage.setItem('sudarshan_photo_size_level', String(newLevel));
  };

  const handleDirectDropPhoto = async (file: File) => {
    try {
      const compressed = await compressImage(file, 900);
      await handleSavePhoto(compressed);
    } catch (err) {
      console.error('Error handling dropped photo:', err);
      setIsEditPhotoOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 relative selection:bg-blue-600 selection:text-white">
      {/* Scroll Progress Bar & Back to top button */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Sections */}
      <main>
        <Hero
          profilePhoto={profilePhoto}
          photoSizeLevel={photoSizeLevel}
          onChangePhotoSize={handlePhotoSizeChange}
          onEditPhoto={() => setIsEditPhotoOpen(true)}
          onDropPhoto={handleDirectDropPhoto}
        />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal to edit or upload background-removed profile photo */}
      <EditPhotoModal
        isOpen={isEditPhotoOpen}
        currentPhoto={profilePhoto}
        photoSizeLevel={photoSizeLevel}
        onChangePhotoSize={handlePhotoSizeChange}
        onSavePhoto={handleSavePhoto}
        onResetPhoto={handleResetPhoto}
        onClose={() => setIsEditPhotoOpen(false)}
      />
    </div>
  );
}

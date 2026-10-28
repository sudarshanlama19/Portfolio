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
import { SectionDivider } from './components/SectionDivider.tsx';
import { InteractiveScene3D } from './components/InteractiveScene3D.tsx';
import { ScrollProgress } from './components/ScrollProgress.tsx';
import { EditPhotoModal, PhotoPlacement } from './components/EditPhotoModal.tsx';
import { OwnerAuthModal } from './components/OwnerAuthModal.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { AIPortfolioAssistant } from './components/AIPortfolioAssistant.tsx';
import { OwnerProvider } from './context/OwnerContext.tsx';
import { PERSONAL_INFO } from './data/portfolioData.ts';
import {
  saveProfilePhoto,
  loadSavedProfilePhoto,
  resetProfilePhoto,
  compressImage,
} from './utils/imageStorage.ts';

function PortfolioApp() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [profilePhoto, setProfilePhoto] = useState<string>(PERSONAL_INFO.profileImage);
  const [photoSizeLevel, setPhotoSizeLevel] = useState<number>(3);
  const [photoPlacement, setPhotoPlacement] = useState<PhotoPlacement>('left');
  const [isEditPhotoOpen, setIsEditPhotoOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Initialize and persist theme, custom profile photo, size, & layout placement
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

    // Photo placement setup: Ensure photo is placed beside the name ('left' or 'right')
    const savedPlacement = localStorage.getItem('sudarshan_photo_placement') as PhotoPlacement | null;
    if (savedPlacement === 'left' || savedPlacement === 'right') {
      setPhotoPlacement(savedPlacement);
    } else {
      setPhotoPlacement('left');
      localStorage.setItem('sudarshan_photo_placement', 'left');
    }

    // Load saved custom photo from IndexedDB / LocalStorage / Server
    (async () => {
      try {
        const saved = await loadSavedProfilePhoto();
        if (saved) {
          setProfilePhoto(saved);
          // Sync saved photo to server so it permanently updates public/assets/images/profile.png on disk
          fetch('/api/upload-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: saved }),
          }).catch(() => {});
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

  const handlePhotoPlacementChange = (newPlacement: PhotoPlacement) => {
    setPhotoPlacement(newPlacement);
    localStorage.setItem('sudarshan_photo_placement', newPlacement);
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
      {/* Interactive 3D Scene / Ambient Background Layer */}
      <InteractiveScene3D />

      {/* Custom Fluid Cursor & Follower Ring */}
      <CustomCursor />

      {/* Scroll Progress Bar & Back to top button */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections with Decorative Animated Section Dividers */}
      <main className="relative z-10">
        <Hero
          profilePhoto={profilePhoto}
          photoSizeLevel={photoSizeLevel}
          photoPlacement={photoPlacement}
          onChangePhotoSize={handlePhotoSizeChange}
          onChangePhotoPlacement={handlePhotoPlacementChange}
          onEditPhoto={() => setIsEditPhotoOpen(true)}
          onDropPhoto={handleDirectDropPhoto}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <SectionDivider variant="diamond" accentColor="blue" />

        <About />

        <SectionDivider variant="code" accentColor="cyan" />

        <Education />

        <SectionDivider variant="diamond" accentColor="purple" />

        <Skills />

        <SectionDivider variant="code" accentColor="blue" />

        <Projects />

        <SectionDivider variant="glow" accentColor="cyan" />

        <Journey />

        <SectionDivider variant="diamond" accentColor="blue" />

        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Portfolio Assistant Chatbot */}
      <AIPortfolioAssistant />

      {/* Downloadable Résumé PDF Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Owner Authentication Modal (Required to edit photo) */}
      <OwnerAuthModal onSuccess={() => setIsEditPhotoOpen(true)} />

      {/* Modal to edit or upload background-removed profile photo and change layout */}
      <EditPhotoModal
        isOpen={isEditPhotoOpen}
        currentPhoto={profilePhoto}
        photoSizeLevel={photoSizeLevel}
        photoPlacement={photoPlacement}
        onChangePhotoSize={handlePhotoSizeChange}
        onChangePhotoPlacement={handlePhotoPlacementChange}
        onSavePhoto={handleSavePhoto}
        onResetPhoto={handleResetPhoto}
        onClose={() => setIsEditPhotoOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <OwnerProvider>
      <PortfolioApp />
    </OwnerProvider>
  );
}

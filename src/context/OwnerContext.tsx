import React, { createContext, useContext, useState, useEffect } from 'react';

interface OwnerContextType {
  isOwner: boolean;
  unlockOwner: (passkey: string) => boolean;
  lockOwner: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const OwnerContext = createContext<OwnerContextType | undefined>(undefined);

const OWNER_PASSKEY = 'sudarshan19';
const STORAGE_KEY = 'sudarshan_is_owner_authenticated';

export const OwnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'true') {
        setIsOwner(true);
      }
    } catch (_) {}
  }, []);

  const unlockOwner = (passkey: string): boolean => {
    const trimmed = passkey.trim().toLowerCase();
    // Valid passkeys: 'sudarshan19' or 'sudarshan' or 'lama19'
    if (trimmed === OWNER_PASSKEY || trimmed === 'sudarshan' || trimmed === 'lama19') {
      setIsOwner(true);
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch (_) {}
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const lockOwner = () => {
    setIsOwner(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
  };

  return (
    <OwnerContext.Provider
      value={{
        isOwner,
        unlockOwner,
        lockOwner,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
      }}
    >
      {children}
    </OwnerContext.Provider>
  );
};

export const useOwner = (): OwnerContextType => {
  const context = useContext(OwnerContext);
  if (!context) {
    throw new Error('useOwner must be used within an OwnerProvider');
  }
  return context;
};

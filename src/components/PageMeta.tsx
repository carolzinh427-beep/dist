import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { COMPANY_CONFIG } from '../config/company';

interface PageMetaProps {
  title: string;
  description: string;
}

export const PageMeta: React.FC<PageMetaProps> = ({ title, description }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${title} | ${COMPANY_CONFIG.name}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

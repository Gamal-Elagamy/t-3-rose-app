'use client';
import { useEffect } from 'react';
import { useBreadcrumb } from '../context/breadcrumb.context';

export function SetBreadcrumbExtra({ text }: { text?: string }) {
  const { setExtra } = useBreadcrumb();

  useEffect(() => {
    setExtra(text);
    return () => setExtra(undefined);
  }, [text, setExtra]);

  return null;
}

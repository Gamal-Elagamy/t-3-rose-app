import React from 'react';

interface SectionSmallTitleProps {
  title: string;
}

export default function SectionSmallTitle({ title }: SectionSmallTitleProps) {
  return (
    <h3 className="text-base font-bold text-ds-text-secondary font-sarabun tracking-[25%] uppercase text-center">
      {title}
    </h3>
  );
}

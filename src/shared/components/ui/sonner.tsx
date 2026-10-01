'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from 'lucide-react';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4.5 text-ds-text-success" />,
        info: <InfoIcon className="size-4.5 text-ds-text-soft" />,
        warning: <TriangleAlertIcon className="size-4.5 text-ds-text-warning" />,
        error: <OctagonXIcon className="size-4.5 text-ds-text-danger" />,
        loading: <Loader2Icon className="size-4.5 animate-spin" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'cn-toast group flex w-full items-center gap-2.5 rounded-2xl border border-transparent bg-ds-bg-plain text-ds-text-plain py-3.5 pl-4 pr-3 shadow-(--shadow-subtle-lg)',
          title: 'text-sm font-medium text-ds-text-plain',
          description: 'text-sm font-semibold text-ds-text-plain',
          actionButton:
            'shrink-0 rounded-md bg-ds-bg-plain text-ds-text-plain px-2.5 py-1.5 text-xs font-medium',
          cancelButton:
            'shrink-0 rounded-md bg-transparent text-ds-text-soft px-2.5 py-1.5 text-xs font-medium',
          closeButton: 'text-ds-text-soft bg-transparent hover:bg-transparent',
          icon: 'shrink-0',
          success: 'bg-ds-bg-success-fade',
          error: 'bg-ds-bg-danger-fade',
          info: 'bg-ds-bg-muted',
          warning: 'bg-ds-bg-warning-fade',
          loading: 'bg-ds-bg-plain',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

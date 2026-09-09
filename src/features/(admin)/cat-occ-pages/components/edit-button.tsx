import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { PencilIcon } from 'lucide-react';
import { ItemPageType } from '../types/page-type';

export default function EditButton({
  text,
  id,
  style,
  page,
}: {
  text: string;
  id: string;
  style: string;
  page: ItemPageType;
}) {
  return (
    <Button
      render={<Link className="w-full md:w-auto" href={`/admin/${page}/edit?id=${id}`} />}
      nativeButton={false}
      variant="ghost"
      className={cn('flex items-center gap-1 text-ds-text-info cursor-pointer', style)}
    >
      <PencilIcon className="size-3.5" />
      {text}
    </Button>
  );
}

import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';
import { ItemPageType } from '../types/page-type';

export default function AddButton({ page, text }: { page: ItemPageType; text: string }) {
  return (
    <Link href={`/admin/${page}/add`}>
      <Button className="flex items-center gap-2.5 p-2.5 font-medium text-base cursor-pointer">
        <Plus className="size-5.5" />
        <span className="hidden md:inline">{text}</span>
      </Button>
    </Link>
  );
}

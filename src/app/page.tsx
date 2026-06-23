import { ThemeToggle } from '@/shared/components/theme-toggle';

export default function Home() {
  return (
    <div className="bg-ds-bg-info flex items-center justify-center flex-col py-10">
      <h1 className="text-7xl text-ds-text-primary ring-default border border-ds-border-info my-6 p-4">
        The quick brown fox jumps over the lazy dog.
      </h1>

      <ThemeToggle />
    </div>
  );
}

type EmptyStateProps = {
  message: string;
};

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="text-center text-lg font-medium text-muted-foreground">{message}</p>
    </div>
  );
}

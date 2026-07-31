interface StarsProps {
  count: number;
}

export function Stars({ count }: StarsProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>{i <= count ? '⭐' : '☆'}</span>
      ))}
    </div>
  );
}

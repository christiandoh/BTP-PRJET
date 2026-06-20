export default function Skeleton({ width = '100%', height = 20, borderRadius = 6, style }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-loading 1.5s infinite',
        ...style,
      }}
    />
  )
}

export function CardSkeleton() {
  return (
    <div style={{ background: 'white', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Skeleton width={48} height={48} borderRadius={10} />
        <div style={{ flex: 1 }}>
          <Skeleton width="60%" height={16} style={{ marginBottom: 8 }} />
          <Skeleton width="40%" height={12} />
        </div>
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div style={{ background: 'white', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Skeleton width={52} height={52} borderRadius={12} />
      <div style={{ flex: 1 }}>
        <Skeleton width={60} height={32} style={{ marginBottom: 4 }} />
        <Skeleton width={80} height={14} />
      </div>
    </div>
  )
}

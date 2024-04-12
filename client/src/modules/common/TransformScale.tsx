import { Dimensions } from '@/modules/common/geometry.types'
import { useScaledDimensions } from '@/modules/common/scale-dimensions.hook'
import { ReactNode } from 'react'

export default function TransformScale({
  children,
  dimensions,
  scale,
}: {
  children: ReactNode
  dimensions: Dimensions
  scale: number
}) {
  const scaledDims = useScaledDimensions(dimensions, scale)

  return (
    <div className="position-relative overflow-clip" style={scaledDims}>
      <div
        className="position-absolute"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
        }}
      >
        {children}
      </div>
    </div>
  )
}

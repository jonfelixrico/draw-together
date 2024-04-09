import { Dimensions } from '@/modules/common/geometry.types'
import { ReactNode } from 'react'

export default function TransformScale({
  children,
  contentScale,
  containerDimensions,
}: {
  children: ReactNode
  containerDimensions: Dimensions
  contentScale: number
}) {
  return (
    <div
      className="position-relative overflow-clip"
      style={containerDimensions}
    >
      <div
        className="position-absolute"
        style={{
          transform: `scale(${contentScale})`,
          transformOrigin: '0 0 ',
        }}
      >
        {children}
      </div>
    </div>
  )
}

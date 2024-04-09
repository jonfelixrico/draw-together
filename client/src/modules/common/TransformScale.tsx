import { Dimensions } from '@/modules/common/geometry.types'
import { ReactNode } from 'react'

export default function TransformScale({
  children,
  contentScale,
  containerDimensions,
}: {
  children: ReactNode
  /**
   * The container of the scaling dimensions.
   *
   * If you want to scale something visually and also have the correct DOM sizing,
   * give this prop the scaled value of the content. This means that you NEED to know the original
   * dimensions of the content that you put in.
   */
  containerDimensions: Dimensions
  /**
   * The scaling factor to be applied on the content via transform.
   */
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
          transformOrigin: '0 0',
        }}
      >
        {children}
      </div>
    </div>
  )
}

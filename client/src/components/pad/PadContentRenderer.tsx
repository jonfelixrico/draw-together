import { useMemo } from "react";
import { useAppSelector } from "../../store/hooks";
import { sortBy } from "lodash";
import { Dimensions } from "../../typings/geometry.types";
import PadPath from "./PadPath";

export default function PadContentRenderer ({
  dimensions
}: {
  dimensions: Dimensions
}) {
  const { localDraftPath, paths } = useAppSelector(state => {
    const { localDraftPath, paths } = state.pad
    return {
      localDraftPath,
      paths
    }
  })

  const pathsToRender = useMemo(() => {
    const arr = Object.values(paths)
    if (localDraftPath) {
      arr.push(localDraftPath)
    }

    return sortBy(arr, ({ timestamp }) => timestamp)
  }, [localDraftPath, paths])

  return <div style={dimensions} className="position-relative">
    {pathsToRender.map(data => {
      return <svg {...dimensions} key={data.id} className='position-absolute'>
        <PadPath value={data} />
      </svg>
    })}
  </div>
}

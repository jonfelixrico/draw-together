import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";
import Spinner from "react-bootstrap/Spinner";
import { If, Then } from "react-if";

export default function LoadingProvider ({
  children
}: {
  children: ReactNode
}) {
  const showLoading = useAppSelector(state => state.ui.loading)
  
  return <div className="position-relative">
    {/* This is the loading overlay */}
    <If condition={showLoading}>
      <Then>
        <div
          className="d-flex flex-column justify-content-center position-absolute h-100 w-100 align-items-center"
          style={{
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.38)',
          }}
        >
          <Spinner variant="light" />
        </div>
      </Then>
    </If> 
    {/* 
      The intention with isolate is to prevent any children of this div from visually overlapping the overlay
      even if they have a higher z-index value.
    */}
    <div className="isolate">{children}</div>
  </div>
}

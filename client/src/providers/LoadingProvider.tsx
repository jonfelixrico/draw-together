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
    <If condition={showLoading}>
      <Then>
        <div className="d-flex flex-column justify-content-center position-absolute h-100 w-100">
          <Spinner />
        </div>
      </Then>
    </If> 

    {children}
  </div>
}

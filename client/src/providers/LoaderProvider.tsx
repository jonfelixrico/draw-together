import { ReactNode } from "react";

export default function LoaderProvider ({
  children
}: {
  children: ReactNode
}) {
  return <div className="position-relative">
    {children}
  </div>
}

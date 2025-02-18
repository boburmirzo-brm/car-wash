import React, { ReactNode } from "react";

export const Loading = () => {
    return  <div className="w-full h-screen flex items-center justify-center">
    </div>
}

export const Suspense = ({children}:{children: ReactNode}) => {
    return <React.Suspense fallback={<Loading/>}>{children}</React.Suspense>
}
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { useEffect, useRef } from "react";

const useSecondRender = (callback: () => void) => {
  const hasRenderedOnce = useRef(false);
  const hasRenderedTwice = useRef(false);

  useEffect(() => {
    if (!hasRenderedOnce.current) {
      hasRenderedOnce.current = true;
    } else if (!hasRenderedTwice.current) {
      hasRenderedTwice.current = true;
      callback();
    }
  }, [callback]);
};

export default useSecondRender;

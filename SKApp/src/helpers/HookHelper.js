import { useState, useCallback } from "react";

function useForceUpdate() {
  const [, forceUpdate] = useState();

  return useCallback(() => {
    forceUpdate(s => !s);
  }, []);
}

export default {
  useForceUpdate
};

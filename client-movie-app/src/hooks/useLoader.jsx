import Loader from "../components/Loader";
import React, { useEffect, useState } from "react";

function useLoader() {
  const [showLoader, setShowLoader] = useState(false);

  const loader = <Loader />;

  return { showLoader, setShowLoader, loader };
}

export default useLoader;

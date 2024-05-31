import React from "react";
import Styles from "./Map.module.css";
export default function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lng = searchParams.get("long");
  const lat = searchParams.get("lat");
  return (
    <>
      <div className={Styles.mapContainer} onClick={() => navigate("form")}>
        <h1>Map</h1>
        <h1>
          Position:Long:{lng} - Lat:{lat}
        </h1>
      </div>
    </>
  );
}

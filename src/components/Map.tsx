import React from "react";
import Styles from "./Map.module.css";
import { useCities } from "../context/CityContext";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeolocation";
import useUrlLocation from "../hooks/useUrlLocation";
export default function Map() {
  const cityContext = useCities();
  const [lng, lat] = useUrlLocation();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <>
      <div className={Styles.mapContainer}>
        {!geoLocationPosition && (
          <Button onClick={getPosition} type="position">
            {isLoadingPosition ? "Loading..." : "Use your posiiton"}
          </Button>
        )}
        <MapContainer
          className={Styles.map}
          center={mapPosition}
          zoom={6}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
          {cityContext?.cities.map((city: any) => (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          ))}
          {<ChangeMapCenter position={mapPosition} />}
          <DetectChange />
        </MapContainer>
        ,
      </div>
    </>
  );
}

function ChangeMapCenter(props: { position: [lat: number, lng: number] }) {
  const { position } = props;
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectChange() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&long=${e.latlng.lng}`);
    },
  });
  return null;
}

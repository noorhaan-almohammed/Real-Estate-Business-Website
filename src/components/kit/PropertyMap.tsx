import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

type Props = {
  position: LatLngExpression;
  title: string;
  className?: string;
};

export default function PropertyMap({ position, title, className }: Props) {
  return (
    <div
      className={className ?? "w-full h-40 md:h-56 rounded-lg overflow-hidden"}
    >
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>{title}</Popup>
        </Marker>

        {/*

        <CircleMarker center={position} radius={10}>
          <Popup>{title}</Popup>
        </CircleMarker>
        */}
      </MapContainer>
    </div>
  );
}

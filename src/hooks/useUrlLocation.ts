export default function useUrlLocation() {
  const [searchParams] = useSearchParams();
  const lng = Number(searchParams.get("long"));
  const lat = Number(searchParams.get("lat"));

  return [lng, lat];
}

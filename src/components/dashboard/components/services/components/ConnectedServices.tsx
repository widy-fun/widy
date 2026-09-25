import { useGetServicesQuery } from "../../../../../api/servicesApi";
import ServiceCard from "./ServiceCard";

const ConnectedServices = ({ search }: { search: string }) => {
	const { data: services } = useGetServicesQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});
	return (
		<>
			{services
				?.filter(
					(service) =>
						service.authorized &&
						service.id.toLowerCase().includes(search.trim().toLowerCase()),
				)
				.map((service) => (
					<ServiceCard key={service.id} service={service} />
				))}
		</>
	);
};
export default ConnectedServices;

import { useGetServicesQuery } from "../../../../../api/servicesApi";
import ServiceCard from "./ServiceCard";

const NotConnectedServices = () => {
	const { data: services } = useGetServicesQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});
	return (
		<>
			{services
				?.filter((service) => !service.authorized)
				.map((service) => (
					<ServiceCard key={service.id} service={service} />
				))}
		</>
	);
};
export default NotConnectedServices;

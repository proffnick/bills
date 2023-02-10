import IconCard from "./IconCards";
import { services } from '../../lib/servicesData';

const ServicesList = () => {
  return(
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
      {
       services.map(service => {
       let iconColor = '';
       /*if(service.value === 'power') iconColor = 'text-warning';
       if(service.value === 'internet') iconColor = 'text-primary';
       if(service.value === 'data_bundle') iconColor = 'text-muted';
       if(service.value === 'airtime') iconColor = '';*/
       return <IconCard
        key={service.value} 
        title={service.name}
        icon={service.icon} 
        value={service.value}
        iconColorClass={iconColor}
        />})  
      }
    </div>
  )
}

export default ServicesList;


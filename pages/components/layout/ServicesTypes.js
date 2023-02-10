import ImageCard from "./ImageCards";

const ServicesTypes = ({ services, type, action }) => {
  return(
    <div className="py-4">
      <h4 className="mb-3 text-muted">Select your {type.replace('_', ' ')} provider</h4>
      {
       services.map(service => {
       let image = '/default.png';
       if(service[0].short_name.toLowerCase().includes('mtn')) image = '/airtime/mtn.png';
       if(service[0].short_name.toLowerCase().includes('glo')) image = '/airtime/glo.png';
       if(service[0].short_name.toLowerCase().includes('9mobile')) image = '/airtime/9mobile.png';
       if(service[0].short_name.toLowerCase().includes('airtel')) image = '/airtime/airtel.png';
       if(service[0].short_name.toLowerCase().includes('smile')) image = '/internet/smile.png';
       if(service[0].short_name.toLowerCase().includes('spectranet') || service[0].short_name.toLowerCase().includes('top up account')) image = '/internet/spectranet.png';
       if(service[0].short_name.toLowerCase().includes('ipnx')) image = '/internet/ipnx.jpg';
       if(service[0].short_name.toLowerCase().includes('swift')) image = '/internet/swift.jpg';

       if(service[0].short_name.toLowerCase().includes('abuja')) image = '/power/abuja.png';
       if(service[0].short_name.toLowerCase().includes('benin')) image = '/power/benin.jpg';
       if(service[0].short_name.toLowerCase().includes('eko')) image = '/power/eko.png';
       if(service[0].short_name.toLowerCase().includes('ekedc')) image = '/power/eko.png';
       if(service[0].short_name.toLowerCase().includes('enugu')) image = '/power/enugu.png';
       if(service[0].short_name.toLowerCase().includes('ibadan')) image = '/power/ibadan.png';
       if(service[0].short_name.toLowerCase().includes('ikeja')) image = '/power/ikeja.png';
       if(service[0].short_name.toLowerCase().includes('ikedc')) image = '/power/ikeja.png';
       if(service[0].short_name.toLowerCase().includes('jos')) image = '/power/jos.png';
       if(service[0].short_name.toLowerCase().includes('kaduna')) image = '/power/kaduna.png';
       if(service[0].short_name.toLowerCase().includes('kano')) image = '/power/kano.png';
       if(service[0].short_name.toLowerCase().includes('lekki')) image = '/power/lekki.jpg';
       if(service[0].short_name.toLowerCase().includes('port')) image = '/power/port.png';
       if(service[0].short_name.toLowerCase().includes('yola')) image = '/power/yola.jpg';
       if(service[0].short_name.toLowerCase().includes('phc')) image = '/power/port.png';

       if(service[0].short_name.toLowerCase().includes('catholic')) image = '/church/catholic.jpg';
       if(service[0].short_name.toLowerCase().includes('christ')) image = '/church/christ.jpg';
       if(service[0].short_name.toLowerCase().includes('grace')) image = '/church/grace.jpg';
       if(service[0].short_name.toLowerCase().includes('house')) image = '/church/house.jpg';
       if(service[0].short_name.toLowerCase().includes('rccg')) image = '/church/rccg.jpg';
       if(service[0].short_name.toLowerCase().includes('salvation')) image = '/church/salvation.jpg';
       if(service[0].short_name.toLowerCase().includes('winners')) image = '/church/winners.jpg';
       
       if(service[0].short_name.toLowerCase().includes('startimes')) image = '/cables/startimes.jpg';
       if(service[0].biller_code === 'BIL123') image = '/cables/startimes.jpg';
       //BIL123
       if(service[0].short_name.toLowerCase().includes('gotv')) image = '/cables/gotv.jpg';
       if(service[0].short_name.toLowerCase().includes('dstv')) image = '/cables/dstv.jpg';
       if(service[0].short_name.toLowerCase().includes('dhl')) image = '/others/dhl.jpg';
       if(service[0].short_name.toLowerCase().includes('firs')) image = '/others/firs.jpg';
       if(service[0].short_name.toLowerCase().includes('federal inland')) image = '/others/firs.jpg';
       return <ImageCard
        key={service?.[0]?.biller_code} 
        name={service?.[0]?.name}
        biller_name={service?.[0]?.biller_name} 
        biller_code={service?.[0]?.biller_code}
        type={type}
        amount={service?.[0]?.amount}
        image={image}
        action={action}
        />})  
      }
    </div>
  )
}

export default ServicesTypes;


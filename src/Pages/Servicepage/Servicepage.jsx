import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DynamicBlockRenderer from "../Servicepage/DynamicBlockRenderer";

const ServicePage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data.data.service))
      .catch(console.error);
  }, [id]);

  if (!service) return <p>Loading...</p>;

  return (
    <div>
      <DynamicBlockRenderer layout={service.layout_config} />
    </div>
  );
};

export default ServicePage;

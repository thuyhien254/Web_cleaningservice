import "../ServiceBlock/DefinitionSection.css";

const DefinitionSection = ({ data }) => {
  return (
    <section className="defc-section">

      <h2 className="defc-title">{data?.title || ""}</h2>

      <div className="defc-content">
        <p>{data?.content || ""}</p>
      </div>

    </section>
  );
};

export default DefinitionSection;

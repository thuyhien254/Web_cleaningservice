import "../ServiceBlock/DefinitionSection.css";

const DefinitionSection = ({ data }) => {
  return (
    <section className="defc-section">

      <h2 className="defc-title">{data?.title || ""}</h2>

      <div 
        className="defc-content"
        dangerouslySetInnerHTML={{ __html: data?.content || "" }}
      />

    </section>
  );
};

export default DefinitionSection;

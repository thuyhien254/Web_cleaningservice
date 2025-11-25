import IntroSection from "../ServiceBlock/IntroSection";
import DefinitionSection from "../ServiceBlock/DefinitionSection";
import PricingSection from "../ServiceBlock/PricingSection";
import TaskTabsSection from "../ServiceBlock/TaskTabsSection";
import ProcessSection from "../ServiceBlock/ProcessSection";
import BookingSection from "../ServiceBlock/BookingSection";

const DynamicBlockRenderer = ({ layout }) => {
  if (!layout || layout.length === 0) return null;

  const mapping = {
    intro: IntroSection,
    definition: DefinitionSection,
    pricing: PricingSection,
    tasktab: TaskTabsSection,
    process: ProcessSection,
    booking: BookingSection,
  };

  return (
    <div className="service-page">
      {layout.map((block, index) => {
        const BlockComponent = mapping[block.type];
        if (!BlockComponent) return null;

        return (
          <BlockComponent
            key={index}
            data={block.data}
          />
        );
      })}
    </div>
  );
};

export default DynamicBlockRenderer;

import IntroSection from "../HouseCleaningpage/Section/IntroSection";
import Bookclean from "./Section/Bookclean";
import DefcSection from "./Section/DefcSection";
import PricingSection from "./Section/PricingSection";
import TaskTabsSection from "./Section/TaskTabsSection";

const HouseCleaningpage = () => {
  return (
    <>
      <IntroSection />
      <DefcSection />
      <TaskTabsSection />
      <PricingSection />
      <Bookclean/>
    </>
  );
};

export default HouseCleaningpage;

import WaterIntake from 'containers/widgets/waterintake/WaterIntake';
import Playstore from 'components/playstore/Playstore';

import headerconfig from 'config/header.json';
import Info from 'content/widgets/watercalculator/Info';

const WaterCalculator = () => {
  return (
    <>
      <WaterIntake />
      <Info />
      <Playstore link={headerconfig.links.drinkingbuddy} />
    </>
  );
};

export default WaterCalculator;

import BMICalculator from 'containers/widgets/bmicalculator/BMICalculator';
import headerconfig from 'config/header.json';
import Info from 'content/widgets/bmi/Info';

const Index = () => {
  return (
    <>
      <BMICalculator />
      <Info />
    </>
  );
};

export default Index;

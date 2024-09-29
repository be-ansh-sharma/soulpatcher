import Head from 'next/head';
import headerconfig from 'config/header.json';
import WasteCounter from 'containers/widgets/wastecounter/WasteCounter';

export default function Index() {
  let titleText = `Waste Counter - ${headerconfig.brandName}`;

  return (
    <>
      <WasteCounter />
    </>
  );
}

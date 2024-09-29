import { Button } from '@chakra-ui/react';
import { uploadQuotesToFirebase } from 'services/Firestore';

export default function Quotes() {
  const uploadQuotes = () => {
    uploadQuotesToFirebase();
  };
  return (
    <div>
      <Button onClick={uploadQuotes}>Upload</Button>
    </div>
  );
}

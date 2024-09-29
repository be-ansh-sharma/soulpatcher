import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

export default function Loading() {
  return (
    <div style={{ width: '100%' }}>
      <Box padding='6' boxShadow='lg'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
      </Box>
    </div>
  );
}

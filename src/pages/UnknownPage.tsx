import React, { useEffect } from 'react';
import { Box, styled } from '@mui/material';

export const UnknownPage: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = '#/';
    }, 3000)
  }, [])

  const EmptyPage = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    owerflow: 'hidden',
  });

  const Image = styled('img')({
    width: '100%',
    maxWidth: '500px',
    objectFit: 'cover',
    objectPosition: 'center',
  });

  return (
    <EmptyPage>
      <Image
        src='https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg'
        alt='404'
      />
    </EmptyPage>
  );
}

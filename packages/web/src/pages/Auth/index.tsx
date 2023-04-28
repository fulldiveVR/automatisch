import * as React from 'react';
import Box from '@mui/material/Box';
import { useSearchParams } from 'react-router-dom';

import Container from 'components/Container';
import TokenAuth from 'components/TokenAuth';

export default function Auth(): React.ReactElement {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || undefined;

  return (
    <Box sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
      <Container maxWidth="sm">
        {token && <TokenAuth token={token} />}
      </Container>
    </Box>
  );
}

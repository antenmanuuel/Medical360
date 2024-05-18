import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ProcessCard = ({ process }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div" className="process-name" >
          {process.patientName}
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Start Date: {new Date(process.startDate).toDateString()}
        </Typography> */}
        {/* Additional information can be displayed here */}
      </CardContent>
    </Card>
  );
};

export default ProcessCard;
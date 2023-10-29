import { Card, CardContent, Typography } from '@mui/material';

export default function MyCard({title, content}) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography>{content}</Typography>
      </CardContent>
    </Card>
  );
}


// TODO: wrap this up in figma, and make a great card there, then translate it to react.
// desire is to have color coded, w a background chart representation, a chg arrow and amount, etc
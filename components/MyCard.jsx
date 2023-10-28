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
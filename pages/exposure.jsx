import SearchAppBar from '../components/SearchBar';
import { Box } from '@mui/material';
import TreeExample from '../components/charts/TreeMap';

export default function ExposurePage() {
  return (
    <div>
        <SearchAppBar />
        <Box>
            <TreeExample />
        </Box>
    </div>
   
  );
}
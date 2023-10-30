import SearchAppBar from '../components/SearchBar';
import { Box } from '@mui/material';
import TreeExample from '../components/charts/TreeMap';
import Heatmap from '../components/charts/HCHeatmap';

export default function ExposurePage() {
  return (
    <div>
        <SearchAppBar />
        <Box>
            <TreeExample />
            <Heatmap />
        </Box>
    </div>
   
  );
}
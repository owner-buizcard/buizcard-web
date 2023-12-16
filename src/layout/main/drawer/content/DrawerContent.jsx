// project import
import SimpleBarScroll from '../../../../components/third-party/SimpleBar';
import Navigation from './navigation/Navigation';
import NavCard from './NavCard';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
  <SimpleBarScroll
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        height: 'auto',
        flexDirection: 'column'
      }
    }}
  >
    <Navigation />
    <NavCard />
  </SimpleBarScroll>
);

export default DrawerContent;

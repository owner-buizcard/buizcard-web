import { useRef, useState } from 'react';

// material-ui
import {
  Badge,
  Box,
  IconButton
} from '@mui/material';

// assets
import { BellOutlined } from '@ant-design/icons';

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'none';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        disableRipple
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={4} color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default Notification;

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { Box, ButtonBase } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// project import
import LogoImg from '../../assets/images/logo.png'
import { activeItem } from '../../store/reducers/menu';
import config from '../../config';

// ==============================|| MAIN LOGO ||============================== //

const Logo = ({ sx, to }) => {
  const { defaultId } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      component={Link}
      onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      to={!to ? config.defaultPath : to}
      sx={sx}
    >
      <Box component={"img"} src={LogoImg} width={"100%"}/>
    </ButtonBase>
  );
};

Logo.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default Logo;

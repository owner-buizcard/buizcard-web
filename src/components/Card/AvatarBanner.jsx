import { Avatar } from "@mui/material";
import Banner from "./Banner";

const AVATAR_SIZE = 104;

const AvatarBanner = ({ image, picture }) => (
    <div style={{ position: 'relative' }}>
      <Banner image={image} />
      <Avatar
        src={picture}
        sx={{
          border: '4px solid white',
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translate(-50%, 50%)'
        }}
      />
    </div>
  );

export default AvatarBanner;
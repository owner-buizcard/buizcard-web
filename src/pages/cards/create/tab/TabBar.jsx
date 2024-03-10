import { BuildOutlined, FilterOutlined, LinkOutlined, QrcodeOutlined, UserOutlined } from "@ant-design/icons";
import { Box, Tab, Tabs, useMediaQuery } from "@mui/material";


function a11yProps(index) {
    return {
      id: `profile-tab-${index}`,
      'aria-controls': `profile-tabpanel-${index}`
    };
  }

const TabBar = ({value, handleChange})=>{


    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));


    const tabItems = [
        {
            label: 'About',
            icon: <UserOutlined style={{ marginBottom: 0, marginRight: '10px' }} />
        },
        {
            label: 'Business',
            icon: <BuildOutlined style={{ marginBottom: 0, marginRight: '10px' }} />
        },
        {
            label: 'Links',
            icon: <LinkOutlined style={{ marginBottom: 0, marginRight: '10px' }} />
        },
        {
            label: 'Qr Code',
            icon: <QrcodeOutlined style={{ marginBottom: 0, marginRight: '10px' }} />
        },
        {
            label: 'Lead Capture',
            icon: <FilterOutlined style={{ marginBottom: 0, marginRight: '10px' }} />
        }
    ]


    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
                variant={isSmallScreen ? "scrollable": "fullWidth"} 
                scrollButtons="auto"
                value={value} 
                onChange={handleChange} 
                aria-label="profile tabs">
                {
                    tabItems.map((item)=>{
                        return ( 
                            <Tab
                                key={item.label}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textTransform: 'capitalize'
                                }}
                                icon={item.icon}
                                label={item.label}
                                {...a11yProps(0)}
                            />
                        ) 
                    })
                }
            </Tabs>
        </Box>
    )
}

export default TabBar;
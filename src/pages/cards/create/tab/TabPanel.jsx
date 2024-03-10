import PropTypes from 'prop-types';
import AboutTab from './AboutTab';
import BusinessTab from './BusinessTab';
import QrCodeTab from './QrCodeTab';
import LinksTab from './LinksTab';
import LeadCaptureTab from './LeadCaptureTab';

function TabPanelWrapper({ children, value, index, ...other }) {
    return (
      <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
        {value === index && children}
      </div>
    );
}
  
TabPanelWrapper.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};


const TabPanel = ({value})=>{

    return (
        <>
            <TabPanelWrapper value={value} index={0}>
                <AboutTab/>
            </TabPanelWrapper>
            <TabPanelWrapper value={value} index={1}>
                <BusinessTab/>
            </TabPanelWrapper>
            <TabPanelWrapper value={value} index={2}>
                <LinksTab/>
            </TabPanelWrapper>
            <TabPanelWrapper value={value} index={3}>
                <QrCodeTab/>
            </TabPanelWrapper>
            <TabPanelWrapper value={value} index={4}>
                <LeadCaptureTab/>
            </TabPanelWrapper>
        </>
    )
}

export default TabPanel;
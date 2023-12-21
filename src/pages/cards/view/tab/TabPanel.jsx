import PropTypes from 'prop-types';
import ShareTab from './ShareTab';
import VBTab from './VBTab';
import SignatureTab from './SignatureTab';
import AnalyticsTab from './AnalyticsTab';
import SettingsTab from './SettingsTab';

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


const TabPanel = ({value, cardData, captureQr, handleSettingsChange})=>{

    return (
        <>
            <TabPanelWrapper value={value} index={0}>
                <ShareTab cardData={cardData} captureQr={captureQr}/>
            </TabPanelWrapper>
            <TabPanelWrapper value={value} index={1}>
                <VBTab cardData={cardData}/>
            </TabPanelWrapper>
            <TabPanelWrapper value={value} index={2}>
                <SignatureTab cardData={cardData}/>
            </TabPanelWrapper>
            <TabPanelWrapper value={value} index={3}>
                <AnalyticsTab cardData={cardData}/>
            </TabPanelWrapper>
            <TabPanelWrapper value={value} index={4}>
                <SettingsTab cardData={cardData} onChange={handleSettingsChange}/>
            </TabPanelWrapper>
        </>
    )
}

export default TabPanel;
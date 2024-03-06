import { Box, Typography } from "@mui/material";

const TermsOfService = ()=>{

  return (
    <Box sx={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      background: "#fff",
      boxShadow: "0px 2px 30px #ccc6"
    }}>
      <Typography variant="h2" textAlign={"center"}>Terms of Service</Typography>
      <Box height={54}/>
      <Typography>Buizcard Terms of Service</Typography>
      <Typography>Last updated: March 01, 2024</Typography>
      <Box height={24}/>
      <Typography>Welcome to Buizcard! These Terms of Service ("Terms") govern your use of the Buizcard website located at www.buizcard.com (the "Site") and the Buizcard mobile applications (collectively, the "Service"). By using the Service, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use the Service.</Typography>
      <Box height={24}/>
      <Typography variant="h5">## 1. Acceptance of Terms</Typography>
      <Box height={8}/>
      <Typography>By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you are using the Service on behalf of an organization, you represent and warrant that you have the authority to bind the organization to these Terms.</Typography>
      <Box height={16}/>
      <Typography variant="h5">## 2. Changes to Terms</Typography>
      <Box height={8}/>
      <Typography>Buizcard reserves the right to modify or revise these Terms at any time. Any changes will be effective immediately upon posting the updated Terms on the Site. Your continued use of the Service after the posting of changes constitutes your acceptance of such changes.</Typography>
      <Box height={16}/>
      <Typography variant="h5">## 3. Use of the Service</Typography>
      <Box height={8}/>
      <Typography>You agree to use the Service in compliance with all applicable laws and regulations. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</Typography>
      <Box height={16}/>
      <Typography variant="h5">## 4. User Content</Typography>
      <Box height={8}/>
      <Typography>You retain ownership of any content you submit to the Service ("User Content"). By submitting User Content, you grant Buizcard a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the User Content in connection with the Service.</Typography>
      <Box height={16}/>
      <Typography variant="h5">## 5. Prohibited Conduct</Typography>
      <Box height={8}/>
      <Typography>You agree not to engage in any conduct that violates these Terms, including but not limited to:</Typography>

      <Typography>- Violating any applicable laws or regulations.</Typography>
      <Typography>- Impersonating any person or entity or falsely stating or misrepresenting your affiliation with a person or entity.</Typography>
      <Typography>- Interfering with or disrupting the integrity or performance of the Service.</Typography>
      <Box height={16}/>
      <Typography variant="h5">## 6. Termination</Typography>
      <Box height={8}/>
      <Typography>Buizcard reserves the right to suspend or terminate your access to the Service at any time for any reason without notice.</Typography>
      <Box height={16}/>
      <Typography variant="h5">## 7. Disclaimers</Typography>
      <Box height={8}/>
      <Typography>The Service is provided "as is" and "as available" without any warranties, express or implied. Buizcard does not warrant that the Service will be error-free or uninterrupted.</Typography>
      <Box height={16}/>
      <Typography variant="h5">## 8. Limitation of Liability</Typography>
      <Box height={8}/>
      <Typography>Buizcard and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.</Typography>
      <Box height={16}/>
      <Typography variant="h5">## 9. Governing Law</Typography>
      <Box height={8}/>
      <Typography>These Terms are governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.</Typography>
      <Box height={16}/>
      <Typography variant="h5">## 10. Contact Us</Typography>
      <Box height={8}/>
      <Typography>If you have any questions about these Terms, please contact us at <a href="#" style={{ color: 'blue', textDecoration: 'underline' }} onClick={()=>window.location.href = `mailto:contact@buizcard.com`}>contact@buizcard.com</a>.</Typography>

      <Typography>---</Typography>

      <Typography>We appreciate your use of Buizcard and hope you have a great experience!</Typography>

    </Box>
  )
}

export default TermsOfService;
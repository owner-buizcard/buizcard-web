import { ContactsOutlined, ExportOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { useTheme } from "@emotion/react";
import { Avatar, Box, Button, FormControl, Grid, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useState } from "react";
import { HiUser } from 'react-icons/hi2';
import { useSelector } from "react-redux";
import MainCard from "../../../components/MainCard";
import ContactOptions from "../../../components/menu/ContactOptions";
import { formatDate } from "../../../utils/utils";
import { getMyContacts } from "../../../network/service/connectService";
import { useDispatch } from "react-redux";
import { updateContacts } from "../../../store/reducers/app";
import SkeletonTable from "../../../components/skeleton/SkeletonTable";

const ContactList=()=>{

    const data = useSelector((state)=>state.app.contacts);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();

    const contacts = data?.map((contact) => {
      let updatedContact = { ...contact };
    
      if (contact.type === "Message") {
        updatedContact.name = `${contact.details?.name}`;
        updatedContact.phoneNumber = `${contact.details?.phoneNumber}`;
        updatedContact.email = `${contact.details?.email}`;
        updatedContact.message = `${contact.details?.message}`;
      } else {
        updatedContact.picture = `${contact.card?.picture}`;
        updatedContact.name = `${contact.card?.name?.firstName??''} ${contact.card?.name?.middleName??''} ${contact.card?.name?.lastName??''}`;
        updatedContact.phoneNumber = `${contact.card?.phoneNumber??''}`;
        updatedContact.email = `${contact.card?.email}`;
        updatedContact.cardName = `${contact.card.cardName}`;
      }
      return updatedContact; 
    });


    const ODD_OPACITY = 0.2;

    const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
      [`& .${gridClasses.row}.even`]: {
        backgroundColor: theme.palette.grey[200],
        '&:hover, &.Mui-hovered': {
          backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        },
        '&.Mui-selected': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
          '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY +
                theme.palette.action.selectedOpacity +
                theme.palette.action.hoverOpacity,
            ),
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity,
              ),
            },
          },
        },
      },
    }));


    const columns = [
        { 
          field: 'picture', 
          headerName: 'Profile',  
          width: 80,
          renderCell: (params) => {
            return (
              <>
                <Avatar src={params.value}><HiUser /> </Avatar>
              </>
            );
          } 
        },
        { 
          field: 'contact', 
          headerName: 'Contact', 
          flex: 1,
          renderCell: (params) => {
            return (
              <Typography variant="title">{params.value?.fullName}</Typography>
            );
          } 
        },
        { 
          field: 'phoneNumber', 
          headerName: 'Phone Number', 
          flex: 1,
          renderCell: (params) => {
            return (
              <Stack>
                <Typography>{params.value}</Typography>
              </Stack>
            );
          } 
        },
        { 
          field: 'tags', 
          headerName: 'Tag', 
          flex: 1,
        },
        { 
          field: 'type', 
          headerName: 'Type', 
          width: 120,
          renderCell: (params) => {
            return (
              <ContactsOutlined style={{fontSize: 22}}/>
            );
          } 
        },
        { 
          field: 'connectedAt', 
          headerName: 'Date', 
          width: 130
        },
        { 
          field: '_id',
          headerName: 'Export', 
          width: 60,
          renderCell: (params) => {
            return (
              <Box sx={{borderRadius: '3px', background: theme.palette.grey[100], px: 2, py: 0.5}}>
                <ExportOutlined style={{fontSize: 16}}/>
              </Box>
            );
          } 
        },
        { 
          field: 'id',
          headerName: '', 
          width: 30,
          renderCell: (params) => {
            return (
              <Stack direction={"row"} spacing={1}>
                <ContactOptions/>
              </Stack>
            );
          } 
        }
      ];

    const rows = contacts.map((contact)=>{
        return {
            id: contact._id, 
            _id: contact._id, 
            contact: {
              fullName: contact.name,
              email: contact.email
            },
            picture: contact.picture,
            tags: contact.tags,
            type: contact.type,
            phoneNumber: contact.phoneNumber,
            connectedAt: formatDate(contact.connectedAt)
        }
    })

    const refresh =async()=>{
      setLoading(true);
      const contacts = await getMyContacts();
      console.log(contacts)
      dispatch(updateContacts(contacts))
      setLoading(false);
    }

    return (
        <Grid container rowSpacing={2.5} columnSpacing={2.75}>

            <Grid item xs={8} sx={{ mb: 0 }}>
                <Typography variant="h4">My Contacts</Typography>
            </Grid>
            <Grid item xs={12} display={"flex"}>
                <MainCard sx={{width: "100%"}}>
                    {
                      loading
                        ? <SkeletonTable/>
                        : (
                          <>
                            <Stack direction={"row"} spacing={2} sx={{mb: 3}}>
                      
                            <Box sx={{ width: '100%'}}>
                              <FormControl sx={{ width: { xs: '100%', md: 300 } }}>
                                <OutlinedInput
                                  id="header-search"
                                  startAdornment={
                                    <InputAdornment position="start" sx={{ mr: -0.5 }}>
                                      <SearchOutlined />
                                    </InputAdornment>
                                  }
                                  placeholder="Search by name, email or phone number"
                                  aria-describedby="header-search-text"
                                  inputProps={{
                                    'aria-label': 'weight'
                                  }}
                                />
                              </FormControl>
                            </Box>
        
                            <Box>
                              <Button variant="outlined" size="medium" sx={{px: 0, width: "140px"}} 
                                onClick={()=>setOpenCreate(true)}
                                startIcon={
                                  <PlusOutlined style={{fontSize: "16px"}}/>
                                }>
                                Add Leads
                              </Button>
                            </Box>
        
                            <IconButton  disabled={true}> 
                            <Box sx={{border: `1px solid ${theme.palette.grey[300]}`,borderRadius: '4px', p: 1}}>
                                <ExportOutlined/>
                            </Box>
                            </IconButton>
        
                            <IconButton onClick={refresh}>
                            <Box sx={{border: `1px solid ${theme.palette.grey[300]}`,borderRadius: '4px', p: 1}}>
                                <ReloadOutlined/>
                            </Box>
                            </IconButton>
        
                            </Stack>
        
                            <StripedDataGrid
                              rows={rows}
                              columns={columns}
                              getRowClassName={(params) =>
                                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                              }
                              sx={{
                                '& .MuiDataGrid-columnHeader': {
                                  fontSize: "15px",
                                  fontWeight: "900",
                                },
                                '& .MuiDataGrid-cell': {
                                  fontSize: "14px",
                                },
                                border: 1,
                                borderColor: `${theme.palette.grey[200]}`
                              }}
                              initialState={{
                                  pagination: {
                                      paginationModel: { page: 0, pageSize: 5 },
                                  },
                              }}
                              pageSizeOptions={[5, 10]}
                              checkboxSelection
                              disableRowSelectionOnClick
                              onRowClick={()=>{}}
                            />
                          </>
                        )
                    }
                </MainCard>
            </Grid> 

        </Grid>
    )
}

export default ContactList;
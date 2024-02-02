import { ContactsOutlined, ExportOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { useTheme } from "@emotion/react";
import { Avatar, Box, Button, Chip, FormControl, Grid, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useState } from "react";
import { HiUser } from 'react-icons/hi2';
import { useSelector } from "react-redux";
import MainCard from "../../../components/MainCard";
import ContactOptions from "../../../components/menu/ContactOptions";
import { downloadFile, formatDate, generateVcard } from "../../../utils/utils";
import { getMyContacts, removeContact } from "../../../network/service/connectService";
import { useDispatch } from "react-redux";
import { updateContacts } from "../../../store/reducers/app";
import SkeletonTable from "../../../components/skeleton/SkeletonTable";
import AddTagDialog from "../../../components/dialogs/AddTagDialog";
import { useNavigate } from "react-router-dom";

const ContactList=()=>{

    const data = useSelector((state)=>state.app.contacts);
    const [loading, setLoading] = useState(false);
    const [openTag, setOpenTag] = useState(false);
    const [selected, setSelected] = useState(null);
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const contacts = data?.map((contact) => {
      let updatedContact = { ...contact };
    
      if (contact.card==null) {
        updatedContact.picture = `${contact.details?.picture}`;
        updatedContact.name = `${contact.details?.name}`;
        updatedContact.phoneNumber = `${contact.details?.phone}`;
        updatedContact.email = `${contact.details?.email}`;
        updatedContact.message = `${contact.details?.message}`;
      } else {
        updatedContact.picture = `${contact.card?.picture}`;
        updatedContact.name = `${contact.card?.name?.firstName??''} ${contact.card?.name?.middleName??''} ${contact.card?.name?.lastName??''}`;
        updatedContact.phoneNumber = `${contact.card?.phoneNumber??''}`;
        updatedContact.email = `${contact.card?.email}`;
        updatedContact.cardName = `${contact.card?.cardName}`;
      }
      return updatedContact; 
    });
    
    console.log(contacts);

    const openCreateContact =()=>{
      navigate('/dashboard/contacts/create')
    }


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

    const deleteContact =async(contactId)=>{
      const updated = data.filter((contact)=>contact._id!=contactId);
      dispatch(updateContacts(updated))
      await removeContact(contactId);
    }

    const saveContact = async (contactId) => {
      const contact = data.find((contact)=>contact._id===contactId);
      const cardData = contact.card;
      const vcfData = generateVcard(cardData);
      downloadFile(vcfData, `${cardData?.name?.firstName}-${cardData?.name?.lastName}-Bizcard`);
    };

    const addTag = async (contactId) => {
      const contact = data.find((contact)=>contact._id===contactId);
      setSelected(contact);
      setOpenTag(true);
    };

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
          renderCell: (params) => {
            return <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
                {
                    params.value?.map((tag)=><Chip
                            key={tag}
                            label={tag}
                            sx={{ height: 24, '& .MuiChip-label': { fontSize: '0.7rem', py: 1 } }}
                        />
                    )
                }
            </Stack>
          }
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
                <ContactOptions 
                  onDelete={()=>deleteContact(params.value)}
                  onSave={()=>saveContact(params.value)}
                  onAdd={()=>addTag(params.value)}
                />
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

    const updateTags =async(updated)=>{
      setOpenTag(false);
      const updatedContacts = data.map((contact) => {
          if (contact._id === updated._id) {
            return updated;
          }
          return contact;
        });
      console.log(updatedContacts);
      dispatch(updateContacts(updatedContacts));
    }

    return (
        <Grid container rowSpacing={2.5} columnSpacing={2.75}>
            <AddTagDialog open={openTag} contact={selected} handleCancel={()=>setOpenTag(false)} onAdded={(updated)=>updateTags(updated)}/>
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
                                onClick={()=>openCreateContact()}
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
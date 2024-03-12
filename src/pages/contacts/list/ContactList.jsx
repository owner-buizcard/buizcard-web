import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { Avatar, Box, Button, Chip, FormControl, Grid, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import { HiUser } from 'react-icons/hi2';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { ContactsOutlined, EditOutlined, ExportOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import MainCard from '../../../components/MainCard';
import ContactOptions from '../../../components/menu/ContactOptions';
import SkeletonTable from '../../../components/skeleton/SkeletonTable';
import AddTagDialog from '../../../components/dialogs/AddTagDialog';
import { useNavigate } from 'react-router-dom';
import { downloadFile, formatDate, generateVcard } from '../../../utils/utils';
import { getMyContacts, removeContact } from '../../../network/service/connectService';
import { updateContacts } from '../../../store/reducers/app';
import ExportOptions from '../../../components/Contact/ExportOptions';
import SendMailDialog from '../../../components/dialogs/SendMailDialog';
import { exportCSVFile } from "json2csv-converter";
import * as XLSX from 'xlsx';

const ODD_OPACITY = 0.2;

const ContactList = () => {
  const data = useSelector((state) => state.app.contacts);
  const [loading, setLoading] = useState(false);
  const [openTag, setOpenTag] = useState(false);
  const [openMail, setOpenMail] = useState(false);
  const [selectedMail, setSelectedMail] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [contactsData, setContactsData] = useState(data?.map((contact) => {
    const updatedContact = { ...contact };
    const { details, card } = contact;
    const contactInfo = details ?? card;
    updatedContact.picture = contactInfo?.picture;
    updatedContact.name =
      details != null
        ? contactInfo.name
        : `${contactInfo?.name?.firstName ?? ''} ${contactInfo?.name?.middleName ?? ''} ${contactInfo?.name?.lastName ?? ''}`;
    updatedContact.phoneNumber = details != null ? contactInfo?.phone : contactInfo?.phoneNumber ?? '';
    updatedContact.email = contactInfo?.email ?? '';
    updatedContact.message = contactInfo?.message ?? '';
    updatedContact.cardName = card?.cardName ?? '';
    return updatedContact;
  }));
  const [contacts, setContacts] = useState(contactsData);

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[200],
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      },
      '&.Mui-selected': {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity),
        '&:hover, &.Mui-hovered': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
          ),
          '@media (hover: none)': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity)
          }
        }
      }
    }
  }));

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = contactsData.filter(
      (contact) =>
        contact.name?.toLowerCase()?.includes(query) ||
        contact.email?.toLowerCase()?.includes(query) ||
        contact.phoneNumber?.includes(query) ||
        contact.location?.toLowerCase()?.includes(query)
    );
    setContacts(filtered);
  };

  const deleteContact = async (contactId) => {
    const updated = data.filter((contact) => contact._id !== contactId);  
    const newe = contactsData.filter((contact) => contact._id !== contactId); 
    setContactsData(newe); 
    setContacts(newe);
    dispatch(updateContacts([...updated]));
    await removeContact(contactId);
  };

  const editContact = async (contactId) => {
    navigate(`/dashboard/contacts/create?contactId=${contactId}`);
  };

  const previewContact = async (contact) => {
    const link = contact.card.cardLink;
    if(link){
      window.open(link, "_blank")
    }
  };

  const sendMail = async (contact) => {
    setSelectedMail([contact.email]);
    setOpenMail(true);
  };

  const saveContact = async (contactId) => {
    const contact = data.find((contact) => contact._id === contactId);
    const vcfData = generateVcard(contact.card);
    downloadFile(vcfData, `${contact.card?.name?.firstName}-${contact.card?.name?.lastName}-Buizcard`);
  };

  const addTag = async (contactId) => {
    const contact = data.find((contact) => contact._id === contactId);
    setSelected(contact);
    setOpenTag(true);
  };

  const renderProfileCell = (params) => (
    <Avatar src={params.value}>
      <HiUser />{' '}
    </Avatar>
  );

  const renderContactCell = (params) => (
    <Stack>
      <Typography variant="title">{params.value?.fullName}</Typography>
      {/* <Typography variant="caption" sx={{color: 'grey'}}>{params.value?.email}</Typography> */}
    </Stack>
  );

  const renderPhoneNumberCell = (params) => (
    <Stack>
      <Typography>{params.value}</Typography>
    </Stack>
  );

  const renderTagCell = (params) => (
    <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
      {params.value?.map((tag) => (
        <Chip key={tag} label={tag} sx={{ height: 24, '& .MuiChip-label': { fontSize: '0.7rem', py: 1 } }} />
      ))}
    </Stack>
  );

  const renderTypeCell = (params) => (
    params.value=="PaperCard"
      ? <EditOutlined style={{ fontSize: 22 }} />
      : <ContactsOutlined style={{ fontSize: 22 }} />
  );

  const renderExportCell = (params) => (
    <ExportOptions
      contactIds={[params.value]}
      onExportToCsv={()=>exportToCSV(params.value)}
      onExportToExcel={()=>exportToExcel(params.value)}
    />
  );

  const exportToCSV = (id)=>{

    const data = getData(id)
    const headers = ["name", "phone", "email", "address", "company", "website"];

    const filename = "buizcard-contacts";
    const csv = exportCSVFile(headers, data, filename);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'buizcard-contacts.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const renderActionsCell = (params) => {
    const contact = contacts.find((item) => item._id === params.value);
    return (
      <Stack direction={'row'} spacing={1}>
        <ContactOptions
          isEdit={contact.details !== null}
          isEmail={contact.email}
          onSend={()=>{sendMail(contact)}}
          onPreview={()=>previewContact(contact)}
          onEdit={() => editContact(params.value)}
          onDelete={() => deleteContact(params.value)}
          onSave={() => saveContact(params.value)}
          onAdd={() => addTag(params.value)}
        />
      </Stack>
    );
  };

  const getData =(id)=>{
    const filtered = id!=null
      ? [contactsData.find((contact) => contact._id == id)]
      : contactsData.filter((contact) => selectedContacts.includes(contact._id));

    return filtered.map((d)=>{
      const card = d.card;
      return {
        name: d.name,
        phone: d.phoneNumber,
        email: d.email,
        address: card!=null ? `${card.address?.addressLine1}, ${card?.address?.city}, ${card?.address?.state}, ${card?.address?.country} - ${card?.address?.pincode}`: '',
        company: card!=null ? `${card.company?.title}` : '',
        website: card!=null ? `${card.company?.companyWebsite}` : ''
      }
    })
  }

  const exportToExcel = (id) => {
    const data = getData(id)
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Contacts');
    XLSX.writeFile(wb, 'buizcard-contacts.xlsx');
  };

  const columns = [
    { field: 'picture', headerName: 'Profile', width: 80, renderCell: renderProfileCell },
    { field: 'contact', headerName: 'Contact', flex: 1, renderCell: renderContactCell },
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 1, renderCell: renderPhoneNumberCell },
    { field: 'tags', headerName: 'Tag', flex: 1, renderCell: renderTagCell },
    { field: 'type', headerName: 'Type', width: 120, renderCell: renderTypeCell },
    { field: 'connectedAt', headerName: 'Date', width: 130 },
    { field: '_id', headerName: 'Export', width: 60, renderCell: renderExportCell },
    { field: 'id', headerName: '', width: 30, renderCell: renderActionsCell }
  ];

  const rows = contacts.map((contact) => ({
    id: contact._id,
    _id: contact._id,
    contact: { fullName: contact.name, email: contact.email },
    picture: contact.picture,
    tags: contact.tags,
    type: contact.type,
    phoneNumber: contact.phoneNumber,
    connectedAt: formatDate(contact.connectedAt)
  }));

  const refresh = async () => {
    setLoading(true);
    const contacts = await getMyContacts();
    dispatch(updateContacts(contacts));
    setLoading(false);
  };

  const updateTags = async (updated) => {
    setOpenTag(false);
    const updatedContacts = data.map((contact) => (contact._id === updated._id ? updated : contact));
    dispatch(updateContacts(updatedContacts));
  };

  const openCreateContact = () => {
    navigate('/dashboard/contacts/create');
  };

  return (
    <>
    <SendMailDialog open={openMail} onClose={()=>setOpenMail(false)} selectedMails={selectedMail}/>
    <Grid container rowSpacing={2.5} columnSpacing={2.75}>
      <AddTagDialog open={openTag} contact={selected} handleCancel={() => setOpenTag(false)} onAdded={(updated) => updateTags(updated)} />
      <Grid item xs={8} sx={{ mb: 0 }}>
        <Typography variant="h4">My Contacts</Typography>
      </Grid>
      <Grid item xs={12} display={'flex'}>
        <MainCard sx={{ width: '100%' }}>
          {loading  ? (
            <SkeletonTable />
          ) : (
            <>
              <Stack direction={'row'} spacing={2} sx={{ mb: 3 }}>
                <Box sx={{ width: '100%' }}>
                  <FormControl sx={{ width: { xs: '100%', md: 300 } }}>
                    <OutlinedInput
                      id="header-search"
                      startAdornment={
                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                          <SearchOutlined />
                        </InputAdornment>
                      }
                      onChange={handleSearch}
                      placeholder="Search by name, email or phone number"
                      aria-describedby="header-search-text"
                      inputProps={{
                        'aria-label': 'weight'
                      }}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    size="medium"
                    sx={{ px: 0, width: '140px' }}
                    onClick={openCreateContact}
                    startIcon={<PlusOutlined style={{ fontSize: '16px' }} />}
                  >
                    Add Leads
                  </Button>
                </Box>
                <ExportOptions 
                  contactIds={selectedContacts} 
                  style={{ border: `1px solid ${theme.palette.grey[300]}`, borderRadius: '4px', p: 1 }}
                  disabled={selectedContacts && selectedContacts.length<=0}
                />
                <IconButton onClick={refresh}>
                  <Box sx={{ border: `1px solid ${theme.palette.grey[300]}`, borderRadius: '4px', p: 1 }}>
                    <ReloadOutlined />
                  </Box>
                </IconButton>
              </Stack>
              <StripedDataGrid
                rows={rows}
                columns={columns}
                getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
                sx={{
                  '& .MuiDataGrid-columnHeader': { fontSize: '15px', fontWeight: '900' },
                  '& .MuiDataGrid-cell': { fontSize: '14px' },
                  border: 1,
                  borderColor: `${theme.palette.grey[200]}`
                }}
                initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(selected) => {
                  setSelectedContacts(selected);
                }}
                rowSelectionModel={selectedContacts}
              />
            </>
          )}
        </MainCard>
      </Grid>
    </Grid>
    </>
  );
};

export default ContactList;

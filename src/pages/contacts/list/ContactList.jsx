import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { Avatar, Box, Button, Chip, FormControl, Grid, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import { HiMiniLockClosed, HiUser } from 'react-icons/hi2';
import { ContactsOutlined, EditOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import MainCard from '../../../components/MainCard';
import ContactOptions from '../../../components/menu/ContactOptions';
import SkeletonTable from '../../../components/skeleton/SkeletonTable';
import AddTagDialog from '../../../components/dialogs/AddTagDialog';
import { useNavigate } from 'react-router-dom';
import { downloadFile, formatDate, generateUniqueName, generateVcard } from '../../../utils/utils';
import { removeContact } from '../../../network/service/connectService';
import { updateContacts } from '../../../store/reducers/app';
import ExportOptions from '../../../components/Contact/ExportOptions';
import SendMailDialog from '../../../components/dialogs/SendMailDialog';
import { exportCSVFile } from 'json2csv-converter';
import * as XLSX from 'xlsx';
import { StripedDataGrid } from '../../../components/@extended/StripedDataGrid';
import { getContacts } from '../../../network/service/contactService';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";


const ContactList = () => {
  const featureCount = useSelector((state) => state.app.featureCount);
  
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(0);
  const [total, setTotal] = useState(0);

  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openTag, setOpenTag] = useState(false);
  const [openMail, setOpenMail] = useState(false);
  const [selectedMail, setSelectedMail] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(featureCount>0);
  const [selected, setSelected] = useState(null);
  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (page !== -1 || refresh) {
          setRefresh(false);
          const data = await getContacts({ page: refresh ? 1: page+1 , query });

          const updatedContacts = data.contacts?.map((contact) => {
            const updatedContact = { ...contact };
            const { details, card } = contact;
            const contactInfo = details ?? card;
            updatedContact.picture = contactInfo?.picture;
            updatedContact.name =
              details != null
                ? `${contactInfo.firstName} ${contactInfo.lastName}`
                : `${contactInfo?.name?.firstName ?? ''} ${contactInfo?.name?.middleName ?? ''} ${contactInfo?.name?.lastName ?? ''}`;
            updatedContact.phoneNumber = details != null ? contactInfo?.phone : contactInfo?.phoneNumber ?? '';
            updatedContact.email = contactInfo?.email ?? '';
            updatedContact.message = contactInfo?.message ?? '';
            updatedContact.cardName = card?.cardName ?? '';
            return updatedContact;
          });

          setContacts(updatedContacts);
          setTotal(data.count);

          const s = page * 10 + 1;
          const isNextEnable = s + 9 <= data.count;
          setStart(s);
          setEnd(isNextEnable ? s + 9 : data.count);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchContacts();
  }, [page, refresh, query]);

  const onMoveNext = () => {
    if (start + 9 < total) {
      setPage(page + 1);
    }
  };

  const onMovePrev = () => {
    if (page >= 1) {
      setPage(page - 1);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setQuery(query);
  };

  const deleteContact = async (contactId) => { 
    const newe = contacts.filter((contact) => contact._id !== contactId); 
    setContacts(newe);
    dispatch(updateContacts([...newe]));
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
      <Typography variant="caption" sx={{color: 'grey'}}>{params.value?.email}</Typography>
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
    const headers = ["name", "phone", "email", "address", "company", "title", "website"];

    const filename = generateUniqueName("buizcard-contacts");
    const csv = exportCSVFile(headers, data, filename);
    // const blob = new Blob([csv], { type: 'text/csv' });
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'buizcard-contacts.csv';
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
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
      ? [contacts.find((contact) => contact._id == id)]
      : contacts.filter((contact) => selectedContacts.includes(contact._id));

    return filtered.map((d)=>{
      const card = d.card;
      const details = d.details;
      return {
        name: card?.name ? `${card.name?.firstName??''} ${card.name?.lastName??''}` : details?.name,
        phone: card?.phoneNumber || details?.phone,
        email: card?.email || details?.email,
        address: card!=null ? `${card.address?.addressLine1}, ${card?.address?.city}, ${card?.address?.state}, ${card?.address?.country} - ${card?.address?.pincode}`: details?.location,
        company: card!=null ? `${card.company?.companyName}` : details?.company,
        title: card!=null ? `${card.company?.title}` : details?.title,
        website: card!=null ? `${card.company?.companyWebsite}` : details?.website
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
                  onExportToCsv={()=>exportToCSV()}
                  onExportToExcel={()=>exportToExcel()}
                />
                <IconButton onClick={()=>setRefresh(true)}>
                  <Box sx={{ border: `1px solid ${theme.palette.grey[300]}`, borderRadius: '4px', p: 1 }}>
                    <ReloadOutlined />
                  </Box>
                </IconButton>
              </Stack>
              { showUpgrade &&  <Box sx={{ width: '100%', background: `${theme.palette.grey[100]}`, p: 1.4, mb: 1, borderRadius: '2px'}}>
                  <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={2}>
                    <HiMiniLockClosed/>
                    <Typography variant='subtitle1' color={"green"}>{`${featureCount} lead is looking for you! Upgrade to connect with them!`}</Typography>
                  </Stack>
                </Box> }
              <Box sx={{ position: "relative" }}>
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
                  initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
                  pageSize={10}
                  pageSizeOptions={[10]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  onRowSelectionModelChange={(selected) => {
                    setSelectedContacts(selected);
                  }}
                  rowSelectionModel={selectedContacts}
                />
                <Box
                  sx={{
                    background: "white",
                    position: "absolute",
                    bottom: 0,
                    height: 60,
                    width: "100%",
                    border: 1,
                    borderColor: `${theme.palette.grey[200]}`,
                    display: "flex",
                    justifyContent: "end",
                    px: "20px"
                  }}
                >
                  <Stack direction={"row"} alignItems={"center"}>
                    <IconButton onClick={onMovePrev}>
                      <MdOutlineKeyboardArrowLeft />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>
                      {`${start} - ${end} of ${total}`}
                    </Typography>
                    <IconButton onClick={onMoveNext}>
                      <MdOutlineKeyboardArrowRight />
                    </IconButton>
                  </Stack>
                </Box>
              </Box>
            </>
          )}
        </MainCard>
      </Grid>
    </Grid>
    </>
  );
};

export default ContactList;

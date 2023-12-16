import { Avatar, Grid, IconButton, Stack, Typography } from "@mui/material";
import DataTable from "../../../components/DataTable";
import MainCard from "../../../components/MainCard";
import { DataGrid } from "@mui/x-data-grid";
import { formatDate } from "../../../utils/utils";
import { CARD_IMAGE_PATH } from "../../../utils/global";
import { HiUser } from 'react-icons/hi2';
import { FaEdit, FaEllipsisV, FaSave, FaTrash } from 'react-icons/fa';

const ContactList=()=>{

    const contacts = [
        {
            _id: "1",
            name: "Dhana Sekaran",
            picture: "",
            email: "1dhana625@gmail.com",
            phoneNumber: "+918056384773",
            type: "contact",
            connectedAt: "",
            connectedWith: "",
            tags: []
        },
        {
            _id: "2",
            name: "Jhon Jacob",
            picture: "",
            email: "jhonjacob@gmail.com",
            phoneNumber: "+918057874773",
            type: "contact",
            connectedAt: "",
            connectedWith: "",
            tags: []
        },
        {
            _id: "3",
            name: "Michel Jackson",
            picture: "",
            email: "micheljackson@gmail.com",
            phoneNumber: "+919997874773",
            type: "contact",
            connectedAt: "",
            connectedWith: "",
            tags: []
        }
    ]

    const columns = [

        { 
          field: '_id', 
          headerName: 'Profile',  
          width: 80,
          renderCell: (params) => {
            console.log(params);
            return (
              <>
                <Avatar src={`${CARD_IMAGE_PATH}${params.value}%2Fprofile.jpg?alt=media`}><HiUser /> </Avatar>
              </>
            );
          } 
        },
        { 
          field: 'contact', 
          headerName: 'Contact', 
          flex: 1,
          renderCell: (params) => {
            console.log(params);
            return (
              <Stack>
                <Typography variant="title">{params.value?.fullName}</Typography>
                <Typography variant="labelLight">{params.value?.email}</Typography>
              </Stack>
            );
          } 
        },
        { 
          field: 'phoneNumber', 
          headerName: 'PhoneNumber', 
          flex: 1,
        },
        { 
          field: 'tags', 
          headerName: 'Tag', 
          flex: 1,
        },
        { 
          field: 'type', 
          headerName: 'Type', 
          flex: 1,
        },
        { 
          field: 'connectedAt', 
          headerName: 'Date', 
          width: 120
        },
        { 
          field: 'export', 
          headerName: 'Export', 
          width: 120
        },
        { 
          headerName: '', 
          width: 60,
          renderCell: (params) => {
            console.log(params);
            return (
              <Stack>
                <IconButton onClick={()=>{}} ><FaEllipsisV fontSize={16}/></IconButton>
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
              fullName: contact.fullName,
              email: contact.email
            },
            tags: contact.tags,
            type: contact.type,
            phoneNumber: contact.phoneNumber,
            connectedAt: formatDate(contact.connectedAt)
        }
    })

    return (
        <Grid container rowSpacing={2.5} columnSpacing={2.75}>

            <Grid item xs={8} sx={{ mb: 0 }}>
                <Typography variant="h4">My Contacts</Typography>
            </Grid>
            <Grid item xs={12} display={"flex"}>
                <MainCard sx={{width: "100%"}}>
                    {/* <DataTable contacts={[]}/> */}

                    <DataGrid               
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                            }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        onRowClick={(e)=>{}}
                    />
                </MainCard>
            </Grid> 

        </Grid>
    )
}

export default ContactList;
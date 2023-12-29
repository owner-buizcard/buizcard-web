import { Button, Divider, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material"
import MainCard from "../../../components/MainCard"
import { Formik } from "formik";
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { updateProfile } from "../../../network/service/userService";
import { useDispatch } from "react-redux";
import { updateAppUser } from "../../../store/reducers/app";

const PersonalInfoTab =()=>{

    const user = useSelector((state)=>state.app.user);
    const dispatch = useDispatch();

    return (
        <MainCard
            title={
                <Typography variant="subtitle1">Personal Information</Typography>
            }
            headerBorder
        >
            

        </MainCard>
    )
}

export default PersonalInfoTab;
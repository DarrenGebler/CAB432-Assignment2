import React, {useState} from 'react';
import AppSearchBar from "../components/AppSearchBar";
import {CircularProgress} from "@mui/material";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';


export default function Home() {
    const [uploadFile, setUploadFile] = useState(null);
    const [open, setOpen] = useState(false);


    const handleUpload = async (event) => {
        event.preventDefault();
        setOpen(true);
        const formData = new FormData();
        formData.append('file', uploadFile.files[0]);
        await axios({
            method: 'POST',
            url: '/video_data',
            timeout: 200000,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => {
            return response;
        }).then(error => {
            console.log(error);
        });
        await fetch("/video/" + uploadFile.files[0].name)
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = uploadFile.files[0].name;
                    a.click();
                })
            });
        setOpen(false);
    }

    return (
        <>
            <AppSearchBar/>
            <h1>Submit Video for Analysis</h1>
            <form onSubmit={handleUpload} method="post">
                <input type={"file"} ref={(ref) => {setUploadFile(ref);}} accept={"video/*"}/>
                <input type={"submit"}/>
            </form>
            <Backdrop open={open} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color={"inherit"}/>
            </Backdrop>
        </>
    )
}
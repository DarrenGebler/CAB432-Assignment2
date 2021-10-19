import React, {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useHistory} from "react-router-dom";

export default function AppSearchBar() {
    const [hashTagSearch, setHashTagSearch] = useState("");
    const history = useHistory();

    const searchChange = (event) => {
        setHashTagSearch(event.target.value);
    }

    const search = () => {
        history.push("/search/" + hashTagSearch);
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position={"static"}>
                <Toolbar>
                    <Typography
                        variant={"h6"}
                        noWrap
                        component={"div"}
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Social Distancing Analyser
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
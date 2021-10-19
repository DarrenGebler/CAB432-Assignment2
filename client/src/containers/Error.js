import React from 'react';
import {Link} from 'react-router-dom';
import AppSearchBar from "../components/AppSearchBar";

export default function Error() {

    return (
        <>
            <AppSearchBar/>
            <Link to={"/"}>
                Go Home
            </Link>
        </>
    )
}
import React, {useEffect, useState} from 'react'
import {
    redirect,
    useNavigate,

} from 'react-router-dom';
import {

    Box,
    Container, createTheme,

} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import AsyncSelect from 'react-select/async';
import {logDOM} from "@testing-library/react";
import PoemList2 from '../../components/PoemList'
import { useAuth } from "../../hooks/useAuth";

let parentId;

const loadOptions = (inputValue, callback) => {
    console.log("loading children dropping bar")
    const params = {
        parentId: parentId,
    };
    // perform a request
    const requestResults =  axios.get("http://localhost:8888/getChildrenByParentId", { params })
        .then((response) => {
            const options = []
            response.data.forEach((child) => {
                options.push({
                    label: child.childName,
                    value: child.childId
                })
            })
            callback(options);
        })
}

export default function PoemList() {

    const navigate = useNavigate();
    const { user,setUser } = useAuth();
    parentId=user["userId"];
    console.log("parentId",parentId)

    const [selectedOption, setSelectedOption]=useState(null);
    const [childId, setChildId]=useState(0);
    return (


            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                    }}
                >
                    <AsyncSelect cacheOptions
                                 value={selectedOption}
                                 onChange={newValue => {
                                     setSelectedOption(newValue)
                                     setChildId(newValue.value)
                                 }}
                                 loadOptions={loadOptions} defaultOptions />
                    <PoemList2  childId={childId}/>

                </Box>

            </Container>
    );

}
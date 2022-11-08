import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState,useEffect} from "react";
import axios from "axios";

export default function BasicSelect() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };



    useEffect(() => {
        const params = {
            parentId: 84,
        };
        const getCategorias = async () => {
            const res = await axios.get("http://localhost:8888/getChildrenByParentId", {params})
                .then((response) => {
                    const options = []
                    response.data.forEach((child) => {
                        options.push(child)
                    })
                    setCategorias(options);


                })
            //console.log(res);
        };
        getCategorias();
    }, []);

    //todo 获取值？
    const [categorias, setCategorias] = useState([]);

    return (

                <Select
                    sx={{ backgroundColor: "white",minWidth: 120 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                >
                    {categorias.map((categoria) => (
                        <MenuItem key={categoria.childId} value={categoria.childId}>{categoria.childName}</MenuItem>
                    ))}

                </Select>

    );
}

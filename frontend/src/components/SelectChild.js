import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import {useAuth} from "../hooks/useAuth";



export default function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const { user,setUser } = useAuth();

    React.useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
        const params = {
            parentId: user["userId"],
        };

        (async () => {
            await axios.get("http://localhost:8888/getChildrenByParentId", {params})
                .then((response) => {
                    const options = []
                    response.data.forEach((child) => {
                        options.push(child)
                    })
                    if (active) {
                        setOptions(options);
                    }
                })
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            sx={{ backgroundColor:'white' }}
            id="asynchronous-demo"
            // sx={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            // isOptionEqualToValue={(option, value) => option.childName === value.childName}
            getOptionLabel={(option) => option.childName}
            onChange={(e, value) => console.log(value.childId)}

            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    // label="choose a kid"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}



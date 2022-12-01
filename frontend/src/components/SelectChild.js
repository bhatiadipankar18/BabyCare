import * as React from 'react';
import {default as ReactSelect} from 'react-select';

import {useState, useEffect} from "react";
import axios from "axios";
import {useAuth} from "../hooks/useAuth";
import {request} from "../request";

export default function BasicSelect() {
    const {user, setUser, child, setChild} = useAuth();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };


    const params = {
        parentId: user["userId"],
    };

    const [menu, setMenu] = useState([]);
    const getMenusFromParentChild =
        () => {
            request({
                url: '/getChildrenByParentId',
                method: 'GET',
                params: params
            }).then((response) => {
                const options = []
                response.data.forEach((eachChild) => {
                    options.push({"value": eachChild.id, "label": eachChild.childName})
                })
                setMenu(options);
            }).catch(error => {
                console.log("error",error)
            })
        };

    const getMenusFromNannyChild =
        () => {
            request({
                url: '/getChildrenByNannyId',
                method: 'GET',
                params: params
            }).then((response) => {
                const options = []
                response.data.forEach((eachChild) => {
                    options.push({"value": eachChild.id, "label": eachChild.childName})
                })
                setMenu(options);
            })
        };



    useEffect(() => {
        //todo fetch children from diffrent method
        const userRole = user["userRole"]
        // console.log(userRole);


        if (userRole === 1) {
            getMenusFromParentChild()
        } else {
            getMenusFromNannyChild()
        }

        ;
    }, []);


    return (
        <>
            <ReactSelect
                defaultValue={child}
                options={menu}
                onChange={(option) => {
                    setChild(option)
                }}
                menuPortalTarget={document.body}
                isSearchable={false}
            />


        </>

    );
}

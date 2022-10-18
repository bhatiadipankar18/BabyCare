import React, { useEffect, useState } from 'react'
import { Table, Button, Avatar, Popconfirm, Modal, Select } from "antd";
import axios from "axios";
import "./feeding-list.css";
//import FeedingForm from '../FeedingForm';
import { Link } from 'react-router-dom';

const {Option} = Select;

export default function HistoryList(props) {
    //debugger;

    // define dataSource && some states
    const [dataSource, setDataSource] = useState([]);
    const [updVal, setUpdVal] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isUpdModalVisible, setIsUpdModalVisible] = useState(false);
    const [searchText, setSearchText] = useState(undefined);
    const [searchData, setSearchData] = useState([]);

    // utils
    const delFromArrayByItemElm = (arr, id) => {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].id === id) return i;
        }
    }

    /**
     * 
     * @param {Array} arr 
     * @param {Object} item 
     * @returns 
     */
    const updArrayByItem = (arr, item) => {
        let newArr = arr.map((arrItem) => {
            if(arrItem.id === item.id) { return item; }
            else { return arrItem; }
        });
        return newArr;
    }

    /**
     * Query by name
     * @param {string} key 
     * @param {Array} arr
     */
    const fuzzyQuery = (arr, key) => {
        let fuzzyArr = [];
        arr.forEach(element => {
            if(element.name.indexOf(key) >= 0) {
                fuzzyArr.push(element);
            }
        });
        return fuzzyArr;
    }
    const onClickSearchItem = value => {
        let path = "/profile/" + value;
        props.history.push(path);
        setSearchData([]);
    }
    /**
     * 
     * @param {Array} arr the arr need to be updated
     * @param {Object} item the item needed to be updated
     * @returns {Array} newArr the array has been updated
     */ 
     function formatDate(dateVal) {
        var newDate = new Date(dateVal);
    
        var sMonth = padValue(newDate.getMonth() + 1);
        var sDay = padValue(newDate.getDate());
        var sYear = newDate.getFullYear();
        var sHour = newDate.getHours();
        var sMinute = padValue(newDate.getMinutes());
        var sAMPM = "AM";
    
        var iHourCheck = parseInt(sHour);
    
        if (iHourCheck > 12) {
            sAMPM = "PM";
            sHour = iHourCheck - 12;
        }
        else if (iHourCheck === 0) {
            sHour = "12";
        }
    
        sHour = padValue(sHour);
    
        return sMonth + "-" + sDay + "-" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
    }
    
    function padValue(value) {
        return (value < 10) ? "0" + value : value;
    }
    // index data
    useEffect(() => {
        axios.get("http://localhost:8888/history/findAll")
             .then((rsp) => {
                var data = [];
                for(var i=0;i<rsp.data.length;i++){
                    var d = new Date(rsp.data[i].updated_on);
                    console.log(formatDate(d));
                    rsp.data[i].updated_on = formatDate(d);
                    data.push(rsp.data[i]);
                }
                 setDataSource(data);
             })
             .catch((error) => {
                 console.log(error)
             })
    }, []);

    
    // table header
    const columns = [
        // {
        //     title: 'Avatar',
        //     dataIndex: 'avatar',
        //     key: 'avatar',
        //     render: (_,index) => {
        //         return(
        //             <Link to={`/profile/${index.id}`}>
        //                 <Avatar src={ index.avatar } />
        //             </Link>
        //         ) 
        //     }
        // },
        {
            title: 'Updated on',
            dataIndex: 'updated_on',
            key: 'updated_on',
            type: 'date',
            dateSetting: {
                format: 'dd/MM/yyyy'
              },

        },
        {
            title: 'Updated by',
            dataIndex: 'updated_by',
            key: 'updated_by',
        },        
        {
            title: 'age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'milk',
            dataIndex: 'milk',
            key: 'milk',
        },   
        {
            title: 'food',
            dataIndex: 'food',
            key: 'food',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            key: 'operation',
        },
        
    ]

    return (
        <div className="teacher-list">
            <Table
                columns={columns}
                rowKey={(record) => {
                    return record.id
                }}
                dataSource={dataSource}
                scroll={{ y: "470px" }}

            />
        </div>
    )
}

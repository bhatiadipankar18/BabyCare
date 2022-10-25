import React, { useEffect, useState } from 'react'
import { Table, Button, Avatar, Popconfirm, Modal, Select } from "antd";
import axios from "axios";
import "./feeding-list.css";
import FeedingForm from '../FeedingForm';
import { Link } from 'react-router-dom';

const {Option} = Select;

export default function FeedingList(props) {
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

    /**
     *
     * @param {Array} arr the arr need to be updated
     * @param {Object} item the item needed to be updated
     * @returns {Array} newArr the array has been updated
     */

    // index data
    useEffect(() => {
        axios.get("http://localhost:8888/feeding/findAll")
             .then((rsp) => {
                 setDataSource(rsp.data);
             })
             .catch((error) => {
                 console.log(error)
             })
    }, []);

    // CRUD -> D
    const handleDelete = (index) => {
        axios.delete('http://localhost:8888/feeding/deleteById/' + index.id)
             .then((rsp) => {
                 let tmpData = [...dataSource];
                 let i = delFromArrayByItemElm(tmpData ,index.id);
                 tmpData.splice(i, 1);
                //  console.log(tmpData)
                 setDataSource(tmpData)
             })
             .catch((error) => {
                 console.log(error)
             })
    }

    // CRUD -> C
    const handleAdd = (value) => {
        axios.post('http://localhost:8888/feeding/add/', value)
             .then((rsp) => {
                let tmpData = [...dataSource];
                tmpData.push(rsp.data);
                console.log(rsp.data);
                setDataSource(tmpData);
             })
             .catch((error) => {
                console.log(error)
             })
    }

    // CRUD -> U
    const handleUpd = (value) => {
        axios.put('http://localhost:8888/feeding/update/', value)
             .then((rsp) => {
                 // replace  item in old dataSource
                 let tmpData = updArrayByItem([...dataSource], value);
                 setDataSource(tmpData);
             })
             .catch((error) => {
                 console.log(error)
             })
    }

    const onUpdClick = index => {
        // handle data format
        // index.department = [index.department]
        // index.joinDate = moment(index.joinDate, 'YYYY/MM')
        // index.gender = [index.gender];
        let data = index;
        // console.log("index data: ",index);
        setIsUpdModalVisible(true);
        setUpdVal(data);
    }

    // CRUD -> R
    const onSearch = value => {
        if(value) {
            setSearchText(value);
            let tmpData = fuzzyQuery(dataSource, value);
            setSearchData(tmpData);
        }
    }

    const onClickSearchItem = value => {
        let path = "/profile/" + value;
        props.history.push(path);
        setSearchData([]);
    }

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
            title: 'Operation',
            dataIndex: 'operation',
            key: 'operation',
            render: (_,index) =>
                dataSource.length >= 1 ? (
                    <div className="del-update-container">
                        <Button size="small" type="primary" onClick={() => onUpdClick(index)}>Update</Button>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(index)}>
                            <Button style={{ marginLeft: 5 }} size="small" danger type="primary">Delete</Button>
                        </Popconfirm>
                    </div>
                ) : null
        }
    ]

    const onAddSubmit = () => {
        setIsAddModalVisible(false)
    }

    const onUpdSubmit = () => {
        setIsUpdModalVisible(false)
    }

    return (
        <div className="teacher-list">
            <div className="add-search-container">
                <Button
                    type="primary"
                    onClick={() => setIsAddModalVisible(true)}
                    >
                    Add a row
                </Button>
                <Select
                    style={{ width: 200 }}
                    placeholder="input search text"
                    showSearch
                    showArrow={false}
                    filterOption={false}
                    notFoundContent="nothing~🙄"
                    value = {searchText}
                    onSearch={onSearch}
                    onChange={onClickSearchItem}
                >
                    { searchData.map(d => (
                        <Option key={d.id}>{d.name}</Option>
                    ))
                    }
                </Select>
            </div>

            <Modal
                style={{ display: "flex", justifyContent: "center" }}
                destroyOnClose={true}
                title="Add a feeding"
                visible={isAddModalVisible}
                footer={[]}
                onCancel={() => setIsAddModalVisible(false)}
            >
                <FeedingForm  handleAdd={handleAdd} onAddSubmit={onAddSubmit} />
            </Modal>

            <Modal
                style={{ display: "flex", justifyContent: "center" }}
                destroyOnClose={true}
                title="Update a feeding"
                visible={isUpdModalVisible}
                footer={[]}
                onCancel={() => setIsUpdModalVisible(false)}
            >
                <FeedingForm handleUpd={handleUpd} values={updVal} onUpdSubmit={onUpdSubmit} />
            </Modal>

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

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
import {useAuth} from "../hooks/useAuth";
import {Button, Col, Form, Input, Modal, Popconfirm, Row, Select, Table} from "antd";
import {Link} from 'react-router-dom';
import {useParams} from "react-router-dom";
import { Layout } from "antd";
const {  Content } = Layout;

let parentId;

const {Option} = Select;
const FormItem = Form.Item;

function VaccineForm(props) {

    const onFinish = (values) => {

        // no props.value => add
        let data = values;
        if (!props.values) {
            data["childId"] = props.childId;

            props.handleAdd(data);
            props.onAddSubmit();
        } else {
            //  => update
            data["id"] = props.values.id;
            data["childId"] = props.values.childId;
            props.handleUpd(values);
            props.onUpdSubmit();
        }
    }

    const layout = {
        labelCol: {span: 10},
        wrapperCol: {span: 18},
    };

    const gutter = {
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
    }

    return (
        <div>
            <Form
                {...layout}
                initialValues={props.values}
                style={{width: 650}}
                onFinish={onFinish}>


                <Row gutter={gutter}>
                    <Col span={16}>
                        <FormItem
                            className="vaccine_name"
                            label="vaccine_name"
                            name="vaccine_name"
                            rules={[
                                {
                                    required: true,
                                    message: "please enter Vaccine Name ",
                                }
                            ]}
                        >
                            <Input placeholder="Vaccine Name" allowClear/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={gutter}>
                    <Col span={16}>
                        <FormItem
                            className="vaccine_date"
                            label="Vaccine Date"
                            name="vaccine_date"
                            rules={[
                                {
                                    required: true,
                                    message: "please enter vaccine details ",
                                }
                            ]}
                        >
                            <Input placeholder="Vaccine Date" allowClear/>
                        </FormItem>
                    </Col>
                </Row>

                <FormItem>
                    <Button style={{width: "650px"}} htmlType="submit" type="primary">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        </div>
    )
}

function VaccineTable(props) {

    // define dataSource && some states
    const [dataSource, setDataSource] = useState([]);
    const [updVal, setUpdVal] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isUpdModalVisible, setIsUpdModalVisible] = useState(false);
    const [searchText, setSearchText] = useState(undefined);
    const [searchData, setSearchData] = useState([]);
    const { user } = useAuth();

    // utils
    const delFromArrayByItemElm = (arr, id) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) return i;
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
            if (arrItem.id === item.id) {
                return item;
            } else {
                return arrItem;
            }
        });
        return newArr;
    }


    /**
     *
     * @param {Array} arr the arr need to be updated
     * @param {Object} item the item needed to be updated
     * @returns {Array} newArr the array has been updated
     */


    // index data
    useEffect(() => {
        const params = {
            childId: props.childId,
        };
        axios.get("http://localhost:8888/vaccineList/findByChildId", {params})
            .then((rsp) => {
                setDataSource(rsp.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [props.childId]);

    // CRUD -> D
    const handleDelete = (index) => {
        axios.delete('http://localhost:8888/vaccineList/deleteById/' + index.id)
            .then((rsp) => {
                let tmpData = [...dataSource];
                let i = delFromArrayByItemElm(tmpData, index.id);
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
        axios.post('http://localhost:8888/vaccineList/add/', value)
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
        axios.put('http://localhost:8888/vaccineList/update/', value)
            .then((rsp) => {
                // replace  item in old dataSource
                let tmpData = updArrayByItem([...dataSource], value);
                setDataSource(tmpData);
                let historyObj = {
                    'historydata':JSON.stringify(value),
                    'operation': 'update',
                    'object_type':'vaccine',
                    'updated_by': JSON.parse(localStorage.getItem('user')).userId
                   
                };
                createHistory(historyObj);
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const createHistory = (value) => {
        axios.post('http://localhost:8888/vaccineList/add/', value)
            .then((rsp) => {
                console.log('history created'+rsp);
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const onUpdClick = index => {
        let data = index;
        setIsUpdModalVisible(true);
        setUpdVal(data);
    }

    const columns = [

        
        {
            title: 'Vaccine Name',
            dataIndex: 'vaccine_name',
            key: 'vaccine_name',
        },
        {
            title: 'Vaccine Date',
            dataIndex: 'vaccine_date',
            key: 'vaccine_date',
        },

        {
            title: 'Operation',
            dataIndex: 'operation',
            key: 'operation',
            render: (_, index) =>
                dataSource.length >= 1 ? (
                    <div className="del-update-container">
                        <Button size="small" type="primary" onClick={() => onUpdClick(index)}>Update</Button>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(index)}>
                            <Button style={{marginLeft: 5}} size="small" danger type="primary">Delete</Button>
                        </Popconfirm>
                    </div>
                ) : null
        }
    ]
    if(user["userRole"]===2){
        columns.pop()
    }

    const onAddSubmit = () => {
        setIsAddModalVisible(false)
    }

    const onUpdSubmit = () => {
        setIsUpdModalVisible(false)
    }

    return (
        <div className="teacher-list">


            {user["userRole"]===1&& (<div className="add-search-container">
                <Button
                    type="primary"
                    onClick={() => setIsAddModalVisible(true)}
                >
                    Add a row
                </Button>
            </div>)}

            <Modal
                style={{display: "flex", justifyContent: "center"}}
                destroyOnClose={true}
                title="Add a Vaccine"
                open={isAddModalVisible}
                footer={[]}
                onCancel={() => setIsAddModalVisible(false)}
            >
                <VaccineForm childId={props.childId} handleAdd={handleAdd} onAddSubmit={onAddSubmit}/>
            </Modal>

            <Modal
                style={{display: "flex", justifyContent: "center"}}
                destroyOnClose={true}
                title="Update a Vaccine"
                open={isUpdModalVisible}
                footer={[]}
                onCancel={() => setIsUpdModalVisible(false)}
            >
                <VaccineForm handleUpd={handleUpd} values={updVal} onUpdSubmit={onUpdSubmit}/>
            </Modal>

            <Table
                columns={columns}
                rowKey={(record) => {
                    return record.id
                }}
                dataSource={dataSource}
                scroll={{y: "470px"}}
            />
        </div>
    )
}


export default function VaccinePage() {

    const { child } = useAuth();

    if(child){
        return (
            <Layout style={{  backgroundColor: "white" }}>
                <Content style={{ alignSelf: "center" }}>
                    <VaccineTable childId={parseInt(child["value"])}/>
                </Content>
            </Layout>
        );
    }else{
        return(
            "choose your kid"
        )
    }


}
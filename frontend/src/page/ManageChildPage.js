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
import {Button, Col, Form, Input, Modal, Popconfirm, Row, Select, Table, Cascader} from "antd";
import ChatLayoutOuter from "../components/Chat";
import {Link} from 'react-router-dom';
import {useParams} from "react-router-dom";
import {Layout} from "antd";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {request} from "../request";

const {Content} = Layout;

let parentId;


const {Option} = Select;
const FormItem = Form.Item;

function ChildForm(props) {

    console.log("in to ChildForm", props);
    const onFinish = (values) => {

        //value is the data got from form
        //props is the data pass from components or got from table
        let data = values;
        // no props.value => add
        if (!props.values) {
            data["parentId"] = props.parentId;
            data["nannyId"] = data.nannyId[0];
            props.handleAdd(data);
            props.onAddSubmit();
        } else {
            //  => update
            data["id"] = props.values.id;
            data["parentId"] = props.values.parentId;
            data["nannyId"] = data.nannyId[0];
            props.handleUpd(values);
            props.onUpdSubmit();
        }
    }

    const layout = {
        labelCol: {span: 4},
        wrapperCol: {span: 18},
    };

    const gutter = {
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
    }
    const [menu, setMenu] = useState([]);
    const getNannyDropDown = async () => {
        const res = await axios.get("http://localhost:8888/user/findAllNanny")
            .then((response) => {
                const options = []
                response.data.forEach((eachNanny) => {
                    options.push({"value": eachNanny.id, "label": eachNanny.username})
                })
                console.log("options", options);
                //setMenu(options);
                setMenu(options)
            })
    };
    useEffect(() => {
        getNannyDropDown();
    }, []);


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
                            className="childName"
                            label="childName"
                            name="childName"
                            rules={[
                                {
                                    required: true,
                                    message: "please enter poemName ",
                                }
                            ]}
                        >
                            <Input placeholder="poemName" allowClear/>
                        </FormItem>
                    </Col>
                </Row>

                <Row gutter={gutter}>

                    <Col span={16}>
                        <FormItem
                            className="nannyId"
                            label="nannyName"
                            name="nannyId"
                            rules={[{required: true, message: 'Please choose your department!'}]}
                        >
                            <Cascader options={menu}/>
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

function ChildTable(props) {

    // define dataSource && some states
    const [dataSource, setDataSource] = useState([]);
    const [updVal, setUpdVal] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isUpdModalVisible, setIsUpdModalVisible] = useState(false);
    const [searchText, setSearchText] = useState(undefined);
    const [searchData, setSearchData] = useState([]);
    const {user} = useAuth();

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
            parentId: props.userId,
        };

        request({
            url: '/getChildrenByParentId',
            method: 'GET',
            params: params
        }).then((rsp) => {
            setDataSource(rsp.data);
        })




    }, []);

    // CRUD -> D
    const handleDelete = (index) => {
        axios.delete('http://localhost:8888/child/deleteById/' + index.id)
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
        axios.post('http://localhost:8888/child/add/', value)
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

        console.log("shangchuanzheg", value);
        // debugger
        axios.put('http://localhost:8888/child/update/', value)
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


    // table header
    const columns = [

        {
            title: 'childId',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'childName',
            dataIndex: 'childName',
            key: 'childName',
        },

        {
            title: 'nannyId',
            dataIndex: 'nannyId',
            key: 'nannyId',
        },

        {
            title: 'parentId',
            dataIndex: 'parentId',
            key: 'parentId',
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
    // nanny can not see operations
    if (user["userRole"] === 2) {
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


            {user["userRole"] === 1 && (<div className="add-search-container">
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
                title="Add a poemmmmmm"
                open={isAddModalVisible}
                footer={[]}
                onCancel={() => setIsAddModalVisible(false)}
            >
                <ChildForm parentId={props.userId} handleAdd={handleAdd} onAddSubmit={onAddSubmit}/>
            </Modal>

            <Modal
                style={{display: "flex", justifyContent: "center"}}
                destroyOnClose={true}
                title="Update a feeding"
                open={isUpdModalVisible}
                footer={[]}
                onCancel={() => setIsUpdModalVisible(false)}
            >
                <ChildForm handleUpd={handleUpd} values={updVal} onUpdSubmit={onUpdSubmit}/>
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





export default function ManageChildPage() {

    const {user,child} = useAuth();
    const userId = user["userId"]
    const username = user["username"]
    console.log(username,user);
    console.log('我可是父亲啊！')

    // const childId = child["value"]
    console.log(userId);
    console.log(child);



    return (
        <>
            <Layout style={{backgroundColor: "white"}}>
                <Content style={{alignSelf: "center"}}>
                    <ChildTable userId={userId}/>
                </Content>
            </Layout>
            {!!child && (
                <ChatLayoutOuter childId={child["value"]} username={username}/>
            )}

        </>
    );


}
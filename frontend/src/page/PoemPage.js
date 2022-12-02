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
import {Button, Col,Space, Form, Input, Modal, Popconfirm, Row, Select, Table} from "antd";
import {Link} from 'react-router-dom';
import {useParams} from "react-router-dom";
import { Layout } from "antd";
import UploadFilePage from "./UploadFiles"
import AudioPlayer from "react-h5-audio-player";

const {  Content } = Layout;

let parentId;




const {Option} = Select;
const FormItem = Form.Item;

function PoemForm(props) {


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
        labelCol: {span: 4},
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
                    <Col span={22}>
                        <FormItem
                            className="poemName"
                            label="poemName"
                            name="poemName"
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


                <FormItem>
                    <Button style={{width: "650px"}} htmlType="submit" type="primary">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        </div>
    )
}

function PoemTable(props) {

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
        axios.get("http://localhost:8888/poemList/findByChildId", {params})
            .then((rsp) => {
                setDataSource(rsp.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [props.childId]);

    // CRUD -> D
    const handleDelete = (index) => {
        axios.delete('http://localhost:8888/poemList/deleteById/' + index.id)
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
        axios.post('http://localhost:8888/poemList/add/', value)
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
        axios.put('http://localhost:8888/poemList/update/', value)
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
            title: 'poemId',
            dataIndex: 'id',
            key: 'id',
            hidden: true
        },
        {

            title: 'poemName',
            dataIndex: 'poemName',
            key: 'poemName',
            width: '15%',
        },



        {
            title: 'fileName',
            dataIndex: 'fileName',
            key: 'fileName',
            width: '50%',
            render: (_, index) =>{
                console.log(dataSource,index);
                console.log(dataSource["fileName"]);
                if(index.fileName!==null){
                    const musicSrc="http://localhost:8888/music/"+index["fileName"]
                    return  (


                            <AudioPlayer
                                autoPlay={true}
                                src={musicSrc}
                                onPlay={e => console.log("onPlay")}
                                // other props here
                            />
                    )
                }

            }

        },


        {
            width: '20%',
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
                    Add a poem
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
                <PoemForm childId={props.childId} handleAdd={handleAdd} onAddSubmit={onAddSubmit}/>
            </Modal>

            <Modal
                style={{display: "flex", justifyContent: "center"}}
                destroyOnClose={true}
                title="Update a feeding"
                open={isUpdModalVisible}
                footer={[]}
                onCancel={() => setIsUpdModalVisible(false)}
            >

                <UploadFilePage poemId={updVal["id"]}></UploadFilePage>
                {/*<PoemForm handleUpd={handleUpd} values={updVal} onUpdSubmit={onUpdSubmit}/>*/}
            </Modal>

            <Table
                columns={columns.filter(item => !item.hidden)}
                rowKey={(record) => {
                    return record.id
                }}
                dataSource={dataSource}
                scroll={{y: "470px"}}
            />
        </div>
    )
}


export default function PoemPage() {

    const { child } = useAuth();

    if(child){
        return (
            <Layout style={{  backgroundColor: "white" }}>
                <Content style={{ alignSelf: "center" }}>
                    <PoemTable childId={parseInt(child["value"])}/>
                </Content>
            </Layout>
        );
    }else{
        return(
            "choose your kid"
        )
    }


}
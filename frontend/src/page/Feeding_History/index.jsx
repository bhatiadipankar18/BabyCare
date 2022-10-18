import React from 'react'
import { Layout } from "antd";
import HistoryList from '../../components/HistoryList'
import "./main.css"

const { Footer, Content } = Layout;

export default function Main(props) {
    //debugger;
    return (
        <Layout style={{ height: "100vh", backgroundColor: "white" }}>
            <Content style={{ alignSelf: "center" }}>
                <HistoryList history={ props.history } />
            </Content>
        </Layout>
    )
}

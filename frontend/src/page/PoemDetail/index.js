import React from 'react'
import { Layout } from "antd";
import PoemList from '../../components/PoemList'
import "./main.css"

const { Footer, Content } = Layout;

export default function Main(props) {
    return (
        <Layout style={{ height: "100vh", backgroundColor: "white" }}>
            <Content style={{ alignSelf: "center" }}>
                <PoemList history={ props.history } />
            </Content>
        </Layout>
    )
}

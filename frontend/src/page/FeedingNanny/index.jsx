import React from 'react'
import { Layout } from "antd";
import FeedingNannyList from '../../components/FeedingNannyList'
import "./main.css"

const { Footer, Content } = Layout;

export default function Main(props) {
    return (
        <Layout style={{ height: "100vh", backgroundColor: "white" }}>
            <Content style={{ alignSelf: "center" }}>
                <FeedingNannyList history={ props.history } />
            </Content>
        </Layout>
    )
}

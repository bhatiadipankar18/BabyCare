import React from 'react'
import { Layout } from "antd";
import FeedingList from '../../components/FeedingList'

const { Footer, Content } = Layout;

export default function Main(props) {
    return (
        <Layout style={{  backgroundColor: "white" }}>
            <Content style={{ alignSelf: "center" }}>
                <FeedingList history={ props.history } />
            </Content>
        </Layout>
    )
}

import React from 'react'
import { Layout } from "antd";
import FeedingList from '../../components/FeedingList'
import "./main.css"

const { Footer, Content } = Layout;

export default function Main(props) {
    return (
        
        <Layout style={{ height: "100vh", backgroundColor: "white" }}>
            <Content style={{ alignSelf: "center" }}>
                <FeedingList history={ props.history }/>
            </Content>
            <img src="https://cdn.shopify.com/s/files/1/0107/8227/7732/files/1_6f8394a5-11b2-4d2f-b3e4-c961a306e829.png?v=1654524970"> 
            </img>
        </Layout>
    )
}

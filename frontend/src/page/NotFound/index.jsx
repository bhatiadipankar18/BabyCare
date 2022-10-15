import "./not-found.css"
import React from 'react'
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import "./not-found.css";

export default function NotFound() {
  return (
    <div className="not-found-page">
          <header class="header">
    <div class="left">
  
  <div>Baby Care</div>
    </div>
    <div class="center">
      <ul class="navbar">
        <li><a href="#" class="active">Home</a> </li>
        <li><a href="#">About baby care</a></li>
        <li><a href="#">History of baby</a></li>
        <li><a href="#">login</a></li>
      </ul>
    </div>
    <div class="right">
      <button class="btn"> Call us</button>
      <button class="btn">Email us</button>
    </div>
</header>
<div class="container">
  <h1>Join the Baby care</h1>
  
</div>
    </div>
)
}

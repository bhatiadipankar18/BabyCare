import React from 'react'
import { Form, Input, Cascader, Button, Col, Row, Switch, DatePicker, Rate, Slider, Checkbox } from "antd";
const FormItem = Form.Item;


export default function TeacherForm(props) {
    const onFinish = (values) => {
        // add
        let data = values;
        if(!props.values) {
            let avatar = "http://images.nowcoder.com/head/"+ Math.floor(Math.random() * 101) + "m.png";
            data["avatar"] = avatar;
            props.handleAdd(data);
            props.onAddSubmit();
        } else {
            // => update
            data["id"] = props.values.id;
            data["avatar"] = props.values.avatar;
            console.log(data);
            props.handleUpd(values);
            props.onUpdSubmit();
        }
    }

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
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
                style={{ width: 850 }} 
                onFinish={ onFinish }>
                    <Row gutter={gutter}>
                        <Col span={16}>
                            <FormItem
                                className="childname"
                                label="Child Name"
                                name="childname"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter name",
                                    }
                                ]}
                            >
                                <Input placeholder="Child name" allowClear />
                            </FormItem>
                        </Col>
                       
                    </Row>
                    
                    <Row gutter={gutter}>
                        <Col span={16}>
                            <FormItem
                                className="birthdate"
                                label="Birth Date"
                                name="birthdate"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter Birth Date.",
                                    }
                                ]}
                            >
                                <Input placeholder="Birth Date" allowClear />
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={gutter}>
                        <Col span={16}>
                            <FormItem
                                className="age"
                                label="Age"
                                name="age"
                                rules={[
                                    {
                                        // required: true,
                                        // message: "please enter age",
                                        
                                    }
                                ]}
                            >
                                <Input placeholder="age" allowClear />
                            </FormItem>
                        </Col>
                       
                    </Row>

                    <Row gutter={gutter}>
                        <Col span={16}>
                            <FormItem
                                className="height"
                                label="Height"
                                name="height"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter height in Cm.",
                                    }
                                ]}
                            >
                                <Input placeholder="height" allowClear />
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={gutter}>
                        <Col span={16}>
                            <FormItem
                                className="weight"
                                label="Weight"
                                name="weight"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter weight in Kg.",
                                    }
                                ]}
                            >
                                <Input placeholder="weight" allowClear />
                            </FormItem>
                        </Col>
                    </Row>
                    
                    <FormItem>
                        <Button style={{ width: "650px" }} htmlType="submit" type="primary">
                            Submit
                        </Button>
                    </FormItem> 
            </Form>
        </div>
    )
}

import React from 'react'
import { Form, Input, Cascader, Button, Col, Row, Switch, DatePicker, Rate, Slider, Checkbox } from "antd";
const FormItem = Form.Item;


export default function TeacherForm(props) {




    const onFinish = (values) => {
        // 如果没有表单数据传过来 => add
        let data = values;
        if(!props.values) {
            let avatar = "http://images.nowcoder.com/head/"+ Math.floor(Math.random() * 101) + "m.png";
            data["avatar"] = avatar;
            props.handleAdd(data);
            props.onAddSubmit();
        } else {
            // 有表单数据传来 => update
            // 将数据返回给父组件
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
                style={{ width: 650 }}
                onFinish={ onFinish }>




                    <Row gutter={gutter}>
                        <Col span={16}>
                            <FormItem
                                className="age"
                                label="age"
                                name="age"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter age",
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
                                className="milk"
                                label="milk"
                                name="milk"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter milk ",
                                    }
                                ]}
                            >
                                <Input placeholder="24-26 oz. daily 5-8 nursing sessions" allowClear />
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={gutter}>
                        <Col span={16}>
                            <FormItem
                                className="food"
                                label="food"
                                name="food"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter food ",
                                    }
                                ]}
                            >
                                <Input placeholder="food" allowClear />
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

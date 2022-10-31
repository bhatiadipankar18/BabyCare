import React from 'react'
import { Form, Input, Cascader, Button, Col, Row, Switch, DatePicker, Rate, Slider, Checkbox } from "antd";
const FormItem = Form.Item;


export default function TeacherForm(props) {




    const onFinish = (values) => {
        console.log(values)
        console.log(props)

        // no props.value => add
        let data = values;
        if(!props.values) {
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
                                <Input placeholder="poemName" allowClear />
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

import { Button, Form, Input } from "antd";

function ReportInfo() {
    return (
        <>
            <Form>
                <Form.Item label="Model Name" name="modelName">
                    <Input />
                </Form.Item>
                <Form.Item label="Issue Description" name="issueDescription">
                    <Input />
                </Form.Item>
            </Form>

            <Button type="primary" htmlType="submit">Submit</Button>
        </>
    )
}

export default ReportInfo
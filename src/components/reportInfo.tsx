import { useState } from "react";
import { Button, Form, Input, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";

function ReportInfo() {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (info: any) => {
        // Only keep the latest file
        const newFileList = info.fileList.slice(-1);
        setFileList(newFileList);
    };

    const handleSubmit = async (values: any) => {
        // Check if file is uploaded
        if (fileList.length === 0) {
            message.error("Please upload an image");
            return;
        }

        const file = fileList[0].originFileObj;
        if (!file) {
            message.error("Please select a valid image file");
            return;
        }

        setLoading(true);

        try {
            // Create FormData for multipart/form-data
            const formData = new FormData();
            formData.append("modelName", values.modelName);
            formData.append("expectedBehavior", values.expectedBehavior);
            formData.append("image", file);

            // Send POST request to backend
            const response = await fetch("http://localhost:3001/api/issues", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to submit issue");
            }

            await response.json();
            message.success("Issue reported successfully!");
            
            // Reset form
            form.resetFields();
            setFileList([]);
        } catch (error: any) {
            message.error(error.message || "Failed to submit issue. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form 
            form={form} 
            onFinish={handleSubmit}
            layout="vertical"
            style={{ maxWidth: 600 }}
        >
            <Form.Item 
                label="Model Name" 
                name="modelName"
                rules={[{ required: true, message: "Please select a model" }]}
            >
                <Select placeholder="Select a model">
                    <Select.Option value="GPT-4 (OpenAI)">GPT-4 (OpenAI)</Select.Option>
                    <Select.Option value="Claude (Anthropic)">Claude (Anthropic)</Select.Option>
                    <Select.Option value="Gemini (Google)">Gemini (Google)</Select.Option>
                    <Select.Option value="Llama (Meta)">Llama (Meta)</Select.Option>
                    <Select.Option value="Grok (xAI)">Grok (xAI)</Select.Option>
                    <Select.Option value="Mistral">Mistral</Select.Option>
                    <Select.Option value="DeepSeek">DeepSeek</Select.Option>
                </Select>
            </Form.Item>
            
            <Form.Item 
                label="Expected Behavior" 
                name="expectedBehavior"
                rules={[{ required: true, message: "Please describe the expected behavior" }]}
            >
                <Input.TextArea 
                    rows={4} 
                    placeholder="Describe what the model should have done..."
                />
            </Form.Item>
            
            <Form.Item 
                label="Issue Snapshot" 
                rules={[{ required: true, message: "Please upload an image" }]}
            >
                <Upload
                    beforeUpload={() => false} // Prevent auto-upload
                    fileList={fileList}
                    onChange={handleFileChange}
                    accept="image/*"
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined />}>Click to Upload Image</Button>
                </Upload>
            </Form.Item>
            
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                    Submit Issue
                </Button>
            </Form.Item>
        </Form>
    );
}

export default ReportInfo
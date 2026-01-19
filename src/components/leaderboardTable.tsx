import { Table } from "antd"
import { useState } from "react"
import { useEffect } from "react"


//mock data
const mockDataSource = [
    {
        key: '1',
        name: 'Grok',
        countIssueReported: 32,
    },
    {
        key: '2',
        name: 'Gemini',
        countIssueReported: 42,
    },
    {
        key: '3',
        name: 'Gemini3.2',
        countIssueReported: 222,
    },
    {
        key: '4',
        name: 'Deepspeek',
        countIssueReported: 1,
    },
];

function getRandomMockDataSource() {
    return mockDataSource.map((item) => ({
        ...item,
        countIssueReported: item.countIssueReported + Math.random() * 100,
    }));
}

const columns = [
    {
        title: 'ModelName',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'IssuesReported',
        dataIndex: 'countIssueReported',    
        key: 'countIssueReported',
        sorter: (a: any, b: any) => a.countIssueReported - b.countIssueReported,
        defaultSortOrder: 'ascend' as const,
    },
];

function LeaderboardTable() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setDataSource(mockDataSource as any);
            setLoading(false);
        }, 5000);
    }, []);

    return (
        <Table dataSource={dataSource} columns={columns} loading={loading} />
    )
}

export default LeaderboardTable
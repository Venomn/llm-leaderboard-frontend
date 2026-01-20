import { Table } from "antd"
import { useState } from "react"
import { useEffect } from "react"

const serverUrl = 'https://52.79.213.181:3000';

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

    async function getLeaderboardData() {
        setLoading(true);
        await fetch(`${serverUrl}/api/models`)
            .then(response => response.json())
            .then(data => {
                setDataSource(data);
            });
        setLoading(false);
    }

    useEffect(() => {
        getLeaderboardData();
    }, []);

    return (
        <Table dataSource={dataSource} columns={columns} loading={loading} />
    )
}

export default LeaderboardTable
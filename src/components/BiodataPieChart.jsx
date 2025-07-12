import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, Typography, Spin, Alert } from "antd";
import { FaVenus, FaMars, FaHeart, FaUsers } from "react-icons/fa";

const { Title, Text } = Typography;

const BiodataPieChart = () => {
  const [stats, setStats] = useState({
    total: 0,
    girls: 0,
    boys: 0,
    marriages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://matrimony-backend-p3ok.onrender.com/api/counter-stats");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setStats({
          total: data.totalBiodata || 0,
          girls: data.totalGirls || 0,
          boys: data.totalBoys || 0,
          marriages: data.totalMarriages || 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const COLORS = ["#FF69B4", "#0088FE", "#00C49F"];

  const pieData = [
    { name: "Female Profiles", value: stats.girls },
    { name: "Male Profiles", value: stats.boys },
    { name: "Successful Marriages", value: stats.marriages },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: "12px", fontWeight: "bold" }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-3 shadow-lg rounded border border-gray-200">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-sm">{payload[0].value} profiles</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card className="text-center p-6">
        <Spin size="large" />
        <Text className="block mt-4">Loading statistics...</Text>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="text-center p-6">
        <Alert
          message="Error Loading Data"
          description={error}
          type="error"
          showIcon
        />
      </Card>
    );
  }

  return (
    <Card
      className="w-full"
      title={
        <div className="flex items-center justify-center space-x-2">
          <FaUsers className="text-pink-500" />
          <Title level={4} className="m-0 text-pink-500">
            Matrimony Statistics
          </Title>
        </div>
      }
      hoverable
    >
      {/* Chart on Top */}
      <div className="w-full h-64 md:h-80 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              label={renderCustomizedLabel}
              labelLine={false}
              dataKey="value"
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Section Below */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-[#FF69B4] mb-1"></div>
          <Text strong>Female Profiles</Text>
          <Text className="text-pink-600">{stats.girls}</Text>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-[#0088FE] mb-1"></div>
          <Text strong>Male Profiles</Text>
          <Text className="text-blue-600">{stats.boys}</Text>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-[#00C49F] mb-1"></div>
          <Text strong>Successful Marriages</Text>
          <Text className="text-green-600">{stats.marriages}</Text>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-gray-400 mb-1"></div>
          <Text strong>Total Profiles</Text>
          <Text className="text-gray-800 font-bold">{stats.total}</Text>
        </div>
      </div>
    </Card>
  );
};

export default BiodataPieChart;

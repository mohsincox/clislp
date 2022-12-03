import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/plots";

const DemoColumn = () => {
  const data = [
    {
      tournament: "T1",
      user: 38,
    },
    {
      tournament: "T2",
      user: 52,
    },
    {
      tournament: "T3",
      user: 42,
    },
  ];
  const config = {
    data,
    xField: "tournament",
    yField: "user",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      tournament: {
        alias: "Tour",
      },
      sales: {
        alias: "User",
      },
    },
  };
  return <Column {...config} />;
};

export default DemoColumn;

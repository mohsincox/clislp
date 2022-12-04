import React, { useState } from "react";
import TimePicker from "react-time-picker";

export default function MyApp() {
  const [value, onChange] = useState("10:00");

  return (
    <div>
      <TimePicker onChange={onChange} value={value} />
    </div>
  );
}

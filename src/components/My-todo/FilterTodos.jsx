import { Input, SegmentedControl } from "@mantine/core";
import React, { useState } from "react";

const FilterTodos = () => {
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("high");
  return (
    <div className="flex gap-x-10">
      <div>
        <Input placeholder="Search Task..." />
      </div>
      <div>
        <SegmentedControl
          value={status}
          onChange={setStatus}
          data={[
            { label: "All", value: "all" },
            { label: "Active", value: "active" },
            { label: "Completed", value: "completed" },
          ]}
        />
      </div>
      <div>
        <SegmentedControl
          value={priority}
          onChange={setPriority}
          data={[
            { label: "High", value: "high" },
            { label: "Medium", value: "medium" },
            { label: "Low", value: "low" },
          ]}
        />
      </div>
    </div>
  );
};

export default FilterTodos;

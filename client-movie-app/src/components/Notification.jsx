import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

function Notification() {
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3456/api/notificsse");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("🚀 ~ file: Notification.jsx:8 ~ Notification ~ data:", data);
      toast.success("New movie added.");
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return <div>Notification</div>;
}

export default Notification;

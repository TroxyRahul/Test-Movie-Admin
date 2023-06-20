import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsBell } from "react-icons/bs";

function Notification() {
  const [notificationz, setNotificationz] = useState([]);
  console.log(
    "🚀 ~ file: Notification.jsx:7 ~ Notification ~ notificationCount:",
    notificationz
  );
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3456/api/notificsse");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("🚀 ~ file: Notification.jsx:8 ~ Notification ~ data:", data);
      toast.success("New movie added.");
      const cdata = notificationz;
      cdata.push(data);
      setNotificationz((prev) => [...prev, data]);
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <div className="dropdown dropdown-end">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <BsBell className="h-5 w-5" />
            <span className="badge badge-xs h-5 badge-primary indicator-item">
              {notificationz.length}
            </span>
          </div>
        </button>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10 flex flex-wrap flex-col max-h-60 overflow-y-hidden">
          {notificationz.map((item, index) => (
            <li key={index}>
              <a className="justify-between">
                item.message
                <span className="badge badge-secondary">New</span>
              </a>
            </li>
          ))}

          
        </ul>
      </div>
    </div>
  );
}

export default Notification;

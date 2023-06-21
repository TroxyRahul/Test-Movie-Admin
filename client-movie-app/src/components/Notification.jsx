import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsBell } from "react-icons/bs";
import CustomToast from "./CustomToast";
import { NOTIFICATION_API } from "../constants/const";

function Notification() {
  const [noti, setNoti] = useState([]);
  useEffect(() => {
    const eventSource = new EventSource(NOTIFICATION_API);
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNoti((prev) => [data, ...prev]);
      toast.custom((t) => (
        <CustomToast t={t} data={data} />
      ));
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
            <span className=" badge badge-xs h-5 badge-primary indicator-item">
              {noti.length}
            </span>
          </div>
        </button>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10 flex flex-wrap flex-col max-h-60 overflow-y-hidden">
          {noti.map((item, index) => (
            <li key={item.id}>
              <a className="justify-between">
                {item.name}
                <span className={item.type==1?"badge badge-primary":"badge badge-secondary"}>{item.type==1?'New':"Update"}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notification;

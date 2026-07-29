import { useEffect, useState } from "react";
import echo from "../echo";
import { useDeviceData } from "../hooks/useDeviceData";

interface DeviceData {
  [key: string]: unknown;
}

export default function DeviceMonitor() {
  const [deviceData, setDeviceData] = useState<DeviceData | null>(null);

  useEffect(() => {
    echo.connector.pusher.connection.bind(
      "state_change",
      (states: {
        previous: string;
        current: "connecting" | "connected" | "disconnected";
      }) => {
        console.log("WebSocket state:", states.previous, "->", states.current);
      },
    );

    const channel = echo.private("devices");
    channel.listen(".device.data.received", (payload: DeviceData) => {
      setDeviceData(payload);
    });

    return () => {
      echo.leaveChannel("devices");
    };
  }, []);

  const data = useDeviceData("abc123");
  console.log("data: ", data);

  return (
    <div>
      {deviceData ? (
        <pre>{JSON.stringify(deviceData, null, 2)}</pre>
      ) : (
        <p>Waiting for device data...</p>
      )}
    </div>
  );
}

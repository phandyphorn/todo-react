// src/hooks/useDeviceData.ts
import { useEffect, useState } from "react";
import echo from "../echo";

export function useDeviceData(deviceId: string) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const channel = echo.channel(`device.${deviceId}`);
    const handler = (payload: unknown) => setData(payload);

    channel.listen(".device.data.received", handler);

    return () => {
      channel.stopListening(".device.data.received", handler);
      echo.leaveChannel(`device.${deviceId}`);
    };
  }, [deviceId]);

  return data;
}

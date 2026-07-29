// src/types/device.ts
export interface DeviceDataEvent {
  device_id: string;
  data: Record<string, unknown>; // replace with your actual payload shape
  timestamp: string;
}

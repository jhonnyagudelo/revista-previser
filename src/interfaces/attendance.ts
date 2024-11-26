export interface Attendance {
  status: number;
  message: string;
  data: Data;
}

interface Data {
  id: number;
  customer_id: number;
  event_id: number;
  confirm_attendance: boolean;
  confirm_arrival: boolean;
  confirmation_time: Date;
  arrival_time: Date;
  created_at: Date;
  update_at: Date;
  state: boolean;
}

interface GuestResponse {
  id: number;
  document: string;
  name: string;
  phone?: string;
  surname?: string;
  email?: string;
}

export interface Guest {
  status: number;
  message: string;
  data: GuestResponse;
}

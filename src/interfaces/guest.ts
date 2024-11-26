interface GuestResponse {
  id: number;
  document: string;
  name: string;
  surname?: string;
  email?: string; // Si el correo es opcional
}

export interface Guest {
  status: number;
  message: string;
  data: GuestResponse;
}

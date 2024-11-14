export interface SiteProps {
    data?: {
      data:Event[];
    } 
  }
  
export interface Event {
  id: number;
  event_name: string;
  date: Date;
  location: string | null;
  place: string | null;
  hour: Date | null;
  created_at: Date | null;
  update_at: Date | null;
  state: boolean;
  }
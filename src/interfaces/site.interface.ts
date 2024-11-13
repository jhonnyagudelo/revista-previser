interface SiteProps {
    data: Event[];
  }
  
  interface Event {
    id: number;
    event_name: string;
    date: string;
    location: string;
    place:string,
    hour:string,
    created_at: string;
    update_at: string;
    state: boolean;
  }
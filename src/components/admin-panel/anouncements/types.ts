export interface Announcement {
    id:          number;
    title:       string;
    content:     string;
    created_at:  string;
  }
  
  export interface AnnouncementDraft {
    id?:         number;   // optional — undefined when creating new
    title:       string;
    content:     string;
    created_at?: string;
  }
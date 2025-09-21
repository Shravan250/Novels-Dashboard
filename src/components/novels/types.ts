export interface Novel {
  _id?: string;
  section: string;
  title: string;
  link: string;
  status: string;
  tags: string[];
  remarks: string;
  [key: string]: any;
}

export interface IProps {
  data: Array<userData>;
}

interface userData {
    id: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    date_of_birth?: string;
    industry?: string;
    salary?: number;
    years_of_experience?: number;
}

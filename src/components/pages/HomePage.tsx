import React, {useState} from 'react';
import {DataGrid, GridColDef} from '@material-ui/data-grid';
import {IProps} from '../utils/UserDataInterface';

const columns: GridColDef[] = [{field: 'first_name', headerName: 'First Name', width: 150, editable: true},
    {field: 'last_name', headerName: 'Last Name', width: 150, editable: true},
    {field: 'email', headerName: 'Email', width: 150, editable: true},
    {field: 'date_of_birth', headerName: 'Date Of Birth', width: 150, editable: true},
    {field: 'industry', headerName: 'Industry', width: 150, editable: true},
    {field: 'salary', headerName: 'Salary', width: 150, editable: true},
    {field: 'years_of_experience', headerName: 'Years of Experience', width: 150, editable: true}];

const HomePage = (props: IProps) => {
    const [pageSize, setPageSize] = useState(0 as number);

    return <div style={{ height: '80vh', width: '100%' }}>
        <DataGrid
            columns={columns}
            rows={props.data}
            pageSize={pageSize}
            onPageSizeChange={(param) => setPageSize(param.pageSize)}
            rowsPerPageOptions={[1, 25, 100]}
        />
    </div>
};

export default HomePage;
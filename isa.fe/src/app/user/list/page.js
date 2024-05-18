'use client';
import Link from "next/link";
import useListData from "@/hooks/getListData";
import DataTable from "react-data-table-component";
import {useEffect, useState} from "react";
import {Spinner} from "reactstrap";

const tableColumns = [
    {
        name: "First name",
        selector: (row) => `${row.firstName}`,
        sortable: false
    },
    {
        name: "Last name",
        selector: (row) => `${row.lastName}`,
        sortable: false
    },
    {
        name: "Email",
        selector: (row) => `${row.email}`,
        sortable: false
    }
];

export default function Home() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const {getData, loading, data} = useListData(`/api/korisnik/findAllPaged?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`);

    useEffect(() => {
        getData(`/api/korisnik/findAllPaged?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`);
    }, [pageSize, pageNumber]);


    const handlePageChange = async (pageNumber) => {
        setPageNumber(pageNumber);
    }

    const handlePerRowChange = async (newPerPage, page) => {
        setPageNumber(page);
        setPageSize(newPerPage);
    }

    return (
        <>
            <DataTable data={data.content}
                        columns={tableColumns}
                        striped={true}
                        noHeader={true}
                        pagination
                        paginationServer
                        progressPending={loading}
                        paginationTotalRows={data.totalElements}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handlePerRowChange}
                        progressComponent={<Spinner color="danger">Ucitavanje...</Spinner>}
                        // customStyles={listDataStyles}
                        // paginationPerPage={20}
                        highlightOnHover
                        />
        </>
    );
}

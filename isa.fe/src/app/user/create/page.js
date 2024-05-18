'use client'
import Link from "next/link";
import {useEffect, useState} from "react";
import {get} from "@/core/httpClient";

export default function UserCreate() {
    const [counter, setCounter] = useState(0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    const getFirstName = async () => {
        await get("http://localhost:8080/api/korisnik/findAll").then(r => {
            setData(r.data);
        });
    }

    useEffect(() => {
        setLoading(true)
        getFirstName().then(r => {
            setLoading(false);
        });
    }, [counter]);


    return (
        <>
            {loading === true ? <h1>Loading...</h1> : (
                <>
                    <h1>{ data }</h1>
                </>
            )}
        </>
    );
}

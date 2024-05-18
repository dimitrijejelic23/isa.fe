import {useCallback, useState} from "react";
import {get} from "@/core/httpClient";

const useListData = (url) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const getData = useCallback(async () => {
        setLoading(true);

        await get(url).then((response) => {
            setData(response.data);
            setLoading(false);
        });

    }, [url]);

    return {getData, loading, data};
};

export default useListData;
import { useQuery } from "@tanstack/react-query";
import CostumAxios from "./axios";

export const useFetch = (url) => {
    const fetchData = async () => {
        const data = await CostumAxios.get(url);
        return data.data;
    };
    const { data, isLoading, error } = useQuery({
        queryKey: [url],
        queryFn: fetchData,
        keepPreviousData: true,
        staleTime: 5000,
    });

    return { data, isLoading, error };
}


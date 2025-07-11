import { useQuery } from "@tanstack/react-query";
import CostumAxios from "./axios";

export const Posting = (url, postData) => {
    const postingData = async () => {
        const data = await CostumAxios.post(url, {postData},
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        return data.data;
    };
    const { data, isLoading, error } = useQuery({
        queryKey: [url],
        queryFn: postingData,
        keepPreviousData: true,
        staleTime: 5000,
    });

    return { data, isLoading, error };
}


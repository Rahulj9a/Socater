/* custom hook in a Next.js application that uses SWR (Stale-While-Revalidate) and a fetcher function to fetch the current user's data from an API endpoint */

import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const usecurrentUser = () => {
     const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

     return {
          data,
          error,
          isLoading,
          mutate,
     };
};

export default usecurrentUser;

/* this code provides a simple and efficient way to fetch and cache the current user's data from an API endpoint using SWR and a custom hook */

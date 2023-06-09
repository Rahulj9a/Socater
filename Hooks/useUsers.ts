import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUsers = () => {
     const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher);
     //so useSwr store data in its globalstorage and will not fetch again and again until it fount that data is modified, its gonna reolace store like redux

     return {
          data,
          error,
          isLoading,
          mutate,
     };
};

export default useUsers;

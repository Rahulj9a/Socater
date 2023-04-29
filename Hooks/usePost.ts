import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const usePost = (postId?: string) => {
     const url = postId ? `/api/posts/${postId}` : null;
     const { data, error, isLoading, mutate } = useSWR(url, fetcher);
     //so useSwr store data in its globalstorage and will not fetch again and again until it fount that data is modified, its gonna reolace store like redux

     return {
          data,
          error,
          isLoading,
          mutate,
     };
};

export default usePost;

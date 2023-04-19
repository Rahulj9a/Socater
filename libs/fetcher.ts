import axios from "axios";

const fetcher = (url: string) =>
     axios.get("/api/current").then((res) => {
          return res.data;
     });

export default fetcher;

//it will fetch our data from url

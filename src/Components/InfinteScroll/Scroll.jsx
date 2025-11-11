import React, { useEffect, useRef, useState } from "react";

const Scroll = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)

  const ignoreRef = useRef(false)

  const fetchUsers = async (pageParam) => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
      );
      const data = await res.json();
      console.log("data", data)
      setUsers((prev) => [...prev, ...data]);
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if(ignoreRef.current){
      ignoreRef.current = false
      return 
    } 
    ignoreRef.current = true

     fetchUsers(page);
   
  }, [page]); // Initial fetch

  // useEffect(() => {
  //   if(page > 1){
  //     fetchUsers(page);
  //     console.log("sdgsg")
  //   }
  // }, [page])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <h1>Infinite Scroll</h1>
      {users && users?.length && (
        <ul>
          {users.map((u) => (
            <li key={u.id} style={{ listStyle: "none" }}>
              <hr />
              <h2>ID : {u.id} </h2>
              <p>Title: {u.title}</p>
              <p>Body: {u.body}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Scroll;

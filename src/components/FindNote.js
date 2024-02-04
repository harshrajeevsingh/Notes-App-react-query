import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ErrorBlock from "./ErrorBlock";
import LoadingBlock from "./LoadingBlock";
import Note from "./Note";
import { searchNotes } from "../utility/http";
import { useDebounce } from "../utility/useDebounce";

const FindNote = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 800);

  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["notes", { mySearchTerm: debouncedValue }], // By including "searchTerm", both the keys are combined and form a new key. "notes" is now not the one that we used before in notes
    queryFn: () => searchNotes(debouncedValue), // we made it anonymous fn, so function won't run, untill the searchTerm is there.
    enabled: !!debouncedValue, // If searchTerm is available, then only enable the queryFn to fetch the data
    staleTime: 1000 * 30,
  });
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // useEffect(() => {
  //   // debounce the API call
  //   const timeoutId = setTimeout(async () => {
  //     setSearchResults([]);
  //     if (!searchTerm) return;
  //     setError("");
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8001/search?query=${searchTerm}`
  //       );
  //       const data = await response.json();
  //       setSearchResults(data);
  //     } catch (error) {
  //       setError("Something went wrong!");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }, 500); // wait for 500ms before making the API call

  //   // clear the timeout on every key press
  //   return () => clearTimeout(timeoutId);
  // }, [searchTerm]);
  let content = "type to seatrch";

  if (isLoading) {
    content = <LoadingBlock />;
  }
  if (error) {
    content = "Something went wrong";
  }
  if (data) {
    content = data.map((note) => <Note key={note.id} note={note} />);
  }

  return (
    <div className="find-note-container">
      <input
        type="text"
        placeholder="Search notes"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="search-results-container">{content}</div>
    </div>
  );
};

export default FindNote;

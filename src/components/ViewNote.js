import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Note from "./Note";
import { fetchNoteById } from "../utility/http";
import LoadingBlock from "./LoadingBlock";
import ErrorBlock from "./ErrorBlock";

// const dummyNote = {
//   id: 100,
//   title: "check",
//   description: "again",
//   date: "2024-02-04T10:56:18.409Z",
// };

const ViewNote = () => {
  const params = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", { id: params.id }],
    queryFn: ({ signal }) => fetchNoteById({ signal, id: params.id }),
  });

  let content = "";

  if (isLoading) {
    content = <LoadingBlock />;
  }
  if (isError) {
    content = <ErrorBlock message={error.message} />;
  }
  if (data) {
    content = <Note note={data} />;
  }
  return (
    <div className="notes-container">
      <h1>Viewing Notes</h1>
      <div className="notes-wrapper">{content}</div>
    </div>
  );
};

export default ViewNote;

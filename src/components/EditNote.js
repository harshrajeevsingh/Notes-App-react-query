import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBlock from "./ErrorBlock";
import LoadingBlock from "./LoadingBlock";
import NoteForm from "./NoteForm";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { fetchNoteById, updateNote } from "../utility/http";
import { queryClient } from "../utility/queryClient";
const EditNote = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["notes", { id: params.id }],
    queryFn: ({ signal }) => fetchNoteById({ signal, id: params.id }),
  });

  const { mutate } = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes", { id: params.id }],
      });
      navigate(`/view-note/${params.id}`);
    },
  });

  const noteSubmissionHandler = (note) => {
    mutate({ id: params.id, payload: note });
  };

  let content = "Fetching Notes";
  if (isLoading) {
    content = <LoadingBlock />;
  }
  if (isError) {
    content = <ErrorBlock message={error} />;
  }
  if (data) {
    content = <NoteForm data={data} onSubmit={noteSubmissionHandler} />;
  }

  return (
    <div className="new-note-container">
      <h1>Edit Note!</h1>
      {content}
    </div>
  );
};
export default EditNote;

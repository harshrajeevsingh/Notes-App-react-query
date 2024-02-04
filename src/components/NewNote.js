import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import NoteForm from "./NoteForm";
import { addNewNote } from "../utility/http";
import { queryClient } from "../utility/queryClient";
import ErrorBlock from "./ErrorBlock";

const NewNote = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addNewNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
        // exact: true,
      });
      navigate("/");
    },
  });

  // 👆 But with the staleTime in Notes, we can't see the newest added notes after navigating. So we did the invalidateQuery.
  // This will reftech the notes after successful mutation.
  // The `exact` will tell if the exact queryKey should be fetched or the dynamic one too.

  const noteSubmissionHandler = (note) => {
    mutate(note);
  };
  return (
    <div className="new-note-container">
      <h1>Add Note!</h1>
      {isError && <ErrorBlock message={error.message} />}
      <NoteForm onSubmit={noteSubmissionHandler} />
      {isPending && "Sending data to update"}
    </div>
  );
};
export default NewNote;

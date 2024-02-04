# Notes

## useQuery

We use useQuery to manage the data. To subscribe to a query in components or custom hooks, call the useQuery hook with at least:

-A unique key for the query
-A function that returns a promise/data fetch function

```
const result = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
```

The unique key provided is used internally for refetching, caching, and sharing our queries throughout the application.

The result object will provide with some states like ==isPending, isError, isSuccess, data, etc.==

-The **status** gives information about the data: Do we have any or not?
-The **fetchStatus** gives information about the queryFn: Is it running or not?

_Note_ : Whenever the window is focused/unfocused, the react-query will refetch the data. This is it's default behaviour. And if network is slow, it will show the cqached result meanwhile the fetching will be done in background and data will be updated when available.

If your query function depends on a variable, include it in your query key

```
function Todos({ todoId }) {
  const result = useQuery({
    queryKey: ['todos', todoId],
    queryFn: () => fetchTodoById(todoId),
  })
}
```

Apart from queryKey, queryFn, we also get, -**staleTime**:- The time after reftching is to be done. By default it's 0, as we see on window focus/unfocus. -**gcTime**:- The time after cache is to be removed.

If you ever want to disable a query from automatically running, you can use the enabled = false/provide some condition to this option.

#### Query Cancellation

TanStack Query provides each query function with an `AbortSignal` **instance**. When a query becomes out-of-date or inactive, this signal will become aborted.
Suppose the data is being fetched, and then user moves to different path, so the data that was being fetched was no more needed. So, using `signal` instance will abort the fetch request.

## useMutations

Unlike queries, mutations are typically used to create/update/delete data or perform server side-effects. For this purpose, TanStack Query exports a `useMutation` hook.

We use mutationFn: to mutate the data(a function).
Just like query, it provides mutate, isPending, isError, error, etc.

```
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addNewNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      navigate("/");
    },
  });

    const noteSubmissionHandler = (note) => {
    mutate(note);
  };
```

We use mutate to update the mutation.
We use onSuccess to define what needs to be done on succesfull mutaion is done.
But if we have staleTime in Notes, we can't see the newest added notes after navigating. So we did the invalidateQuery provided by queryClient.
This will reftech the notes after successful mutation.

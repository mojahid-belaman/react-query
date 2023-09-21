import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { createEvent } from "../../utils/http.js";

export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createEvent,
  });
  function handleSubmit(formData) {
    mutate(formData);
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button" disabled={isPending}>
            {isPending ? "Submitting..." : "Create"}
          </button>
        </>
      </EventForm>
      {isError && (
        <ErrorBlock
          title={"an error occured"}
          message={
            error.info?.message || "an error occured when creating event."
          }
        />
      )}
    </Modal>
  );
}

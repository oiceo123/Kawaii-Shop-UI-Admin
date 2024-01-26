import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const alertError = (
  history: ReturnType<typeof useHistory>,
  text?: string
) =>
  Swal.fire({
    icon: "error",
    text: text ? text : "An error occurred. Please try again later.",
    confirmButtonText: "OK",
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) history.replace("/maintenance");
  });

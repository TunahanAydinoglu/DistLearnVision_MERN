import Swal from "sweetalert2";

const successPop = (message) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: message,
    showConfirmButton: true,
    timer: 1500,
  });
};
const errorPop = (message) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
};
const infoPop = (message) => {
  Swal.fire(message, "", "info");
};
export { successPop, errorPop, infoPop };

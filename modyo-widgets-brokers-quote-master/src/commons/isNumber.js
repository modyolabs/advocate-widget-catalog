export default function isNumber(evt) {
  const e = (evt) || window.event;
  const charCode = (e.which) ? e.which : e.keyCode;
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    e.preventDefault();
    return false;
  }
  return true;
}

//is-hidden function to check if element is visible
//making sure we dont hide something already hidden

let isHidden = (el) => {
  var style = window.getComputedStyle(el);
  return style.display === "none" || style.visibility === "hidden";
};

export default isHidden;

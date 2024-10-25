/* eslint-disable react/prop-types */
function Empty({ resource }) {
  return (
    <p
      style={{
        color: "red ",
        height: "200px",
        fontWeight: "bold",
      }}
    >
      I AM SO SORRY, THE ( {resource} ) COULD NOT BE FOUND HERE, TRY AGAIN MAYBE
      LATER!😂.
    </p>
  );
}

export default Empty;

import "./InputValidacion.css";

export default function InputValidation({ value, onChange, type, rules }) {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="form-control"
      ></input>

      {rules &&
      value.length > 0 &&
      {
        /*     rules.map((rule) => rule.fn(value)).includes(false) */
      } ? (
        <ul className="alert alert-danger">
          {rules.map((rule) => {
            {
              /*  if (!rule.fn(value)) */
            }
            {
              return (
                <li>
                  {" "}
                  {rule.fn(value) ? "✅ " : "❌"} {rule.text}
                </li>
              );
            }
          })}
        </ul>
      ) : (
        ""
      )}
    </>
  );
}

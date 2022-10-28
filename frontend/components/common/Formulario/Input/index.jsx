const Input = ({ onChange, label, id, placeholder }) => {
  return (
    <>
      <div className="flex flex-col mb-4">
        <label htmlFor={id} className="font-bold">
          {label}
        </label>
        <input
          className="bg-gray-100 mt-2 p-3"
          id={id}
          placeholder={placeholder}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.value);
            }
          }}
        />
      </div>
    </>
  );
};

export default Input;

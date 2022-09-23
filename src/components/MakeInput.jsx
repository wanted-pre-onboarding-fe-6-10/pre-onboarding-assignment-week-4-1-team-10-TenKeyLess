import { useEffect, useRef } from 'react';

const MakeInput = ({ id, label, value, style, type = 'text', onChange }) => {
  const inputEl = useRef();

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.value = value;
    }
  }, []);

  return (
    <div className="mr-7">
      <label htmlFor={id} className="mb-2 flex w-44 flex-col font-semibold">
        {label}
      </label>
      <input
        ref={inputEl}
        type={type}
        lang="ja"
        id={id}
        value={value}
        maxLength={10}
        placeholder="Within 10 characters"
        className={`${style} rounded-md border-2 pt-1 pl-2`}
        onChange={e => {
          onChange && onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default MakeInput;

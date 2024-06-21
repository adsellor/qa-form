import { useState } from "react";

export interface IFormTextInputProps {
  title: string;
  action: (value: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const FormTextInput = ({ action, title, onChange }: IFormTextInputProps) => {
  const [value, setValue] = useState('');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange?.(e);
  }

  return (
    <div>
      <p>{title}</p>
      <input type="number" value={value} onChange={handleChange} />
      <input type='button' value='Next' onClick={() => action(value)} />
    </div>
  )

}

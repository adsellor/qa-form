
export interface IFormYesNoInputProps {
  onYes: () => void;
  onNo: () => void;
  title: string
}

export const FormYesNoInput = ({ onYes, onNo, title }: IFormYesNoInputProps) => {
  return <div>
    <p>{title}</p>
    <input value='Yes' type='button' onClick={onYes} />
    <input value='No' type='button' onClick={onNo} />
  </div>
}

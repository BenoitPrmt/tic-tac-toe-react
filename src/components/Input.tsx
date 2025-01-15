
type Props = {
    name: string;
    placeholder?: string;
    defaultValue?: string;
    type?: "text"
    hasError?: boolean
}

const Input = ({ name, type = "text", placeholder = "", defaultValue = "", hasError=false }: Props) => {
    return (
        <input type={type} placeholder={placeholder} name={name} defaultValue={defaultValue} className={`font-bold rounded-lg px-4 py-2 placeholder:text-grey-light-shadow text-grey-dark bg-grey-light shadow-buttonGreyLight focus:outline-none ${hasError ? "placeholder:text-error-shadow bg-error-light border-2 border-error shadow-inputError" : "" }`}/>
    );
};

export default Input;
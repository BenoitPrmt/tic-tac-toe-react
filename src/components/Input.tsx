
type Props = {
    name: string;
    placeholder?: string;
    defaultValue?: string;
    type?: "text"
}

const Input = ({ name, type = "text", placeholder = "", defaultValue = "" }: Props) => {
    return (
        <input type={type} placeholder={placeholder} name={name} defaultValue={defaultValue} className={"rounded-lg px-4 py-2 placeholder:text-grey-light-shadow text-grey-dark bg-grey-light shadow-buttonGreyLight focus:outline-none"}/>
    );
};

export default Input;
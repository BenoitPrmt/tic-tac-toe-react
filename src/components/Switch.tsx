import {useState} from 'react'

type Props = {
    choiceOne: string;
    choiceTwo: string;
    handleChecked: (checked: boolean) => void;
}

const Switch = ({handleChecked, choiceOne, choiceTwo}: Props) => {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = () => {
        handleChecked(!isChecked);
        setIsChecked(!isChecked)
    }

    return (
        <>
            <label
                id="switch-label"
                className="bg-grey-medium-shadow relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-2"
            >
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    aria-checked={isChecked}
                    aria-labelledby="switch-label"
                />
                <span
                    className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-md font-bold uppercase ${
                        !isChecked ? 'text-grey-medium-shadow bg-grey-light-shadow' : 'text-grey-light-shadow'
                    }`}
                >
                    {choiceOne}
                </span>
                <span
                    className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-md font-bold uppercase ${
                        isChecked ? 'text-grey-medium-shadow bg-grey-light-shadow' : 'text-grey-light-shadow'
                    }`}
                >
                    {choiceTwo}
                </span>
            </label>
        </>
    )
}

export default Switch

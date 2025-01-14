import {useState} from 'react'

type Props = {
    handleChecked: (checked: boolean) => void;
}

const Switch = ({ handleChecked }: Props) => {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = () => {
        handleChecked(!isChecked);
        setIsChecked(!isChecked)
    }

    return (
        <>
            <label
                className='bg-grey-medium-shadow relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-2'>
                <input
                    type='checkbox'
                    className='sr-only'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span
                    className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-md font-bold uppercase ${
                        !isChecked ? 'text-grey-light bg-grey-light-shadow' : 'text-grey-light-shadow'
                    }`}
                >
                  Contre l'ordinateur
                </span>
                <span
                    className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-md font-bold uppercase ${
                        isChecked ? 'text-grey-light bg-grey-light-shadow' : 'text-grey-light-shadow'
                    }`}
                >
                  Multijoueur local
                </span>
            </label>
        </>
    )
}

export default Switch

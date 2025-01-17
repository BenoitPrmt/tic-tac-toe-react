import {useState} from 'react'
import circle from "../../../assets/images/game/circle.svg";
import cross from "../../../assets/images/game/cross.svg";

const PlayerChoice = () => {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = () => {
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
                    className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                        !isChecked ? 'text-primary bg-grey-light' : 'text-body-color'
                    }`}
                >
                  <img src={cross} alt={"Cross"} className={"w-10 h-10"}/>
                </span>
                <span
                    className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                        isChecked ? 'text-secondary bg-grey-light' : 'text-body-color'
                    }`}
                >
                  <img src={circle} alt={"Circle"} className={"w-10 h-10"}/>
                </span>
            </label>
        </>
    )
}

export default PlayerChoice

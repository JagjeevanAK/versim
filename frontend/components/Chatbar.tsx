import InputBox from "./inputbox";

export default function ChatBar(){
    return (
        <div className="h-full w-full bg-[#1D1D1D] pr-2 text-white flex flex-col">
            <div className="grow overflow-auto">

            </div>
            <InputBox height="h-[12%]" maxHeight="10px"/>
        </div>
    )
}
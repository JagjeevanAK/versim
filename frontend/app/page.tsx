import InputBox from "@/components/inputbox";

export default function Home(){
    return (
        <div className="flex items-center h-screen justify-center flex-col text-white ">
            <div className="mb-15">
                <div className="m-4">
                    Build something Valuable with VerSim
                </div>
                <div className="m-4">
                    Create apps and websites by chatting with AI
                </div>
            </div>
            <InputBox width="800px" height="auto" maxHeight="300px"/>
        </div>
    )
}
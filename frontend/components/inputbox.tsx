import { ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils"
import { useRef, useState } from 'react';

interface InputBoxProps {
    height?: string;
    width?: string;
    maxHeight?: string;
    style?: string;
    onSendMessage?: (message: string) => void;
}

export default function InputBox({ width, maxHeight = "max-h-[200px]", style, onSendMessage }: InputBoxProps){
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [input, setInput] = useState<string>("");

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleSend = () => {
        if (input.trim() === "") return;
        if (onSendMessage) {
            onSendMessage(input);
        }
        setInput("");
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    return (
        <div className={cn("bg-[#282825] rounded-3xl p-4")}>
            <textarea
                ref={textareaRef}
                autoFocus
                onInput={handleInput}
                onChange={(e) => setInput(e.target.value)}
                className={cn("w-full bg-transparent text-white outline-none pl-1 min-h-10 resize-none overflow-y-auto placeholder:text-muted-foreground selection:bg-primary/20 selection:text-primary caret-white text-lg", style, width, maxHeight)}
                placeholder="Type your message..."
                value={input}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                    }
                }}
            />
            <div className='flex flex-row-reverse mt-2'>
                <button 
                    className="ml-3 bg-white px-2 py-2 rounded-full transition-all cursor-pointer"
                    onClick={handleSend}
                >
                    <ArrowRight className="text-black" />
                </button>
            </div>
        </div>
    )
}
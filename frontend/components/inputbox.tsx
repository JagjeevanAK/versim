import { ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils"
import { useRef, useEffect } from 'react';

interface InputBoxProps {
    height?: string;
    width?: string;
    maxHeight?: string;
    style?: string;
}

export default function InputBox({ width, maxHeight = "max-h-[200px]", style }: InputBoxProps){
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        handleInput();
    }, []);

    return (
        <div className={cn("bg-[#282825] rounded-3xl p-4")}>
            <textarea
                ref={textareaRef}
                autoFocus
                onInput={handleInput}
                className={cn("w-full bg-transparent text-white outline-none pl-1 min-h-10 resize-none overflow-y-auto placeholder:text-muted-foreground selection:bg-primary/20 selection:text-primary caret-white", style, width, maxHeight)}
                placeholder="Type your message..."
            />
            <div className='flex flex-row-reverse'>
                <button className="ml-3 bg-white px-2 py-2 rounded-full transition-all">
                    <ArrowRight className="text-black" />
                </button>
            </div>
        </div>
    )
}
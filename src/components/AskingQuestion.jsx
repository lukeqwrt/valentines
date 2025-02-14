import { useState } from "react"
import confetti from "canvas-confetti"

const createFallingEmoji = () => {
    const emojiList = ["☹️", "😢", "😭", "😞"]; // Different sad emojis
    const emoji = document.createElement("div");

    emoji.classList.add("sad-emoji");
    emoji.innerText = emojiList[Math.floor(Math.random() * emojiList.length)];
    emoji.style.left = `${Math.random() * window.innerWidth}px`; // Random x-position
    emoji.style.top = "-50px"; // Start slightly above the screen

    document.body.appendChild(emoji);

    setTimeout(() => {
        emoji.remove(); // Remove after animation ends
    }, 2000);
};



const AskingQuestion = () => {

    const [answers, setAnswers] = useState([
        { answer: 'Yes', emoji: '🥰', clicked: false },
        { answer: 'Maybe', emoji: '🤔',clicked: false },
        { answer: 'No', emoji: '☹️', clicked: false },
    ])

    const clickedEmoji = (index) => {
        // const clicked = answers.map((item,idx) => idx === index ? {...item, clicked: true} : {...item, clicked: false})
        const checkAnswer = answers[index].answer === 'Yes';
        if(checkAnswer) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            });
        }else{
            createFallingEmoji();
        }
        const clicked = answers.map((item,idx) => {
            if(idx === index) {
                return {...item, clicked: true}
            }else{
                return {...item, clicked: false}
            }
        })

        setAnswers(clicked)
    }

    return (
        <div className="ask flex flex-col justify-center items-center gap-8">
            <img className="h-auto w-full rounded-lg" src={`${import.meta.env.BASE_URL}/img/photo-us.jpeg`} alt="Picture" />
            <div className="button-wrapper flex gap-5">
                {answers.map((item, index) => (
                    <button     
                        key={index}
                        onClick={() => clickedEmoji(index)}
                        className="cursor-pointer grid gap-2 items-center justify-center relative">
                            <span className={`absolute top-0 left-[50%] translate-[-50%] emoji-animation ${item.clicked ? 'active' : ''}`}>item.emoji</span>
                            <span className="bg-gray-300 text-3xl flex justify-center items-center h-[80px] w-[80px] rounded-full">
                                {item.emoji}
                            </span>
                            {item.answer}
                    </button>
                ))}
            </div>
        </div>
    );
}
 
export default AskingQuestion;
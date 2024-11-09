import React, { useEffect, useRef, useState } from 'react'

const CodeEditor = () => {

    const keyPointer = useRef([]);
    const [codeBox, setCodeBox] = useState([{ text: '' }]);
    const [focusIndex, setFocusIndex] = useState(null); // 포커스를 맞출 인덱스

    const saveCursorPosition = (element) => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const startOffset = range.startOffset;
        return { element, startOffset };
    };

    const restoreCursorPosition = (savedPosition) => {
        const { element, startOffset } = savedPosition;
        const range = document.createRange();
        const selection = window.getSelection();
        console.log("selection", selection)
        range.setStart(element.childNodes[0] || element, startOffset);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    };

    const handleInputChange = (e, index) => {
        const savedCursorPosition = saveCursorPosition(e.target); // 현재 커서 위치 저장
        const newText = e.target.innerText;

        setCodeBox((prevCodeBox) =>
            prevCodeBox.map((box, i) =>
                i === index ? { ...box, text: newText } : box
            )
        );
    
        setTimeout(() => {
            restoreCursorPosition(savedCursorPosition); // 상태 업데이트 후 커서 위치 복구
        }, 0);
    };

    const checkKey = (e, index) => {
        if (e.key === 'Enter') {
            console.log('Enter');
            e.preventDefault();
            onKeyDownEnter(index);

        }else if(e.key === 'ArrowUp') {
            console.log('ArrowUp');
            e.preventDefault();
            onKeyDownUpDown(e, index);

        }else if(e.key === 'ArrowDown') {
            console.log('ArrowDown');
            e.preventDefault();
            onKeyDownUpDown(e, index);

        }else if(e.key === ' ') {
            console.log('Space');

        }else if(e.key === 'Backspace') {
            console.log('Backspace');
            onKeyDownBackspace(e, index);
        }else if(e.key === 'Delete') {
            console.log('Delete');
            onKeyDownDelete(e, index);
        }
    }

    const onKeyDownEnter = (index) => {
        const newRow = { text: '' };
        setCodeBox((prevCodeBox) => {
            const newCodeBox = [...prevCodeBox];
            newCodeBox.splice(index + 1, 0, newRow); // 현재 줄 다음에 새로운 줄 추가
            return newCodeBox;
        });
        setFocusIndex(index + 1); // 새로 추가된 줄로 포커스 설정
    };

    const onKeyDownUpDown = (e, index) => {
        if (e.key === 'ArrowUp' && keyPointer.current[index - 1]) {
            setFocusIndex(index - 1);
        } else if (e.key === 'ArrowDown' && keyPointer.current[index + 1]) {
            setFocusIndex(index + 1);
        }
    };

    const onKeyDownBackspace = (e, index) => {
        const currentSpan = keyPointer.current[index];
        const charCount = currentSpan.textContent.length;
        if (charCount === 0 && codeBox.length > 1) {
            e.preventDefault();
            setCodeBox((prevCodeBox) => {
                const newCodeBox = [...prevCodeBox];
                newCodeBox.splice(index, 1); // 현재 줄 삭제
                return newCodeBox;
            });
          setFocusIndex(index > 0 ? index - 1 : 0); // 이전 줄로 포커스 이동
        }
    };

    const onKeyDownDelete = (e, index) => {
        const currentSpan = keyPointer.current[index];
        const charCount = currentSpan.textContent.length;
        if (charCount === 0 && codeBox.length > 1) {
            e.preventDefault();
            setCodeBox((prevCodeBox) => {
                const newCodeBox = [...prevCodeBox];
                newCodeBox.splice(index, 1); // 현재 줄 삭제
                return newCodeBox;
            });
        }
    }

    useEffect(() => {
        // focusIndex가 설정된 경우, 해당 인덱스의 요소에 포커스 이동
        if (focusIndex !== null && keyPointer.current[focusIndex]) {
            keyPointer.current[focusIndex].focus();
          setFocusIndex(null); // 포커스 이동 후 초기화
        }
    }, [codeBox, focusIndex]);

  return (
    <div className="codeBox">
        {codeBox.map((box, index) => (
        <span
            key={index}
            className="row"
            contentEditable="true"
            onInput={(e) => handleInputChange(e, index)} // 텍스트 변경 시 상태에 저장
            onKeyDown={(e) => checkKey(e, index)}
            ref={(el) => (keyPointer.current[index] = el)}
            suppressContentEditableWarning={true}
        >
            {box.text}
        </span>
        ))}
    </div>
  )
}

export default CodeEditor
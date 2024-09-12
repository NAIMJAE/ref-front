import React from 'react';


const TictactoeComponent = ({ clickHandler, board, myTurn }) => {

    return (
        <div id='Tictactoe'>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className='ctnRow'>
                    {row.map((cell, colIndex) => (
                        <button
                            key={colIndex}
                            className={`btnTictactoe ${cell === 'O' ? 'circle' : cell === 'X' ? 'cross' : ''}`}
                            onClick={() => clickHandler(rowIndex, colIndex)}
                            disabled={!myTurn || cell !== null}
                        ></button>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TictactoeComponent;

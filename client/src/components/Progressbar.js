import React from 'react'

const Progressbar = ({ progress, ratings }) => {

    const Parentdiv = {
        height: 5,
        width: '80%',
        backgroundColor: '#b5b5b5',
        borderRadius: 40,
        margin: 8
    }

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: 'black',
        borderRadius: 20,
        textAlign: 'right'
    }

    const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900
    }

    return (
        <>
            <div style={Parentdiv}>
                <div style={Childdiv}>
                </div>
            </div>
            <span>{ratings}</span>
        </>
    )
}

export default Progressbar; 

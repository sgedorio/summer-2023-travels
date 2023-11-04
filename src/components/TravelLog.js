import React, { useState } from "react";
export default function TravelLog (props) {
    //states for hovering over .media--container
    const [isHovered, setIsHovered] = useState(false);
    const [showStreetView, setShowStreetView] = useState(false);

    const handleContainerHover = () => {
        setIsHovered(true);
    };

    const handleContainerLeaver = () => {
        setIsHovered(false);
    }

    const takeMeThere = () => {
        setShowStreetView(true);
    }

    const hideStreetView = () => {
        setShowStreetView(false);
    }

    // create array with all possible images/videos
    const mediaArray = props.item.img.map((img) => {
        const mediaHtml = img.endsWith('.mp4')
        ? `<video src="${process.env.PUBLIC_URL}/img/${img}" autoplay muted loop playsinline></video>`
        : `<img src="${process.env.PUBLIC_URL}/img/${img}" />`;

        return (
            <div 
                className={`media--container ${isHovered ? 'hovered' : ''} ${showStreetView ? 'streetview--show--media' : ''}`}
                onMouseEnter={handleContainerHover}
                onMouseLeave={handleContainerLeaver} 
            >
                <div className="screen--overlay"></div>                
                {/* {img.endsWith('.mp4') ? (<video src={process.env.PUBLIC_URL + `/img/${img}`} muted autoPlay loop playsInline />) :
                (<img src={process.env.PUBLIC_URL + `/img/${img}`} />)} */}
                <div dangerouslySetInnerHTML={{ __html: mediaHtml }}></div>
                <div 
                    className="btn-overlay"
                    onClick={takeMeThere}
                >
                    <h3>Take me there!</h3>
                </div>
            </div>
        )
    })

    return (
        <div className="travel--log">
            {mediaArray}
            <div className={`streetview--container ${showStreetView ? 'streetview--show' : ''}`}>
                {props.item.streetview}
                <div 
                    className="exit--button"
                    onClick={hideStreetView}
                >
                    <img src={process.env.PUBLIC_URL + '/img/x.svg'} alt="exit" />
                </div>
            </div>
            <div className="travel--log--text">
                <div className="date--location--city">
                    <div className="date--location">
                        <h2 className="date">{props.item.date}</h2>
                        <img src={process.env.PUBLIC_URL + '/img/sun2.svg'} alt="sun" />
                        <h2 className="location">{props.item.location}</h2>
                    </div>
                    
                    <div className="icon--city--state">
                        <img src={process.env.PUBLIC_URL + '/img/location.svg'} alt="location" />
                        <h3>{props.item.city}</h3>
                    </div>
                </div>

                <div className="content">
                    {props.item.content}
                </div>
            </div>
        </div>
    )
}
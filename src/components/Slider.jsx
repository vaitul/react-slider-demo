import React, { useEffect, useMemo, useRef, useState } from 'react';
import IconButton from './IconButton';
import { debounce } from 'lodash'
import PropTypes from 'prop-types'

const Slider = ({ sliderData }) => {

    const containerRef = useRef(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)

    const isMobile = innerWidth < 668

    const calculatedImageWidth = useMemo(() => {
        let val = 0
        if (isMobile)
            val = 278;
        else
            val = (innerWidth / 3) - 48

        return val <= 500 ? val : 440
    }, [innerWidth, isMobile])

    useEffect(() => {
        const onResize = () => setInnerWidth(containerRef?.current?.clientWidth)
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [containerRef])

    
    const moveViewPort = itemsToMove => {
        if ((itemsToMove < 0 && activeSlide === 0) || (itemsToMove > 0 && activeSlide + 1 === sliderData.length)) return
        if (containerRef.current) {
            setActiveSlide(activeSlide + itemsToMove)

            const spaceBetweenCards = 24; // px
            // card width may change after user changes the zoom so we re calcualte it here.
            const cardWidth = Math.round(calculatedImageWidth) + spaceBetweenCards;
            let moveOffset = (itemsToMove * cardWidth);

            /* calculate max limit of cards to be slide, because, for example what if you want to slide 4 cards and device width near is able to show only 3.5 cards ?? 
            without this logic 4th card will never show. so in that case this below condition will be true and calculate new noOfCard to be slided, in our example new noOfCard will be 3. */
            if (Math.abs(moveOffset) > (containerRef.current.clientWidth + spaceBetweenCards)) {
                let newNoOfCard = Math.floor((containerRef.current.clientWidth + spaceBetweenCards) / cardWidth) || 1 // assign 1 if calculation output is 0.
                itemsToMove = itemsToMove > 0 ? newNoOfCard : -newNoOfCard
                moveOffset = (itemsToMove * cardWidth);
            }

            const scrollTo = offset => {
                containerRef.current.scrollTo({
                    top: 0,
                    left: offset,
                    behavior: 'smooth'
                });
            }

            const sl = containerRef.current.scrollLeft;
            const cw = containerRef.current.scrollWidth;
            if (moveOffset >= 0) {
                if ((sl + moveOffset) >= cw) {
                    scrollTo(cw)
                } else {
                    scrollTo((sl + moveOffset))
                }
            } else {
                if ((sl - moveOffset) <= 0) {
                    scrollTo(0)
                } else {
                    scrollTo((sl + moveOffset))
                }
            }
        }
    }


    useEffect(() => {
        const onContainerScroll = debounce((e) => {
            e.preventDefault();
            if (e.deltaY < 0) {
                moveViewPort(-1)
            } else {
                moveViewPort(1)
            }
        }, 200)

        window.addEventListener('wheel', onContainerScroll, { passive: false });

        return () => {
            window.removeEventListener('wheel', onContainerScroll, { passive: false })
        }

    }, [activeSlide])

    return (
        <div className='relative w-full' id="container">
            <div
                ref={containerRef}
                style={{ paddingLeft: isMobile ? 24 : (innerWidth / 2 - (calculatedImageWidth / 2 + 14)), paddingRight: innerWidth / (isMobile ? 1 : 2) - (calculatedImageWidth / (isMobile ? 1 : 2) + 0) }}
                className='
                    sm:mt-[55px]
                    mt-9
                    flex flex-row no-scrollbar
                    overflow-y-hidden overflow-x-auto
                    space-x-6
                 '>
                {sliderData.map(({ img, text, clientText }, i) => (
                    <div
                        style={{ width: calculatedImageWidth + "px" }}
                        className={`h-auto flex-shrink-0 flex-grow-1`}
                    >
                        <img
                            style={{ height: calculatedImageWidth + "px" }}
                            src={img}
                            alt={"slide img " + (i + 1)}
                            className="w-full rounded-lg shadow-md"
                        />
                        <p style={{ opacity: activeSlide === i ? 1 : 0 }} className='sm:text-2xl text-md mt-[46px]'>{text}</p>
                        <div className='mt-12' style={{ opacity: activeSlide === i ? 1 : 0 }}>{clientText}</div>
                    </div>
                ))}
            </div>
            <div className='absolute bottom-8 md:bottom-0' style={{ paddingLeft: (isMobile ? innerWidth - (calculatedImageWidth / 2) : (innerWidth / 2 + (calculatedImageWidth / 4))) }}>
                <IconButton disabled={activeSlide === 0} type="back" onClick={() => moveViewPort(-1)} className='mr-2' />
                <IconButton disabled={activeSlide === sliderData?.length - 1} type="next" onClick={() => moveViewPort(1)} />
            </div>
        </div>
    );
};

Slider.propTypes = {
    sliderData: PropTypes.arrayOf(PropTypes.shape({
        img: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        clientText: PropTypes.string.isRequired,
    })).isRequired
}

export default Slider;
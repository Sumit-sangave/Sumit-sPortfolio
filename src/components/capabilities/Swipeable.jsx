import "./Swipeable.scss"
import React from 'react'
import { Swiper } from 'swiper/react'
import {Pagination, Autoplay} from "swiper/modules"
import {useUtils} from "/src/helpers/utils.js"

const BREAKPOINTS_WITH_TWO_SLIDES = {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
}

const BREAKPOINTS_WITH_THREE_SLIDES = {
    0: { slidesPerView: 1 },
    630: { slidesPerView: 2 },
    1500: { slidesPerView: 3 },
}

const BREAKPOINTS_WITH_FOUR_SLIDES = {
    0: { slidesPerView: 2, spaceBetween: 30 },
    1400: { slidesPerView: 3, spaceBetween: 20 },
    1800: { slidesPerView: 4, spaceBetween: 20 },
}

function Swipeable({ children, loop, autoPlayDelay, slidesPerView }) {
    const utils = useUtils()

    // Auto-detect number of slides if not specified
    const childrenArray = React.Children.toArray(children)
    const totalSlides = childrenArray.length
    
    // If slidesPerView is not specified, auto-detect based on number of slides
    if (!slidesPerView) {
        slidesPerView = totalSlides >= 4 ? 4 : 3
    }
    
    slidesPerView = utils.clamp(slidesPerView, 2, 4)

    const breakpoints = slidesPerView === 2 ?
        BREAKPOINTS_WITH_TWO_SLIDES :
        slidesPerView === 3 ?
        BREAKPOINTS_WITH_THREE_SLIDES :
        BREAKPOINTS_WITH_FOUR_SLIDES

    const autoplay = {
        delay: autoPlayDelay ? autoPlayDelay * 1000 : 10000,
        disableOnInteraction: false,
    }

    return (
        <Swiper
            className={`swiper-full-width ${slidesPerView === 4 ? 'swiper-slides-per-view-2' : ''}`}
            slidesPerView={slidesPerView}
            spaceBetween={slidesPerView === 4 ? 30 : 20}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            grabCursor={true}
            preventClicksPropagation={true}
            breakpoints={breakpoints}
            loop={loop}
            autoplay={autoplay}
        >
            {children}
        </Swiper>
    )
}

export default Swipeable
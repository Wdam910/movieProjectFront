import React, { useEffect, useRef, useState } from 'react'
import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import Modal from './Modal'
import '../../css/main.css'

const EmblaCarouselComponent = ({ list, Infolist, infoId, showInfo, hideInfo, onClick, relatedList, isModalOpen, modalType }) => {
    const emblaRef = useRef(null)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const emblaApiRef = useRef(null)

    useEffect(() => {
        const emblaNode = emblaRef.current
        if (!emblaNode) return
        const options = { loop: true }
        const plugins = [Autoplay({ delay: 6000, stopOnInteraction: false })]
        const emblaApi = EmblaCarousel(emblaNode, options, plugins)
        emblaApiRef.current = emblaApi

        const onSelect = () => {
            const newIndex = emblaApi.selectedScrollSnap()
            setSelectedIndex(newIndex)
        }

        emblaApi.on('select', onSelect)
        return () => emblaApi.destroy()
    }, [])

    const scrollToNext = () => {
        emblaApiRef.current.scrollNext()
    }

    const scrollToPrev = () => {
        emblaApiRef.current.scrollPrev()
    }

    return (
        <div className="embla-wrapper">
            <button className="carousel-btn prev" onClick={scrollToPrev}>
                <img src='/img/prev.png' alt='prev' />
            </button>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {list.map((movie, index) => (
                        <div className="embla__slide" key={index}>
                            <div className='linear_gradient' />
                            <div className='main_movie_info'>
                                <div className='main_movie_title'>{movie.title}</div>
                                <h2>{movie.entitle}</h2><br />
                                <div className='main_movie_director'>{movie.directorName}</div>
                                <div className='main_movie_actors'>{movie.actors}</div>
                                <div className='mainBtn'>
                                    <button onClick={() => showInfo(movie.movieId)}>상세보기</button>
                                    <a href={`/ticket/date?title=${encodeURIComponent(movie.title)}`}>
                                        <button>예매하기</button>
                                    </a>
                                </div>
                            </div>
                            <img src={`${movie.stillUrl}`} alt={movie.title} />
                        </div>
                    ))}
                </div>
            </div>
            <button className="carousel-btn next" onClick={scrollToNext}>
                <img src='/img/next.png' alt='next' />
            </button>

            <div className="carousel-indicator">
                {list.map((_, index) => (
                    <div
                        key={index}
                        className={`indicator-bar ${selectedIndex === index ? 'active' : ''}`}
                    />
                ))}
            </div>
            {infoId !== null && (
                <Modal isOpen={isModalOpen} onClose={hideInfo} type={modalType} infoData={Infolist[0]} onClick={onClick} relatedList={relatedList} Infolist={Infolist} />
            )}
        </div>
    )
}

export default EmblaCarouselComponent
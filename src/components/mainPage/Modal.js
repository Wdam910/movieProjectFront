import React, { useEffect } from 'react'
import '../../css/modal.css'

const Modal = ({ isOpen, onClose, type, infoData, onClick, Infolist, relatedList, modalData, mySubmit, onChange, showResult }) => {
    /*
    // 모달 통합 관련 코드 (나호영 작성)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState(null)

    // 검색 페이지 모달 창 닫는 함수
    const hideInfo = () => {
        setIsModalOpen(false)
        setModalType(null)
    }

    // 리뷰 작성 모달 창 닫는 함수
    const hideModal = () => {
        setIsModalOpen(false)
        setModalType(null)
    }

    // 리뷰 작성 결과 창 보이고 닫는 함수
    const showResult = () => {
        const elements = document.getElementsByClassName("Resultmodal")
        if (elements.length > 0) elements[0].style.display = "block"
    }

    const hideResult = () => {
        const elements = document.getElementsByClassName("Resultmodal")
        if (elements.length > 0) elements[0].style.display = "none"
        setModalData(null)
    }
    */

    useEffect(() => {
        console.log('모달 상태 변경:', isOpen)
    }, [isOpen])

    if (!isOpen) return null

    const renderContent = () => {
        switch (type) {
            case 'detail':
                return (
                    infoData && (
                        <div className="modal-container" onClick={onClose}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-body">
                                    <div className='movieModal'>
                                        <div className='movieInfo'>
                                            <div className='movieInfoText'>
                                                <p>
                                                    {infoData.title}
                                                </p>
                                                <p>
                                                    {infoData.entitle}
                                                </p>
                                                <p>
                                                    {infoData.director}<br />
                                                    {infoData.actors}
                                                </p>
                                                <button onClick={() => onClick(infoData.title)}>예매하기</button>
                                            </div>
                                            <img src={infoData.posterUrl} alt="영화 포스터 이미지" />

                                        </div>
                                        <div className='synops_review'>
                                            <div className='synops'>
                                                {infoData.synopsis}
                                            </div>
                                            <div className='review'>
                                                <p>REVIEW</p>
                                                {Infolist.map((data, index) => (
                                                    <div key={`info-${data.movieId}-${data.reviewDate}-${index}`}>
                                                        {data.content != null &&
                                                            <p>
                                                                <img src="/img/movie1.jpg" alt="프로필사진" />&nbsp;&nbsp;&nbsp;
                                                                {data.userId} {data.reviewDate}
                                                            </p>}
                                                        <br />
                                                        <p>{data.content}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='nextMovie'>
                                            {console.log(relatedList)}
                                            {relatedList.length > 1 && (
                                                <div>
                                                    <h1>관련컨텐츠</h1>
                                                    {relatedList
                                                        .filter(movie => movie.movieId !== Infolist[0].movieId)
                                                        .map((data, index) => (
                                                            <div key={`related-${data.movieId}-${index}`} className="SearchImgDiv">
                                                                <img src={data.posterUrl} alt='포스터이미지' />
                                                            </div>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
            case 'review':
                return (
                    <div className="modal-container" onClick={onClose}>
                        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                            <div className="modal-body">
                                <div className='movieModal'>
                                    <div className='movieTitle'>
                                        <p>'{modalData.title}'의 리뷰를 작성해주세요.</p>
                                        <div className="reviewMovieInfo">
                                            <img src={`${modalData.posterUrl}`} alt="영화 포스터" />
                                            <div>
                                                <p>{modalData.title}</p>
                                                <p>{modalData.director}</p>
                                                <p>{modalData.actors}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='submitReview'>
                                        <form onSubmit={mySubmit}>
                                            <textarea
                                                name="review"
                                                placeholder="리뷰를 적어주세요."
                                                onChange={onChange}
                                                autoComplete="off"
                                            />
                                            <button onClick={() => showResult()}>게시</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
            case 'complete':
                return (
                    <div className="modal-container" onClick={onClose}>
                        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                            <div className="modal-body">
                                <div className='movieModal'>
                                    <div>
                                        포스터이미지
                                        리뷰작성완료
                                        리뷰보러가기버튼
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        renderContent()
    )
}

export default Modal
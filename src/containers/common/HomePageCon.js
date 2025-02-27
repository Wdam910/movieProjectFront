import { useEffect, useState } from "react"
import HomePageCom from "../../components/mainPage/HomePageCom"
import { getInfoList, getSearchList} from "../../service/review"
import { useNavigate } from "react-router-dom"

const HomePageCon = () => {
    const navigate = useNavigate()
    const [list, setList] = useState([]);
    const [Infolist, setInfolist] = useState([])
    const [infoId, setInfoId] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getSearchList("")
                setList(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        if (!infoId) return
        const getInfo = async () => {
            try {
                const data = await getInfoList(infoId);
                setInfolist(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getInfo()
    }, [infoId])

    const getRelatedMovies = (names) => {
        const cleanedNames = names
            .split(",")
            .map(name => name.trim())
            .filter(name => name.length > 0)

        return list.filter(movie => {
            const director = movie.director || ''
            const actors = movie.actors || ''
            return cleanedNames.some(name =>
                director.includes(name) || actors.includes(name)
            )
        })
    }

    const onClick = () => {
        navigate("/ticket_date")
    }

    const showInfo = (movieId) => {
        setInfoId(movieId)
        setModalType("detail")
        setIsModalOpen(true)
    }

    const hideInfo = () => {
        setIsModalOpen(false)
        setModalType(null)
    }

    const relatedList = Infolist.length > 0
        ? getRelatedMovies(Infolist[0].director + ',' + Infolist[0].actors)
        : []

    // rank를 기준으로 필터링 및 날짜와 순위를 분리하여 처리
    const today = new Date()
    const TopMovies = list
        .map(movie => {
            console.log("무비랭크",movie.movieRank)
            const [date, rank] = movie.movieRank.split("-") // 날짜-순위 분리 
            const movieDate = new Date(date)
            return {
                ...movie,
                movieDate,
                movieRank: parseInt(rank),
            };
        })
        .filter(movie => movie.movieRank <= 5) // 순위 5 이하인 영화들만 필터링
        .sort((a, b) => {
            const diffA = Math.abs(today - a.movieDate)
            const diffB = Math.abs(today - b.movieDate)
            return diffA - diffB; // 날짜가 오늘에 가장 가까운 영화부터 정렬
        })
        .slice(0, 5) // 상위 5개의 영화만 선택

    // Top5Movies를 제외한 나머지 영화들
    const topMovieIds = new Set(TopMovies.map(movie => movie.movieId))

    const RestMovies = list
    .filter(movie => !topMovieIds.has(movie.movieId)) // TopMovies에 없는 영화만 남김
    .map(movie => {
        const [date, rank] = movie.movieRank.split("-")
        const movieDate = new Date(date);
        return {
            ...movie,
            movieDate,
            movieRank: parseInt(rank),
        }
    })
    .sort((a, b) => {
        const diffA = Math.abs(today - a.movieDate)
        const diffB = Math.abs(today - b.movieDate)
        return diffA - diffB; // 날짜가 오늘에 가장 가까운 영화부터 정렬
    })
    
    return (
        <HomePageCom TopMovies={TopMovies} RestMovies={RestMovies} Infolist={Infolist} infoId={infoId} showInfo={showInfo} hideInfo={hideInfo} onClick={onClick}
        relatedList={relatedList} isModalOpen={isModalOpen} modalType={modalType} />
    )
}

export default HomePageCon;
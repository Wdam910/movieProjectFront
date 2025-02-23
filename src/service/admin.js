import axios from "axios"

const BASE_URL = "http://localhost:8080/root/admin"

// 영화 정보 업데이트
const updateMovie = async (movieData) => {
    try {
        const res = await axios.put(`${BASE_URL}/edit_movie`, movieData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        return res.data
    } catch (error) {
        console.error("영화 정보 업데이트 실패: ", error)
        throw error
    }
}

//영화 정보 수동 업데이트
const updateMovieManual = async () => {
    try {
       await axios.post(`${BASE_URL}/movie/popular`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
    } catch (error) {
        console.error("영화 정보 업데이트 실패: ", error)
        throw error
    }
}

// 영화 이미지 업로드 (포스터 or 스틸컷)
const uploadMovieImage = async (formData) => {
    try {
        const res = await axios.post(`${BASE_URL}/upload_movie_image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return res.data;
    } catch (error) {
        console.error("영화 이미지 업로드 실패: ", error)
        throw error
    }
};

export { updateMovie, updateMovieManual, uploadMovieImage }
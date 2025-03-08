import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login.css';
import axios from 'axios';

const SignUpCom = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userName, setUserName] = useState('');
    const [userBirthday, setUserBirthday] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        // script 태그를 동적으로 추가
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
        // cleanup: 컴포넌트가 언마운트될 때 script 제거
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // 주소 검색 기능
    const handlePostcodeSearch = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                let addr = ''; // 주소 변수

                if (data.userSelectedType === 'R') { // 도로명 주소
                    addr = data.roadAddress;
                } else { // 지번 주소
                    addr = data.jibunAddress;
                }

                setPostcode(data.zonecode);
                setAddress(addr);
                setDetailAddress(''); // 상세주소는 빈 값으로 초기화
            }
        }).open();
    };

    // 회원가입 처리 함수
    const handleSignUp = async () => {
        // 비밀번호 확인
        if (password !== confirmPassword) {
            setErrorMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        // 생년월일을 yyyyMMdd 형식의 숫자로 변환
        const birthdayNumber = userBirthday.replace(/-/g, '');

        try {
            const memberData = {
                userId: userId,
                password: password,
                confirmPassword: confirmPassword,
                userName: userName,
                email: email,
                phoneNumber: phoneNumber,
                postNum: postcode,
                addr: address,
                detailAddr: detailAddress,
                userBirthday: birthdayNumber
            };
            //console.log('회원가입 데이터:', memberData); // 데이터를 콘솔에 출력

            const response = await axios.post('http://localhost:8080/root/register', memberData);
            if (response.status === 200) {
                alert("회원가입이 완료되었습니다.");
                navigate('/login'); // 로그인 페이지로 이동
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.error("회원가입 실패:", error.response.data); // 서버 응답 확인 (콘솔 출력)
                setErrorMessage(error.response.data.message); // 화면에 에러 메시지 표시
            } else {
                console.error("회원가입 요청 중 오류 발생:", error); // 요청 자체가 실패한 경우
                setErrorMessage("서버 오류로 인해 회원가입에 실패했습니다.");
            }
        }
    };

    return(
        <div className='login_body'>
        <div className='sign'>
            <div className='title_movie'>THEFILLM</div>
            <div className='login_from'>
                <div>
                    <input type="text" className='input_text' placeholder="아이디" value={userId} onChange={(e) => setUserId(e.target.value)} required />
                    <span className='addrBtn'>
                        <input 
                                type={passwordVisible ? "text" : "password"} 
                                className='addr_text' 
                                placeholder="비밀번호" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}>
                                <img src={passwordVisible ? '../../img/pwdHide.png' : '../../img/pwdOpen.png'} alt="toggle visibility" />
                            </button>
                    </span>
                    <span className='addrBtn'>
                            <input 
                                type={confirmPasswordVisible ? "text" : "password"} 
                                className='addr_text' 
                                placeholder="비밀번호 확인" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                            />
                            <button type="button" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                                <img src={confirmPasswordVisible ? '../../img/pwdHide.png' : '../../img/pwdOpen.png'} alt="toggle visibility" />
                            </button>
                    </span>
                    <input type="text" className='input_text' placeholder="닉네임" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                    <input type="email" className='input_text' placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <input type="tel" className='input_text' placeholder="연락처" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    <span className='addrBtn'>
                        <input type="text" className="addr_text" value={postcode} placeholder="우편번호 찾기" readOnly />
                        <button type="button" onClick={handlePostcodeSearch}><img src='../../img/search.png'/></button>
                    </span>
                    <input type="text" className="input_text" value={address} placeholder="주소" readOnly />
                    <input type="text" className="input_text" value={detailAddress} placeholder="상세주소" onChange={(e) => setDetailAddress(e.target.value)} />
                    <input type="text" className="input_text" value={userBirthday} placeholder="생년월일" onChange={(e) => setUserBirthday(e.target.value)} onFocus={(e) => (e.target.type = "date")} // 클릭 시 달력 표시
                    onBlur={(e) => (e.target.type = "text")}  // 포커스 해제 시 다시 placeholder 표시
                    required />
                </div>
            </div>
            <div className="sign_btn_container">
                <button className="sign_btn" onClick={handleSignUp}>Sign up</button>
            </div>
            <div className="sign_btn_container">
            {errorMessage && 
                <div className="error_message" key={errorMessage}>
                    {errorMessage}
                </div>}
            </div>
        </div>
        <div className='backgroundImg'/>
    </div>
    );
};

export default SignUpCom;
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import axios from 'axios';

// axios 인스턴스 생성
export const userApis = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

// 액세스토큰 재발급받는 함수
async function postRefreshToken() {
  try {
    const refreshToken = window.localStorage.getItem('userRefreshToken');
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/member/token`,
      {},
      {
        headers: {
          refreshToken,
        },
      }
    );

    // 서버로부터 받은 데이터에 accessToken이 있다면 return
    if (data.data.accessToken) {
      const newAccessToken = data.data.accessToken;
      const newRefreshToken = data.data.refreshToken;

      return { newAccessToken, newRefreshToken };
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}

// request를 보내기 전에 가로채서 헤더에 토큰을 넣어준다.
// 기본 형태 axios.interceptor.request.use(onFulfilled, onRejected)
// onFullfilled에서 에러가 발생하면 onRejected가 실행되고
// onRejected가 실행되면 request가 이루어지지않고 즉시 종료된다.
userApis.interceptors.request.use(
  (config: any) => {
    // 요청을 보내기 전에 수행할 일
    // localstorage에 저장한 액세스토큰 가져오기
    const userAccessToken = window.localStorage.getItem('userAccessToken');

    // 엑세스토큰이 없다면 로그인으로 라우팅, 있다면 header에 넣어주기
    if (!userAccessToken) {
      window.location.href = '/login';
      return;
    }
    config.headers.accessToken = `${userAccessToken}`;

    return config;
  },
  // onFullfilled가 실행되었을 때 에러가 나면 실행될 처리함수
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor를 사용한 토큰 갱신 로직
userApis.interceptors.response.use(
  (res) => res, // 응답이 성공적인 경우 아무것도 하지 않음
  // 에러 응답이 돌아왔을 때, err.response.message에 담긴 메세지가 토큰 관련 메세지였을때 처리해줄 로직
  async (err) => {
    // 토큰 검사 실패 시 리프레쉬토큰을 보내서 액세스토큰을 새롭게 발급받는다.
    if (err.response.data.code === 1050) {
      const response = await postRefreshToken(); // 액세스토큰 갱신을 위한 post 요청

      // response에 담긴 accessToken, refreshToken을 다시 저장한다
      if (response) {
        window.localStorage.setItem('userAccessToken', response.newAccessToken);
        window.localStorage.setItem(
          'userRefreshToken',
          response.newRefreshToken
        );
        // 원래 api 요청의 headers의 accessToken변경
        err.config.headers.accessToken = response.newAccessToken;
        // 원래 요청을 다시 날려준다!
        const originalResponse = await axios.request(err.config);
        return originalResponse; // 원래 api 요청의 response return
      }
      // 리프레시 토큰도 만료되었다면 login페이지로 이동
      window.localStorage.removeItem('userAccessToken');
      window.localStorage.removeItem('userRefreshToken');
      window.localStorage.removeItem('nickname');
      window.location.href = '/login';
      // 리프레쉬토큰 유효하지 않을때 로그인으로 라우팅
    } else if (err.response.data.code === 1051) {
      window.localStorage.removeItem('userAccessToken');
      window.localStorage.removeItem('userRefreshToken');
      window.localStorage.removeItem('nickname');
      window.location.href = '/login';
    }

    return Promise.reject(err);
  }
);

// data.js
const sitePool = [
  {
    id: 1,
    siteName: "Google",
    genuineUrl: "https://www.google.com/login",
    phishingUrl: "https://www.goog1e.com/login",
    phishingReason: "알파벳 'l' 대신 숫자 '1' 사용",
    contentHtml: `<div style="color:#4285F4; font-size:28px; font-weight:bold; text-align:center;">G<span style="color:#EA4335">o</span><span style="color:#FBBC05">o</span>g<span style="color:#34A853">l</span><span style="color:#EA4335">e</span></div>
                  <p style="margin: 10px 0; font-size:13px; color:#202124; text-align:center;">로그인 계정 보호 인터페이스</p>
                  <input type="text" placeholder="이메일 또는 전화번호" disabled style="width:100%; padding:10px; border:1px solid #dadce0; border-radius:4px;">`
  },
  {
    id: 2,
    siteName: "YouTube",
    genuineUrl: "https://www.youtube.com",
    phishingUrl: "https://www.youtvbe.com",
    phishingReason: "알파벳 'u' 대신 'v' 사용",
    contentHtml: `<div style="color:#FF0000; font-size:24px; font-weight:bold; text-align:center;">🛑 YouTube</div>
                  <p style="margin:10px 0; font-size:12px; color:#606060; text-align:center;">인기 급상승 동영상 플레이어</p>
                  <div style="background:#f2f2f2; height:50px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:11px; color:#888;">동영상 미리보기 컴포넌트</div>`
  },
  {
    id: 3,
    siteName: "ChatGPT",
    genuineUrl: "https://chat.openai.com",
    phishingUrl: "https-chat.openai.com",
    phishingReason: "잘못된 주소 형식",
    contentHtml: `<div style="color:#74AA9C; font-size:24px; text-align:center; font-weight:bold;">🟢 OpenAI ChatGPT</div>
                  <p style="font-size:13px; margin:10px 0; color:#666; text-align:center;">무엇을 도와드릴까요?</p>
                  <div style="background:#f4f4f4; border:1px solid #e3e3e3; border-radius:8px; padding:10px; font-size:11px; color:#999;">Message ChatGPT...</div>`
  },
  {
    id: 4,
    siteName: "Gemini",
    genuineUrl: "https://gemini.google.com",
    phishingUrl: "https://gemini.google,com",
    phishingReason: ".com 대신 ,com 사용",
    contentHtml: `<div style="background: linear-gradient(45deg, #4285f4, #9b51e0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size:24px; font-weight:bold; text-align:center;">✦ Gemini</div>
                  <p style="font-size:12px; color:#4a4a4a; text-align:center; margin-top:5px;">Google 고성능 차세대 AI 솔루션</p>`
  },
  {
    id: 5,
    siteName: "Instagram",
    genuineUrl: "https://www.instagram.com",
    phishingUrl: "https://www.lnstagram.com",
    phishingReason: "대문자 'I' 대신 소문자 'l' 사용",
    contentHtml: `<h3 style="font-style:italic; font-size:26px; text-align:center; margin-bottom:10px; font-family:serif;">Instagram</h3>
                  <input type="text" placeholder="사용자 이름, 비밀번호" disabled style="width:100%; padding:8px; background:#fafafa; border:1px solid #dbdbdb; border-radius:3px; font-size:11px; margin-bottom:5px;">
                  <button style="width:100%; background:#0095f6; color:white; padding:5px; border:none; border-radius:4px; font-size:12px;">로그인</button>`
  },
  {
    id: 6,
    siteName: "Zoom",
    genuineUrl: "https://zoom.us/join",
    phishingUrl: "https://zoom.us.join",
    phishingReason: "/join 대신 .join 사용",
    contentHtml: `<div style="color:#0B5CFF; font-size:24px; font-weight:bold; text-align:center;">zoom</div>
                  <p style="font-size:12px; margin:8px 0; color:#232333; text-align:center;">원격 화상 회의 시스템 참가</p>
                  <input type="text" placeholder="회의 ID 입력" disabled style="width:100%; padding:8px; border:1px solid #747487; border-radius:6px; font-size:12px;">`
  },
  {
    id: 7,
    siteName: "Netflix",
    genuineUrl: "https://www.netflix.com",
    phishingUrl: "https://www.neflix.com",
    phishingReason: "넷플릭스 알파벳 't' 누락",
    contentHtml: `<div style="color:#E50914; font-size:26px; font-weight:black; text-align:center; letter-spacing:-1px;">NETFLIX</div>
                  <p style="font-size:12px; text-align:center; margin:8px 0;">영화, 시리즈 프리미엄 스트리밍</p>
                  <button style="background:#E50914; color:white; padding:8px; width:100%; border:none; border-radius:4px; font-weight:bold; font-size:11px;">시작하기</button>`
  },
  {
    id: 8,
    siteName: "Naver",
    genuineUrl: "https://www.naver.com",
    phishingUrl: "https://www.navar.com",
    phishingReason: "알파벳 'e' 대신 'a' 사용",
    contentHtml: `<div style="color:#03C75A; font-size:24px; font-weight:black; text-align:center;">NAVER</div>
                  <div style="width:100%; height:32px; border:2px solid #03C75A; border-radius:4px; margin-top:10px; display:flex; align-items:center; padding-left:10px; color:#999; font-size:11px;">네이버 검색창 구현체</div>`
  },
  {
    id: 9,
    siteName: "Daum",
    genuineUrl: "https://www.daum.net",
    phishingUrl: "https://www.daurn.net",
    phishingReason: "알파벳 'm' 대신 'r'과 'n'을 붙여 사용 (rn)",
    contentHtml: `<div style="font-size:22px; font-weight:bold; text-align:center;"><span style="color:#191919">Daum</span></div>
                  <div style="margin-top:10px; background:#fee500; color:#191919; padding:8px; border-radius:6px; font-size:12px; font-weight:bold; text-align:center;">카카오 계정 통합 로그인</div>`
  }
];
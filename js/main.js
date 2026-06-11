/* main.js */
let currentRound = 0;
let userName = "";
let startTime = 0;
let timerInterval = null;
let results = [];
let appliedCluesList = []; 

// 적정 난이도 단서 풀 (중상급 난이도)
// 1. color-shift: 버튼 색상이 확연히 어두워짐 (#3b82f6 -> #1e3a8a)
// 2. nav-text: 상단 메뉴 스펠링 누락 (Services -> Service)
// 3. spacing: 로그인 박스 하단 여백이 2배 이상 넓어짐 (30px -> 70px)
// 4. footer-text: 하단 회사명 표기법 변경 (Corporation -> Corp.)
const mediumClues = ["color-shift", "nav-text", "spacing", "footer-text"];

// 라운드 구성
const roundsData = [
    { brand: "SECURE BANK", stimulus: "low",  origUrl: "https://securebank.com", isPhish: true },
    { brand: "GLOBAL PAY",  stimulus: "high", origUrl: "https://globalpay.com",  isPhish: true },
    { brand: "AMAZON KR",   stimulus: "low",  origUrl: "https://amazon.co.kr",   isPhish: false },
    { brand: "PORTAL LOGIN",stimulus: "high", origUrl: "https://portal-login.net",isPhish: true },
    { brand: "NETSTREAM",   stimulus: "low",  origUrl: "https://netstream.com",  isPhish: true },
    { brand: "WORKSPACE",   stimulus: "high", origUrl: "https://workspace.io",   isPhish: false }
];

function showInstructions() {
    userName = document.getElementById('user-name').value.trim();
    if(!userName) return alert("이름을 입력해주세요.");
    document.getElementById('intro').classList.remove('active');
    document.getElementById('instructions').classList.add('active');
}

function startExperiment() {
    document.getElementById('instructions').classList.remove('active');
    document.getElementById('experiment').classList.add('active');
    document.getElementById('display-name').innerText = userName;
    loadRound();
}

function loadRound() {
    if(currentRound >= roundsData.length) return endExperiment();
    
    const data = roundsData[currentRound];
    document.getElementById('round-num').innerText = currentRound + 1;
    
    // 자극 표시 및 배경 변경
    const stimBadge = document.getElementById('stimulus-text');
    stimBadge.innerText = data.stimulus === "high" ? "강한 자극 (High)" : "약한 자극 (Low)";
    stimBadge.style.color = data.stimulus === "high" ? "#e11d48" : "#3b82f6";
    document.body.className = data.stimulus === "high" ? "bg-flashy" : "bg-white";

    appliedCluesList = [];

    if (data.isPhish) {
        // 4개의 단서 중 무작위로 1~2개 추출
        const shuffled = [...mediumClues].sort(() => 0.5 - Math.random());
        const cluesCount = Math.floor(Math.random() * 2) + 1; 
        appliedCluesList = shuffled.slice(0, cluesCount);
    }

    document.getElementById('orig-url').value = data.origUrl;
    document.getElementById('target-url').value = data.origUrl; 
    
    renderUI('original-ui', data, []); // 원본 렌더링
    renderUI('target-ui', data, appliedCluesList); // 테스트 대상 렌더링

    startTime = Date.now();
    startTimer();
}

function renderUI(containerId, data, activeClues) {
    const container = document.getElementById(containerId);
    
    // [기본 상태 변수] - 정상 사이트 기준
    let btnColor = "#3b82f6";       
    let navServiceText = "Services"; 
    let boxPaddingBottom = "30px";  
    let footerCorpText = "Corporation"; 

    // [단서 적용] - 살짝 낮춘 난이도 (변화폭을 키움)
    if (activeClues.includes("color-shift")) btnColor = "#1e3a8a"; // 확연히 어두운 남색
    if (activeClues.includes("nav-text")) navServiceText = "Service"; // s 누락
    if (activeClues.includes("spacing")) boxPaddingBottom = "70px"; // 여백이 확 넓어짐
    if (activeClues.includes("footer-text")) footerCorpText = "Corp."; // 단어 길이 자체가 달라짐

    container.innerHTML = `
        <div style="padding: 15px 30px; display: flex; justify-content: space-between; border-bottom: 1px solid #f1f3f5; font-size: 14px; font-weight: 600; color: #555;">
            <span>${data.brand}</span>
            <div style="display:flex; gap: 20px;">
                <span>Home</span>
                <span>${navServiceText}</span>
                <span>About Us</span> 
            </div>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h2 style="font-size: 38px; font-weight: 800; color: #111; margin-bottom: 8px;">Sign In</h2>
            <p style="color: #888; margin-bottom: 40px; font-size: 15px;">Continue to ${data.brand}</p>
            
            <div style="width: 320px; padding: 30px 30px ${boxPaddingBottom} 30px; border: 1px solid #e9ecef; border-radius: 12px; background: #fafafa; transition: padding 0.2s;">
                <div style="height: 45px; background: #fff; border: 1px solid #ddd; border-radius: 6px; margin-bottom: 15px;"></div>
                <div style="height: 45px; background: #fff; border: 1px solid #ddd; border-radius: 6px; margin-bottom: 25px;"></div>
                <button style="width: 100%; padding: 14px; background: ${btnColor}; color: #fff; border: none; border-radius: 6px; font-weight: 700; font-size: 16px;">Secure Login</button>
            </div>
        </div>

        <div style="padding: 20px; text-align: center; background: #f8f9fa; border-top: 1px solid #f1f3f5; font-size: 12px; color: #aaa;">
            <p>Privacy Policy | Terms of Service</p>
            <p style="margin-top: 5px;">Copyright © 2024 ${data.brand} ${footerCorpText}. All rights reserved.</p>
        </div>
    `;
}

function startTimer() {
    if(timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        document.getElementById('timer').innerText = ((Date.now() - startTime) / 1000).toFixed(1);
    }, 100);
}

function triggerDetection(decision) {
    clearInterval(timerInterval);
    const data = roundsData[currentRound];
    const isCorrect = (decision === 'phishing' && data.isPhish) || (decision === 'normal' && !data.isPhish);
    
    const clueNames = appliedCluesList.length > 0 ? appliedCluesList.join(' & ') : '없음 (정상)';

    results.push({
        round: currentRound + 1,
        brand: data.brand,
        stimulus: data.stimulus,
        clues: clueNames,
        result: isCorrect ? "✅ 정답" : "❌ 오답",
        time: ((Date.now() - startTime) / 1000).toFixed(2)
    });

    currentRound++;
    loadRound();
}

function endExperiment() {
    document.getElementById('experiment').classList.remove('active');
    document.getElementById('results').classList.add('active');
    document.body.className = "bg-white";

    const tbody = document.querySelector('#result-table tbody');
    results.forEach(res => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${res.round}</td>
            <td><strong>${res.brand}</strong></td>
            <td>${res.stimulus}</td>
            <td style="font-size: 13px; color: #555;">${res.clues}</td>
            <td style="color: ${res.result.includes('정답') ? '#10b981' : '#e11d48'}; font-weight: bold;">${res.result}</td>
            <td>${res.time}s</td>
        `;
        tbody.appendChild(tr);
    });
}

function downloadCSV() {
    let csvContent = "\uFEFF"; 
    csvContent += "라운드,브랜드,자극수준,단서유형,판독결과,소요시간(초)\n";
    results.forEach(res => {
        let cleanResult = res.result.replace(/[✅❌] /g, '');
        csvContent += `${res.round},${res.brand},${res.stimulus},${res.clues},${cleanResult},${res.time}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    
    const safeUserName = userName ? userName : "unknown";
    link.setAttribute("download", `Advanced_Phishing_Exp_${safeUserName}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
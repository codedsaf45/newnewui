async function sendUserMessage() {
    const userMessage = msgerInput.value.trim(); // 입력 필드 값 가져오기
    if (!userMessage) return; // 빈 메시지는 무시
  
    appendMessage(PERSON_NAME, PERSON_IMG, "right", userMessage); // 사용자 메시지 표시
    msgerInput.value = ""; // 입력 필드 초기화
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/userinput', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const data = await response.json();
      const botResponse = data.botMessage; // 서버에서 응답받은 메시지
  
      appendMessage(BOT_NAME, BOT_IMG, "left", botResponse); // 봇 메시지 표시
    } catch (error) {
      console.error("Error during sending message:", error);
      appendMessage(BOT_NAME, BOT_IMG, "left", "오류가 발생했습니다. 다시 시도해주세요."); // 오류 메시지 표시
    }
  }

  
  // 이건 메시지를 프론트엔드에 표시하는 함수
  function appendMessage(name, img, side, text) {
    const msgHTML = `
      <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
  
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${formatDate(new Date())}</div>
          </div>
  
          <div class="msg-text">${text}</div>
        </div>
      </div>
    `;
  
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
  }
  // 이건 응답을 받는 합수들
  async function sendUserInput() {
    const response = await fetch('http://127.0.0.1:8000/UserInput', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
  
    const data = await response.json();
    const userMessage = data.usermessage;
    
    console.log("User Message:", data.usermessage);
    appendMessage(PERSON_NAME, PERSON_IMG, "right", userMessage);
  
    
  }
  
  async function sendGptOutput() {
    const response = await fetch('http://127.0.0.1:8000/gptOutput', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
  
    const data = await response.json();
    const botMessage = data.gptresponse;
    console.log("GPT Response:", data.gptresponse);
    appendMessage(BOT_NAME, BOT_IMG, "left", botMessage);
    
  }
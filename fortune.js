"use strict";
// 1行目に記載している "use strict" は削除しないでください
// 1: Think it through myself
// 2: check if it works 
// 3: note the essence for next time.

const tellingButton = document.getElementById("telling");
const tellingPairButton = document.getElementById("tellingPair");

const inputA = document.getElementById("birthA");
const inputB = document.getElementById("birthB");

const blueBox = document.querySelector(".blue");

const yearEl = document.getElementById("result-year");
const elementEl = document.getElementById("result-element");
const messageEl = document.getElementById("result-message");

tellingButton.addEventListener("click", tellOne);
tellingPairButton.addEventListener("click", tellPair);

function buildProfile(birth) {
  const numbers = birth.replace(/\D/g, "");
  if (numbers.length < 4) return null;

  const year = Number(numbers.slice(0, 4));

  const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

  const stem = heavenlyStems[(year - 4) % 10];
  const branch = earthlyBranches[(year - 4) % 12];

  const elementMap = {
    木: ["甲", "乙"],
    火: ["丙", "丁"],
    土: ["戊", "己"],
    金: ["庚", "辛"],
    水: ["壬", "癸"]
  };

  let element = "";
  for (const key in elementMap) {
    if (elementMap[key].includes(stem)) {
      element = key;
      break;
    }
  }

  const elementMessage = {
    木: "成長志向が強く、優しさと向上心を持つタイプ",
    火: "情熱的で行動力があり、周囲を巻き込むタイプ",
    土: "安定感があり、信頼される調整役タイプ",
    金: "意志が強く、決断力と責任感を持つタイプ",
    水: "知性と柔軟性があり、流れを読むタイプ"
  };

  return {
    yearPillar: `${stem}${branch}`,
    element,
    message: elementMessage[element]
  };
}



function tellOne() {
  blueBox.className = `blue`;
  const profile = buildProfile(inputA.value);

  if (!profile) {
    messageEl.textContent = "生年月日を正しく入力してください🔮";
    return;
  }

  yearEl.textContent = profile.yearPillar;
  elementEl.textContent = profile.element;
  messageEl.textContent = profile.message;

  blueBox.className = `blue ${profile.element}`;
}


function tellPair() {
  blueBox.className = `blue`;

  const profileA = buildProfile(inputA.value);
  const profileB = buildProfile(inputB.value);

  if (!profileA || !profileB) {
    messageEl.textContent = "2人分の生年月日を正しく入力してください🔮";
    return;
  }

  yearEl.textContent =
    `A：${profileA.yearPillar} / B：${profileB.yearPillar}`;

  elementEl.textContent =
    `A：${profileA.element} / B：${profileB.element}`;

  const compat =
    judgeCompatibility(profileA.element, profileB.element);

  messageEl.textContent =
    `相性スコア：${compat.score}点\n${compat.comment}`;

  messageEl.classList.remove("score-high", "score-mid", "score-low");

  if (compat.score >= 80) {
    messageEl.classList.add("score-high");
  } else if (compat.score >= 65) {
    messageEl.classList.add("score-mid");
  } else {
    messageEl.classList.add("score-low");
  }

  //blueBox.className = `blue`;
}


function judgeCompatibility(a, b) {
  const generates = {
    木: "火",
    火: "土",
    土: "金",
    金: "水",
    水: "木"
  };

  if (a === b) {
    return {
      score: 70,
      comment: "価値観が近く、安定した相性です。役割分担を意識するとさらに良好。"
    };
  }
  
  else if (generates[a] === b || generates[b] === a) {
    return {
      score: 85,
      comment: "相生の関係。お互いを自然に高め合える良い相性です。"
    };
  }
  
  return {
    score: 60,
    comment: "考え方の違いがある相性。尊重と対話が鍵になります。"
  };
}

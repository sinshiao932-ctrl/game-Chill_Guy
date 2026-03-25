const ROUNDS_PER_STAGE = 5;
const MAX_CLUES_AVAILABLE = 6;
const START_LIVES = 3;
const HEART_COST = 1;

const TYPE_LABELS = {
  human: "Người",
  monster: "Quái vật",
  fakeMonster: "Người giả quỷ"
};

const characterPool = [
  {
    id: 1,
    name: "Mai An",
    age: 28,
    role: "Y tá trực đêm",
    humanClues: [
      "Mùi cồn sát trùng còn rõ ở tay áo và cổ tay.",
      "Nhớ đúng vị trí ngăn thuốc hạ sốt trong tủ phụ.",
      "Giật vai rõ rệt khi cửa thép đóng mạnh phía sau.",
      "Khi nói nhanh thì hơi thở làm mờ lớp kính chắn trước miệng.",
      "Mu bàn tay có hai vết xước nông còn mới.",
      "Xin nước ấm và hỏi trong khu trú ẩn còn phòng y tế hoạt động không."
    ],
    monsterClues: [
      "Da bàn tay mát lạnh nhưng khô, không giống người vừa chạy đường dài.",
      "Giữ mắt mở quá lâu khi nghe câu hỏi trực diện.",
      "Đồng tử co rất chậm khi đèn pin rọi gần.",
      "Nghe tiếng kim loại đập mạnh nhưng gần như không giật mình.",
      "Lặp lại câu trả lời với đúng nhịp điệu như lần trước.",
      "Không thấy hơi nước bám đều trên kính chắn theo nhịp thở."
    ],
    fakeMonsterClues: [
      "Cố giữ ánh nhìn trân trân, nhưng vẫn chớp liên tiếp khi bị dọa bất ngờ.",
      "Bôi bẩn quanh mắt để trông hốc hác, nhưng da cổ và tai vẫn ấm và sạch.",
      "Ép giọng xuống khàn thấp, đôi lúc lại bật về đúng giọng bình thường.",
      "Cố đứng bất động, nhưng đầu ngón tay vẫn gõ nhẹ vì căng thẳng.",
      "Áo có vệt máu khô quệt lên ngoài mặt vải, không giống thấm từ trong ra.",
      "Sau mỗi câu trả lời đều liếc nhanh xem bạn có tin hay không."
    ]
  },
  {
    id: 2,
    name: "Trần Đức",
    age: 41,
    role: "Thợ điện khu dân cư cũ",
    humanClues: [
      "Đầu ngón tay có bụi than và mùi nhựa dây điện cháy.",
      "Nhớ đúng hộp điện phụ sau khu bếp.",
      "Biết cầu dao nào đã chập từ đêm hôm trước.",
      "Khi nhắc đến gia đình thì ánh mắt mất tập trung rõ rệt.",
      "Giày còn dính bùn loãng như vừa đi qua rãnh thoát nước.",
      "Vai hơi trĩu xuống như người đã làm việc nặng quá lâu."
    ],
    monsterClues: [
      "Trả lời đúng thông tin kỹ thuật nhưng đều giọng, không lên xuống tự nhiên.",
      "Không có phản xạ né khi tia sáng lia sát mặt.",
      "Da vùng cổ nhợt và lạnh hơn phần còn lại.",
      "Đứng rất ổn định dù nói mình kiệt sức.",
      "Khi nghe tiếng người khóc gần đó, biểu cảm không thay đổi.",
      "Không thấy nhịp thở rõ trên lớp kính chắn."
    ],
    fakeMonsterClues: [
      "Bôi tro lên mặt khá vụng, chỗ lau vội ở gò má vẫn lộ màu da thật.",
      "Tự tạo vài vết xước để trông dữ dằn, nhưng mép vết thương còn quá sạch.",
      "Nói mình không cần thở, nhưng kính chắn vẫn mờ nhẹ sau từng câu dài.",
      "Cố giữ nét mặt vô cảm, nhưng hàm siết lại khi nghe nhắc đến trẻ em.",
      "Nhìn chằm chằm hơi quá tay, rồi lại tránh mắt ngay khi bạn nhìn lại.",
      "Giọng cố ép trầm xuống, nhưng lúc đáp nhanh thì lộ chất giọng thật."
    ]
  },
  {
    id: 3,
    name: "Linh Chi",
    age: 19,
    role: "Sinh viên chạy nạn",
    humanClues: [
      "Ba lô bị đứt một quai, còn bám đất ẩm và bụi xi măng.",
      "Bàn tay run nhẹ khi cầm cốc nước.",
      "Phản xạ nheo mắt ngay khi đèn rọi trực diện.",
      "Nhớ chính xác lối tắt phía sau nhà kho cũ.",
      "Mắt đỏ và mí sưng như vừa khóc lâu.",
      "Vai co lên theo phản xạ khi nghe tiếng vật kim loại kéo lê."
    ],
    monsterClues: [
      "Trả lời trôi chảy quá mức, gần như không cần nghĩ.",
      "Nụ cười xuất hiện không đúng thời điểm của câu chuyện.",
      "Ánh mắt giữ ở một điểm quá lâu, ít đảo theo người đối diện.",
      "Không phản ứng mấy với tiếng gào vọng ngoài cửa.",
      "Da tay lạnh dù vừa nói mình chạy liên tục.",
      "Chớp mắt chậm và ít hơn bình thường."
    ],
    fakeMonsterClues: [
      "Tô quầng mắt quá đậm để trông đáng sợ, nhưng mồ hôi làm lem ở một bên má.",
      "Cố đứng lì không nhúc nhích, nhưng đầu gối vẫn run rất nhẹ.",
      "Nói mình không sợ ánh sáng, nhưng vẫn nheo mắt khi bị rọi đèn.",
      "Giữ một nụ cười gượng gạo quá lâu rồi nuốt nước bọt khi bạn tiến lại gần.",
      "Muốn tỏ ra đáng sợ, nhưng vẫn ôm chặt ba lô theo kiểu tự vệ.",
      "Sau vài câu bí hiểm lại lộ ra nhịp nói gấp của người đang hoảng."
    ]
  },
  {
    id: 4,
    name: "Huyền",
    age: 33,
    role: "Đầu bếp tình nguyện",
    humanClues: [
      "Tay áo ám mùi hành, nước dùng và khói bếp.",
      "Nhớ đúng món cháo loãng phát cho trẻ em tối trước.",
      "Cổ tay phải có vết bỏng cũ dạng bếp nấu.",
      "Mô tả rất cụ thể vị trí nồi, bếp và kho gạo.",
      "Mắt trũng xuống như người thiếu ngủ nhiều đêm.",
      "Vừa vào đã hỏi còn người nào trong khu bếp cần ăn không."
    ],
    monsterClues: [
      "Không phản ứng với cạnh khay kim loại còn nóng.",
      "Da đầu ngón tay mát lạnh dù nói đứng cạnh bếp nhiều giờ.",
      "Giọng đều, ít thay đổi ngay cả khi nhắc đến người bị thương.",
      "Khi cười, vùng mắt chuyển động chậm hơn khóe miệng.",
      "Ít chớp mắt hơn người bình thường.",
      "Không hiểu ngay cảm giác 'đói' khi bị hỏi ngược."
    ],
    fakeMonsterClues: [
      "Bôi chút muội bếp lên mặt để trông ghê hơn, nhưng mùi thức ăn nóng còn rất rõ.",
      "Cố giữ mặt lạnh, nhưng ánh mắt dịu đi ngay khi nghe nhắc tới trẻ nhỏ.",
      "Ép giọng xuống thấp, rồi vô thức quay về nhịp nói nhanh quen thuộc.",
      "Muốn tỏ ra không sợ nóng, nhưng vẫn rụt tay lại khi chạm khay kim loại.",
      "Giữ dáng đứng cứng quá mức, song vai vẫn lệch do mỏi sau khi khuân nồi.",
      "Tạo vẻ dữ dằn, nhưng vẫn hỏi trong trại còn đủ gạo cho sáng mai không."
    ]
  },
  {
    id: 5,
    name: "Khải",
    age: 31,
    role: "Lính gác bị thương",
    humanClues: [
      "Băng quấn tay phải đúng kỹ thuật nhưng đã hơi lỏng do vận động nhiều.",
      "Thở nặng hơn khi đổi tư thế hoặc nhấc vai.",
      "Xin nước ấm ngay sau khi ngồi xuống.",
      "Nhớ đúng chốt phụ và cách mở cửa dự phòng.",
      "Mắt đỏ, có dấu hiệu thiếu ngủ và hít khói.",
      "Khi nhắc tới đồng đội mất tích thì hàm khựng lại vài giây."
    ],
    monsterClues: [
      "Nói mình đau nhưng gần như không có phản xạ né khi cử động tay.",
      "Vết thương có nhưng không thấy thay đổi nhiều theo vận động.",
      "Đứng rất vững dù khai vừa mất sức vì mất máu.",
      "Giọng đều như đọc thuộc trước.",
      "Da quanh băng quấn lạnh hơn bình thường.",
      "Nhịp chớp mắt thưa và có độ trễ."
    ],
    fakeMonsterClues: [
      "Bôi thêm máu khô lên băng tay cho đáng sợ hơn, nhưng lớp quấn vẫn rất gọn.",
      "Cố đứng bất động, rồi vô thức lệch người để giảm đau.",
      "Giữ giọng rỗng và chậm, nhưng có lúc bật ra tiếng hít mạnh vì đau.",
      "Muốn không chớp mắt, nhưng vẫn giật mình khi bộ đàm ré lên gần tai.",
      "Cố tỏ ra vô cảm, nhưng nét mặt siết lại khi nghe nhắc tới chốt gác cũ.",
      "Giả hơi thở lạnh và đều, nhưng lúc đau tăng lên lại thở gấp như người thường."
    ]
  },
  {
    id: 6,
    name: "Vân",
    age: 26,
    role: "Kỹ thuật viên lọc nước",
    humanClues: [
      "Tay có cặn khoáng trắng mỏng bám ở đầu móng.",
      "Nhớ đúng bồn số 2 nằm bên trái khu lọc.",
      "Vai áo hơi ướt như vừa bị nước bắn lên.",
      "Biết van nào đang rò và đường ống nào áp thấp.",
      "Ho nhẹ khi nói lâu, giống người hít hơi clo loãng.",
      "Khi nghe nhắc đến trẻ em thiếu nước thì giọng căng hẳn lên."
    ],
    monsterClues: [
      "Móng tay sạch bất thường so với người vừa sửa ống.",
      "Dùng từ rất chuẩn nhưng cứng, như đọc lại bản mô tả hệ thống.",
      "Không phản ứng rõ với mùi clo ở khoảng cách gần.",
      "Da tay lạnh dù vừa ở khu máy nóng.",
      "Trả lời quá ổn định, gần như không ngập ngừng.",
      "Không thấy dấu hiệu khó chịu sinh lý khi đứng gần hơi nước nóng."
    ],
    fakeMonsterClues: [
      "Làm tóc bết và dán sát đầu để trông như mới bò ra từ chỗ tối, nhưng quần áo vẫn được chỉnh gọn.",
      "Cố nói giọng lạnh tanh, nhưng trả lời kỹ thuật lại quá tự nhiên và trôi chảy.",
      "Giả vờ không ngại mùi clo, rồi ho khan khi hít quá gần.",
      "Giữ ánh nhìn vô hồn, nhưng vẫn chớp theo phản xạ khi đèn đổi hướng.",
      "Muốn tỏ ra đáng sợ, nhưng vẫn vô thức lau tay bẩn vào ống quần.",
      "Nói vài câu ngắn kiểu hù dọa, rồi quay sang hỏi hệ thống nào cần sửa trước."
    ]
  },
  {
    id: 7,
    name: "Duyên",
    age: 44,
    role: "Giáo viên trung học",
    humanClues: [
      "Nói chậm, rõ, giống người quen trấn an học sinh.",
      "Nhớ tên vài đứa trẻ đang ở khu bếp.",
      "Ôm quyển sổ cũ khá chặt vào ngực.",
      "Tay run nhẹ khi cầm cốc nước.",
      "Nhớ chính xác số giường tạm ở phòng phía bắc.",
      "Khi nhắc đến lớp học cũ thì giọng ấm lên rõ rệt."
    ],
    monsterClues: [
      "Nắm rất rõ vị trí người trong trại nhưng không hiểu vì sao phải bảo vệ trẻ em.",
      "Gọi tiếng chuông báo cháy bằng một cách mô tả lệch hẳn cảm xúc thông thường.",
      "Cổ tay lạnh và nhợt bất thường.",
      "Khi cười, khóe miệng chuyển động sớm hơn phần mắt.",
      "Không quay đầu theo phản xạ khi nghe tiếng trẻ khóc gần.",
      "Giữ ánh nhìn quá lâu vào người đối diện."
    ],
    fakeMonsterClues: [
      "Cố giữ giọng đều và rỗng, nhưng đôi lúc lại lộ kiểu nói dịu như đang dạy học.",
      "Làm tóc rối để tăng vẻ bất thường, song cổ áo vẫn sửa quá ngay ngắn.",
      "Muốn tỏ ra không quan tâm, nhưng vẫn quay đầu khi nghe tiếng trẻ con.",
      "Giữ nụ cười lệch hơi quá tay, rồi bỏ đi ngay khi thấy bạn nhìn kỹ.",
      "Cố đứng yên lạnh lùng, nhưng tay vẫn siết quyển sổ do lo lắng.",
      "Nói câu bí hiểm, nhưng nội dung lại quá logic và rất người."
    ]
  },
  {
    id: 8,
    name: "An",
    age: 17,
    role: "Người đưa thư",
    humanClues: [
      "Thở nhanh như vừa chạy đường dài.",
      "Bàn tay có bụi giấy và sợi chỉ buộc thư.",
      "Rụt tay ngay khi chạm phải bề mặt nóng.",
      "Nhớ đúng con mèo tam thể hay quanh quẩn gần bếp.",
      "Vai co lên khi nghe tiếng cửa kim loại dội mạnh.",
      "Nhầm một tên hành lang rồi tự sửa lại ngay."
    ],
    monsterClues: [
      "Biết đường đi nhưng mô tả quá đều, thiếu ngập ngừng tự nhiên.",
      "Da tay lạnh dù vừa nói mình chạy không nghỉ.",
      "Không phản ứng mấy với nhiệt ở khoảng cách gần.",
      "Ánh mắt giữ rỗng và ít bám theo người đang hỏi.",
      "Nghe tiếng gào ngoài cửa nhưng gần như không đổi sắc mặt.",
      "Không thấy nhịp thở hiện rõ trên kính chắn."
    ],
    fakeMonsterClues: [
      "Cố cúi đầu và cười méo để trông dị dạng, nhưng bị gọi lớn là giật bắn lên.",
      "Bôi bụi lên mặt để tối hơn, mồ hôi lại kéo thành vệt lau rõ ràng.",
      "Ép giọng trầm xuống, nhưng chất giọng trẻ lộ ra ở cuối câu.",
      "Muốn tỏ ra không sợ đau, song vẫn rụt tay theo phản xạ khi chạm nóng.",
      "Cố đứng lì như đang rình, nhưng đầu gối run rất nhẹ.",
      "Giả vẻ vô hồn, nhưng mắt vẫn đảo nhanh để tìm đường thoát."
    ]
  }
];

const stageStories = {
  1: [
    "Ca kiểm tra bắt đầu. Người đầu tiên đứng trước bàn đèn.",
    "Một hồ sơ mới được đưa tới từ cửa ngoài.",
    "Bạn lật sang lượt tiếp theo và kiểm tra từng phản ứng nhỏ.",
    "Người trước mặt trả lời khá nhanh, nhưng chưa chắc đã đáng tin.",
    "Lượt cuối của chặng này khiến bạn phải nhìn kỹ hơn bình thường."
  ],
  2: [
    "Ca trực kéo dài, người được đưa vào bắt đầu mệt và khó đọc hơn.",
    "Ánh đèn hành lang không ổn định, việc quan sát trở nên khó hơn.",
    "Từ chặng này, cảm giác ban đầu rất dễ đánh lừa bạn.",
    "Nhiều hồ sơ bắt đầu có dấu hiệu cố che giấu điều gì đó.",
    "Bạn chỉ còn ít thời gian để quyết định đúng ở lượt cuối."
  ],
  3: [
    "Đêm đã sâu, sai một lần cũng có thể phải trả giá.",
    "Những người còn lại gần như không để lộ sơ hở lớn.",
    "Bạn buộc phải dựa vào chi tiết nhỏ và phản xạ tự nhiên.",
    "Mỗi câu trả lời đều cần được đối chiếu với hành vi thực tế.",
    "Lượt cuối cùng của chặng này đòi hỏi quyết định rất nhanh."
  ]
};

const state = {
  score: 0,
  coins: 0,
  lives: START_LIVES,
  level: 1,
  currentIndex: 0,
  currentRounds: [],
  timer: null,
  timeLeft: 30,
  isLocked: false,
  checkedCount: 0,
  shopOpen: false,
  boughtHeartThisStage: false
};

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const messageScreen = document.getElementById("message-screen");
const guideModal = document.getElementById("guide-modal");
const shopModal = document.getElementById("shop-modal");

const scoreValue = document.getElementById("score-value");
const levelValue = document.getElementById("level-value");
const livesValue = document.getElementById("lives-value");
const coinsValue = document.getElementById("coins-value");

const timerWrap = document.getElementById("timer-wrap");
const timerLabel = document.getElementById("timer-label");
const timerText = document.getElementById("timer-text");
const timerFill = document.getElementById("timer-fill");

const storyLine = document.getElementById("story-line");
const characterCard = document.getElementById("character-card");
const avatarIcon = document.getElementById("avatar-icon");
const characterName = document.getElementById("character-name");
const characterMeta = document.getElementById("character-meta");
const clueList = document.getElementById("clue-list");

const feedback = document.getElementById("feedback");
const humanBtn = document.getElementById("human-btn");
const monsterBtn = document.getElementById("monster-btn");
const fakeMonsterBtn = document.getElementById("fake-monster-btn");

const messageSubtitle = document.getElementById("message-subtitle");
const messageTitle = document.getElementById("message-title");
const messageText = document.getElementById("message-text");
const messageStats = document.getElementById("message-stats");
const messageBtn = document.getElementById("message-btn");

const shopBtn = document.getElementById("shop-btn");
const closeShopBtn = document.getElementById("close-shop-btn");
const buyHeartBtn = document.getElementById("buy-heart-btn");
const shopCoinsValue = document.getElementById("shop-coins-value");
const shopStageValue = document.getElementById("shop-stage-value");
const shopStatus = document.getElementById("shop-status");

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("guide-btn").addEventListener("click", openGuide);
document.getElementById("close-guide-btn").addEventListener("click", closeGuide);

humanBtn.addEventListener("click", () => handleChoice("human"));
monsterBtn.addEventListener("click", () => handleChoice("monster"));
fakeMonsterBtn.addEventListener("click", () => handleChoice("fakeMonster"));

shopBtn.addEventListener("click", openShop);
closeShopBtn.addEventListener("click", closeShop);
buyHeartBtn.addEventListener("click", buyHeart);

guideModal.addEventListener("click", (event) => {
  if (event.target === guideModal) closeGuide();
});

shopModal.addEventListener("click", (event) => {
  if (event.target === shopModal) closeShop();
});

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickRandomItems(array, count) {
  return shuffle(array).slice(0, Math.min(count, array.length));
}

function getStageTime(stage) {
  if (stage === 1) return 30;
  if (stage === 2) return 25;
  if (stage === 3) return 20;
  return 15;
}

function getClueCount(stage) {
  return Math.min(4 + (stage - 1), MAX_CLUES_AVAILABLE);
}

function randomType() {
  const roll = Math.random();
  if (roll < 0.34) return "human";
  if (roll < 0.67) return "monster";
  return "fakeMonster";
}

function getCluePool(character, type) {
  if (type === "human") return character.humanClues;
  if (type === "monster") return character.monsterClues;
  return character.fakeMonsterClues;
}

function buildRoundCharacter(baseCharacter, stage) {
  const actualType = randomType();
  const cluePool = getCluePool(baseCharacter, actualType);
  const clueCount = getClueCount(stage);

  return {
    id: baseCharacter.id,
    name: baseCharacter.name,
    age: baseCharacter.age,
    role: baseCharacter.role,
    type: actualType,
    clues: pickRandomItems(cluePool, clueCount)
  };
}

function buildStageRounds(stage) {
  return shuffle(characterPool)
    .slice(0, ROUNDS_PER_STAGE)
    .map((character) => buildRoundCharacter(character, stage));
}

function getCurrentCharacter() {
  return state.currentRounds[state.currentIndex];
}

function getRoleIcon(role) {
  const text = role.toLowerCase();

  if (text.includes("y tá") || text.includes("y tế")) return "⚕";
  if (text.includes("thợ điện")) return "⚡";
  if (text.includes("sinh viên")) return "🎒";
  if (text.includes("đầu bếp")) return "🍲";
  if (text.includes("lính gác")) return "🛡";
  if (text.includes("kỹ thuật")) return "🧪";
  if (text.includes("giáo viên")) return "📘";
  if (text.includes("đưa thư")) return "✉";
  return "◉";
}

function showScreen(screenElement) {
  [startScreen, gameScreen, messageScreen].forEach((screen) => {
    screen.classList.add("hidden");
  });
  screenElement.classList.remove("hidden");
}

function openGuide() {
  guideModal.classList.remove("hidden");
  guideModal.setAttribute("aria-hidden", "false");
}

function closeGuide() {
  guideModal.classList.add("hidden");
  guideModal.setAttribute("aria-hidden", "true");
}

function updateHUD() {
  scoreValue.textContent = state.score;
  levelValue.textContent = state.level;
  coinsValue.textContent = state.coins;

  const fullHearts = "❤️".repeat(Math.max(state.lives, 0));
  livesValue.textContent = fullHearts || "0";
}

function setDecisionButtonsDisabled(disabled) {
  humanBtn.disabled = disabled;
  monsterBtn.disabled = disabled;
  fakeMonsterBtn.disabled = disabled;
  shopBtn.disabled = disabled;
}

function clearFeedback() {
  feedback.textContent = "";
  feedback.className = "feedback";
}

function showFeedbackMessage(message, type) {
  feedback.textContent = message;
  feedback.className = `feedback show ${type}`;
}

function setMessageStats(items) {
  messageStats.innerHTML = items
    .map((item) => `<span class="stat-chip">${item}</span>`)
    .join("");
}

function updateTimerUI(maxTime) {
  const percent = Math.max((state.timeLeft / maxTime) * 100, 0);

  timerText.textContent = `${state.timeLeft}s`;
  timerFill.style.width = `${percent}%`;

  if (state.timeLeft <= 5) {
    timerFill.classList.add("danger");
  } else {
    timerFill.classList.remove("danger");
  }

  timerLabel.textContent = `Chặng ${state.level} - Lượt ${state.currentIndex + 1}/${ROUNDS_PER_STAGE}`;
}

function stopTimer() {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
}

function startTimer(reset = true) {
  stopTimer();

  const duration = getStageTime(state.level);
  if (reset) {
    state.timeLeft = duration;
  }

  updateTimerUI(duration);

  state.timer = setInterval(() => {
    state.timeLeft -= 1;
    updateTimerUI(duration);

    if (state.timeLeft <= 0) {
      stopTimer();
      handleTimeout();
    }
  }, 1000);
}

function getStoryLine() {
  const stories = stageStories[state.level] || [];
  return (
    stories[state.currentIndex] ||
    `Chặng ${state.level}, lượt ${state.currentIndex + 1}. Bạn phải kết luận nhanh và chính xác.`
  );
}

function renderCharacter() {
  const character = getCurrentCharacter();

  if (!character) {
    showStageSummary();
    return;
  }

  state.isLocked = false;
  setDecisionButtonsDisabled(false);
  clearFeedback();

  storyLine.textContent = getStoryLine();
  characterName.textContent = character.name;
  characterMeta.textContent = `${character.age} tuổi • ${character.role}`;
  avatarIcon.textContent = getRoleIcon(character.role);
  clueList.innerHTML = character.clues.map((clue) => `<li>${clue}</li>`).join("");

  timerWrap.classList.remove("hidden");
  startTimer(true);
}

function startGame() {
  state.score = 0;
  state.coins = 0;
  state.lives = START_LIVES;
  state.level = 1;
  state.currentIndex = 0;
  state.currentRounds = buildStageRounds(1);
  state.timeLeft = getStageTime(1);
  state.isLocked = false;
  state.checkedCount = 0;
  state.shopOpen = false;
  state.boughtHeartThisStage = false;

  closeGuide();
  closeShop(true);
  clearFeedback();
  updateHUD();
  showScreen(gameScreen);
  renderCharacter();
}

function handleChoice(choice) {
  if (state.isLocked || state.shopOpen) return;

  state.isLocked = true;
  setDecisionButtonsDisabled(true);
  stopTimer();

  const character = getCurrentCharacter();
  const isCorrect = choice === character.type;

  state.checkedCount += 1;

  if (isCorrect) {
    state.score += 1;
    updateHUD();

    if (choice === "human") {
      showFeedbackMessage("Đúng. Dấu hiệu quan sát khớp với phản ứng của người bình thường.", "correct");
    } else if (choice === "monster") {
      showFeedbackMessage("Đúng. Có nhiều chi tiết không khớp với con người.", "correct");
    } else {
      showFeedbackMessage("Đúng. Đây là người thật, nhưng đang cố tạo vẻ ngoài giống quỷ.", "correct");
    }
  } else {
    state.lives -= 1;
    updateHUD();
    characterCard.classList.add("shake");
    showFeedbackMessage(`Sai. Kết luận đúng là: ${TYPE_LABELS[character.type]}.`, "wrong");

    setTimeout(() => {
      characterCard.classList.remove("shake");
    }, 350);
  }

  setTimeout(() => {
    if (state.lives <= 0) {
      showGameOver();
      return;
    }
    nextCharacter();
  }, 1200);
}

function handleTimeout() {
  if (state.isLocked || state.shopOpen) return;

  state.isLocked = true;
  setDecisionButtonsDisabled(true);

  const character = getCurrentCharacter();

  state.lives -= 1;
  state.checkedCount += 1;
  updateHUD();

  characterCard.classList.add("shake");
  showFeedbackMessage(`Hết giờ. Kết luận đúng là: ${TYPE_LABELS[character.type]}.`, "neutral");

  setTimeout(() => {
    characterCard.classList.remove("shake");
  }, 350);

  setTimeout(() => {
    if (state.lives <= 0) {
      showGameOver();
      return;
    }
    nextCharacter();
  }, 1200);
}

function nextCharacter() {
  state.currentIndex += 1;
  renderCharacter();
}

function showStageSummary() {
  stopTimer();

  state.coins += 1;
  updateHUD();

  const nextStage = state.level + 1;
  const nextTime = getStageTime(nextStage);
  const nextClues = getClueCount(nextStage);

  showScreen(messageScreen);

  messageSubtitle.textContent = `Hoàn thành chặng ${state.level}`;
  messageTitle.textContent = "Bạn đã vượt qua chặng kiểm tra này.";
  messageText.textContent =
    "Bạn nhận được 1 xu. Chặng tiếp theo sẽ tiếp tục ngay sau khi bạn sẵn sàng.";

  setMessageStats([
    `+1 xu`,
    `Xu hiện có: ${state.coins}`,
    `Chặng ${nextStage}: ${nextTime} giây`,
    `Chặng ${nextStage}: ${nextClues} dấu hiệu`,
    `Tim còn lại: ${state.lives}`
  ]);

  messageBtn.textContent = `Sang chặng ${nextStage}`;
  messageBtn.onclick = () => {
    state.level = nextStage;
    state.currentIndex = 0;
    state.currentRounds = buildStageRounds(state.level);
    state.boughtHeartThisStage = false;
    updateHUD();
    showScreen(gameScreen);
    renderCharacter();
  };
}

function showGameOver() {
  stopTimer();
  closeShop(true);
  showScreen(messageScreen);

  messageSubtitle.textContent = "Kết thúc";
  messageTitle.textContent = "Bạn dừng lại tại đây.";
  messageText.textContent =
    "Bạn đã không thể tiếp tục ca kiểm tra. Hãy dùng số xu tích lũy được để tính toán tốt hơn ở lần chơi sau.";

  setMessageStats([
    `Điểm số: ${state.score}`,
    `Xu: ${state.coins}`,
    `Đã kiểm tra: ${state.checkedCount} hồ sơ`,
    `Dừng ở chặng: ${state.level}`
  ]);

  messageBtn.textContent = "Chơi lại";
  messageBtn.onclick = restartGame;
}

function restartGame() {
  stopTimer();
  closeShop(true);

  state.score = 0;
  state.coins = 0;
  state.lives = START_LIVES;
  state.level = 1;
  state.currentIndex = 0;
  state.currentRounds = [];
  state.timeLeft = getStageTime(1);
  state.isLocked = false;
  state.checkedCount = 0;
  state.shopOpen = false;
  state.boughtHeartThisStage = false;

  clearFeedback();
  updateHUD();
  showScreen(startScreen);
}

function updateShopUI() {
  shopCoinsValue.textContent = state.coins;
  shopStageValue.textContent = state.level;

  if (state.boughtHeartThisStage) {
    buyHeartBtn.disabled = true;
    shopStatus.textContent = "Bạn đã mua tim ở chặng này rồi.";
    return;
  }

  if (state.coins < HEART_COST) {
    buyHeartBtn.disabled = true;
    shopStatus.textContent = `Chưa đủ xu để mua tim. Cần ${HEART_COST} xu.`;
    return;
  }

  buyHeartBtn.disabled = false;
  shopStatus.textContent = "Bạn có thể mua 1 tim ở chặng này.";
}

function openShop() {
  if (state.isLocked || startScreen.classList.contains("hidden") === false || messageScreen.classList.contains("hidden") === false) {
    return;
  }

  state.shopOpen = true;
  stopTimer();
  updateShopUI();
  shopModal.classList.remove("hidden");
  shopModal.setAttribute("aria-hidden", "false");
}

function closeShop(force = false) {
  shopModal.classList.add("hidden");
  shopModal.setAttribute("aria-hidden", "true");
  state.shopOpen = false;

  if (force) return;

  const canResume =
    gameScreen.classList.contains("hidden") === false &&
    state.isLocked === false &&
    getCurrentCharacter();

  if (canResume) {
    startTimer(false);
  }
}

function buyHeart() {
  if (state.boughtHeartThisStage) {
    shopStatus.textContent = "Bạn đã mua tim ở chặng này rồi.";
    return;
  }

  if (state.coins < HEART_COST) {
    shopStatus.textContent = `Chưa đủ xu. Cần ${HEART_COST} xu để mua tim.`;
    return;
  }

  state.coins -= HEART_COST;
  state.lives += 1;
  state.boughtHeartThisStage = true;

  updateHUD();
  updateShopUI();
  shopStatus.textContent = "Mua thành công. Bạn nhận thêm 1 tim.";
}

updateHUD();
showScreen(startScreen);
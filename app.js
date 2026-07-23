"use strict";

const APP_VERSION = "2.0.0";
const STORAGE_KEY = "hogusu-v2-state";
const AUDIO_PATH = "./assets/audio/";
const IMAGE_PATH = "./assets/images/";

const exercises = [
  {
    title: "首のストレッチ（右）",
    category: "首・肩",
    seconds: 30,
    image: "01_neck_right.png",
    summary: "首の右側をゆっくり伸ばします。",
    tip: "右肩を上げず、痛みのない範囲で呼吸を続けます。",
    pair: "right"
  },
  {
    title: "首のストレッチ（左）",
    category: "首・肩",
    seconds: 30,
    image: "02_neck_left.png",
    summary: "首の左側をゆっくり伸ばします。",
    tip: "左肩を上げず、反動をつけずに伸ばします。",
    pair: "left"
  },
  {
    title: "胸のストレッチ",
    category: "胸・肩",
    seconds: 60,
    image: "03_chest.png",
    summary: "胸を斜め上へ向けるイメージで開きます。",
    tip: "腰を反らさず、肩甲骨を寄せたまま自然に呼吸します。"
  },
  {
    title: "キャット＆カウ",
    category: "背中・腰",
    seconds: 60,
    image: "04_cat_cow.png",
    summary: "呼吸に合わせて背骨をゆっくり動かします。",
    tip: "3秒ごとの音声に合わせ、反らす・丸めるを10回繰り返します。",
    catCow: true
  },
  {
    title: "お尻のストレッチ（右）",
    category: "お尻",
    seconds: 30,
    image: "05_glute_right.png",
    summary: "右のお尻と股関節まわりを伸ばします。",
    tip: "右足首を左膝に乗せ、左もも裏を胸へ引き寄せます。",
    pair: "right"
  },
  {
    title: "お尻のストレッチ（左）",
    category: "お尻",
    seconds: 30,
    image: "06_glute_left.png",
    summary: "左のお尻と股関節まわりを伸ばします。",
    tip: "左足首を右膝に乗せ、右もも裏を胸へ引き寄せます。",
    pair: "left"
  },
  {
    title: "開脚（股関節内側）",
    category: "股関節",
    seconds: 60,
    image: "07_adductor.png",
    summary: "股関節の内側をゆっくり伸ばします。",
    tip: "背筋を保ち、骨盤から前へ倒れるように行います。"
  },
  {
    title: "股関節前のストレッチ（左）",
    category: "股関節",
    seconds: 30,
    image: "08_hip_front_left.png",
    summary: "左脚を後ろにして、股関節の前を伸ばします。",
    tip: "腰を反らさず、骨盤をまっすぐ前へ送ります。",
    pair: "leftFirst"
  },
  {
    title: "股関節前のストレッチ（右）",
    category: "股関節",
    seconds: 30,
    image: "09_hip_front_right.png",
    summary: "右脚を後ろにして、股関節の前を伸ばします。",
    tip: "上体を起こし、後ろ脚の膝へ無理な力をかけません。",
    pair: "rightSecond"
  },
  {
    title: "太もも裏のストレッチ（右）",
    category: "脚",
    seconds: 30,
    image: "10_hamstring_right.png",
    summary: "右脚を前に伸ばし、太もも裏を伸ばします。",
    tip: "背中を丸めず、つま先を立てて股関節から前へ倒します。",
    pair: "right"
  },
  {
    title: "太もも裏のストレッチ（左）",
    category: "脚",
    seconds: 30,
    image: "11_hamstring_left.png",
    summary: "左脚を前に伸ばし、太もも裏を伸ばします。",
    tip: "伸びを感じるところで止め、反動をつけずに呼吸します。",
    pair: "left"
  },
  {
    title: "ふくらはぎのストレッチ（右）",
    category: "脚",
    seconds: 30,
    image: "12_calf_right.png",
    summary: "右脚を後ろへ引き、ふくらはぎを伸ばします。",
    tip: "右かかとを床につけ、つま先を正面へ向けます。",
    pair: "right"
  },
  {
    title: "ふくらはぎのストレッチ（左）",
    category: "脚",
    seconds: 30,
    image: "13_calf_left.png",
    summary: "左脚を後ろへ引き、ふくらはぎを伸ばします。",
    tip: "左かかとを床につけ、上体を軽く前へ倒します。",
    pair: "left"
  },
  {
    title: "背中・腰のストレッチ",
    category: "背中・腰",
    seconds: 30,
    image: "14_back_waist.png",
    summary: "両膝を抱え、背中から腰をゆっくり伸ばします。",
    tip: "首と肩の力を抜き、両膝を胸へやさしく引き寄せます。"
  },
  {
    title: "背中・腰ひねりのストレッチ",
    category: "背中・腰",
    seconds: 30,
    image: "15_back_twist.png",
    summary: "両膝を左右へ倒し、背中と腰をゆっくりひねります。",
    tip: "両肩を床につけたまま、痛みのない範囲で行います。"
  }
];

const audioFiles = {
  start: "001_start.mp3",
  ready: "002_ready.mp3",
  change: "010_change.mp3",
  prepare: "011_prepare.mp3",
  start5: "012_start5.mp3",
  countdown: {
    5: "020_5.mp3",
    4: "021_4.mp3",
    3: "022_3.mp3",
    2: "023_2.mp3",
    1: "024_1.mp3"
  },
  go: "025_go.mp3",
  rightFinish: "030_right_finish.mp3",
  leftStart: "031_left_start.mp3",
  leftFinish: "032_left_finish.mp3",
  next: "033_next.mp3",
  round: "040_round.mp3",
  arch: "041_arch.mp3",
  finishes: [
    "050_finish01.mp3",
    "051_finish02.mp3",
    "052_finish03.mp3",
    "053_finish04.mp3",
    "054_finish05.mp3"
  ],
  cheers: [
    "060_cheer01.mp3",
    "061_cheer02.mp3",
    "062_cheer03.mp3",
    "063_cheer04.mp3",
    "064_cheer05.mp3",
    "065_cheer06.mp3",
    "066_cheer07.mp3",
    "067_cheer08.mp3"
  ],
  milestones: {
    1: "070_day1.mp3",
    7: "071_day7.mp3",
    30: "072_day30.mp3",
    50: "073_day50.mp3",
    100: "074_day100.mp3",
    180: "075_day180.mp3",
    365: "076_day365.mp3"
  }
};

const defaultState = {
  bgm: "off",
  voiceEnabled: true,
  voiceVolume: 0.75,
  bgmVolume: 0.16,
  vibration: true,
  history: [],
  total: 0,
  milestonePlays: []
};

const $ = (id) => document.getElementById(id);
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

let state = loadState();
let currentIndex = 0;
let remaining = exercises[0].seconds;
let timerId = null;
let running = false;
let preparing = false;
let singleExercise = false;
let sessionToken = 0;
let courseElapsed = 0;
let cheerIndex = 0;
let catCowArch = true;
let muted = false;
let calendarOffset = 0;
let lastRenderedSecond = null;

const bgmAudio = $("bgmAudio");
const voiceAudio = $("voiceAudio");

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      ...defaultState,
      ...saved,
      history: Array.isArray(saved.history) ? saved.history : [],
      milestonePlays: Array.isArray(saved.milestonePlays) ? saved.milestonePlays : []
    };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateFromString(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function shiftDate(value, days) {
  const date = dateFromString(value);
  date.setDate(date.getDate() + days);
  return localDateString(date);
}

function uniqueHistory() {
  return [...new Set(state.history)].sort();
}

function streakCount() {
  const dates = uniqueHistory();
  if (!dates.length) return 0;
  const set = new Set(dates);
  const today = localDateString();
  let cursor = set.has(today) ? today : shiftDate(today, -1);
  if (!set.has(cursor)) return 0;
  let count = 0;
  while (set.has(cursor)) {
    count += 1;
    cursor = shiftDate(cursor, -1);
  }
  return count;
}

function monthCount(date = new Date()) {
  const prefix = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-`;
  return uniqueHistory().filter((value) => value.startsWith(prefix)).length;
}

function formatTime(seconds) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = String(safeSeconds % 60).padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.id === id);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderHome() {
  $("streakValue").textContent = streakCount();
  $("monthValue").textContent = monthCount();
  $("totalValue").textContent = state.total;
  document.querySelectorAll("[data-bgm]").forEach((button) => {
    button.classList.toggle("selected", button.dataset.bgm === state.bgm);
  });
  renderCalendar();
}

function renderCalendar() {
  const shown = new Date();
  shown.setDate(1);
  shown.setMonth(shown.getMonth() + calendarOffset);
  const year = shown.getFullYear();
  const month = shown.getMonth();
  const completed = new Set(uniqueHistory());
  const today = localDateString();
  const grid = $("calendarGrid");
  $("calendarMonth").textContent = `${year}年${month + 1}月`;
  grid.replaceChildren();

  for (let blank = 0; blank < new Date(year, month, 1).getDay(); blank += 1) {
    const cell = document.createElement("span");
    cell.className = "blank";
    cell.textContent = "0";
    grid.append(cell);
  }

  const days = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= days; day += 1) {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const cell = document.createElement("span");
    cell.textContent = day;
    if (completed.has(dateString)) cell.classList.add("done");
    if (dateString === today) cell.classList.add("today");
    grid.append(cell);
  }
}

function renderExerciseList() {
  $("exerciseList").innerHTML = exercises.map((exercise, index) => `
    <button type="button" data-exercise="${index}">
      <span class="number">${index + 1}</span>
      <span>
        <strong>${exercise.title}</strong>
        <small>${exercise.category}・${exercise.seconds}秒</small>
      </span>
      <b>▶</b>
    </button>
  `).join("");

  document.querySelectorAll("[data-exercise]").forEach((button) => {
    button.addEventListener("click", () => beginSession(true, Number(button.dataset.exercise)));
  });
}

function totalActiveRemaining() {
  if (singleExercise) return remaining;
  return exercises.slice(currentIndex).reduce((sum, exercise, index) => (
    sum + (index === 0 ? remaining : exercise.seconds)
  ), 0);
}

function renderExercise() {
  const exercise = exercises[currentIndex];
  const progress = singleExercise ? 100 : ((currentIndex + 1) / exercises.length) * 100;
  const timerProgress = (remaining / exercise.seconds) * 100;

  $("courseHeading").textContent = singleExercise ? "単独ストレッチ" : "全身コース";
  $("categoryLabel").textContent = exercise.category;
  $("exerciseTitle").textContent = exercise.title;
  $("exerciseSummary").textContent = exercise.summary;
  $("exerciseTip").textContent = exercise.tip;
  $("exerciseImage").src = `${IMAGE_PATH}${exercise.image}`;
  $("exerciseImage").alt = `${exercise.title}のやり方`;
  $("timeValue").textContent = remaining;
  $("timerStatus").textContent = preparing ? "準備" : running ? "残り時間" : remaining < exercise.seconds ? "一時停止" : "待機";
  $("stepCount").textContent = singleExercise ? "単独メニュー" : `${currentIndex + 1} / ${exercises.length}`;
  $("totalRemaining").textContent = `残り ${formatTime(totalActiveRemaining())}`;
  $("progressBar").style.width = `${progress}%`;
  $("timerRing").style.setProperty("--progress", `${timerProgress}%`);
  $("pauseButton").textContent = preparing ? "準備中" : running ? "一時停止" : remaining < exercise.seconds ? "再開" : "開始";
  $("pauseButton").disabled = preparing;
  $("previousStepButton").disabled = singleExercise || currentIndex === 0;
  $("nextStepButton").textContent = singleExercise || currentIndex === exercises.length - 1 ? "完了" : "次へ";
}

function stopTimer() {
  if (timerId) window.clearInterval(timerId);
  timerId = null;
  running = false;
}

function stopVoice() {
  voiceAudio.pause();
  voiceAudio.removeAttribute("src");
}

function vibrate(pattern = [90, 55, 110]) {
  if (state.vibration && navigator.vibrate) navigator.vibrate(pattern);
}

function playVoice(file) {
  if (!state.voiceEnabled || muted || !file) return Promise.resolve();
  return new Promise((resolve) => {
    voiceAudio.pause();
    voiceAudio.src = `${AUDIO_PATH}${file}`;
    voiceAudio.volume = state.voiceVolume;
    voiceAudio.playbackRate = 1;
    voiceAudio.onended = resolve;
    voiceAudio.onerror = resolve;
    voiceAudio.play().catch(resolve);
  });
}

function playVoiceQuick(file) {
  if (!state.voiceEnabled || muted || !file) return;
  voiceAudio.pause();
  voiceAudio.src = `${AUDIO_PATH}${file}`;
  voiceAudio.volume = state.voiceVolume;
  voiceAudio.playbackRate = 1.18;
  voiceAudio.play().catch(() => {});
}

async function playSequence(files, token) {
  for (const file of files) {
    if (token !== sessionToken) return false;
    await playVoice(file);
  }
  return token === sessionToken;
}

function setBgm(choice) {
  state.bgm = choice;
  saveState();
  document.querySelectorAll("[data-bgm]").forEach((button) => {
    button.classList.toggle("selected", button.dataset.bgm === choice);
  });
  if (choice === "off") {
    bgmAudio.pause();
    bgmAudio.removeAttribute("src");
    return;
  }
  bgmAudio.src = `${AUDIO_PATH}bgm_${choice}.mp3`;
  bgmAudio.volume = state.bgmVolume;
  if ($("courseScreen").classList.contains("active") && !muted) {
    bgmAudio.play().catch(() => {});
  }
}

function playSelectedBgm() {
  if (state.bgm === "off" || muted) return;
  if (!bgmAudio.src.includes(`bgm_${state.bgm}.mp3`)) {
    bgmAudio.src = `${AUDIO_PATH}bgm_${state.bgm}.mp3`;
  }
  bgmAudio.volume = state.bgmVolume;
  bgmAudio.play().catch(() => {});
}

function transitionAudioFor(index) {
  if (index === 0) return [audioFiles.start, audioFiles.ready];
  const previous = exercises[index - 1];
  const current = exercises[index];
  if (previous.pair === "right" && current.pair === "left") {
    return [audioFiles.rightFinish, audioFiles.leftStart];
  }
  if (previous.pair === "left") {
    return [audioFiles.leftFinish, audioFiles.next];
  }
  return [audioFiles.change, audioFiles.next];
}

async function runPreparation(index, isInitial = false) {
  const token = ++sessionToken;
  preparing = true;
  stopTimer();
  remaining = exercises[index].seconds;
  currentIndex = index;
  $("prepareOverlay").hidden = false;
  $("prepareLabel").textContent = isInitial ? "全身をゆっくりほぐしましょう" : "姿勢が変わります";
  $("prepareCount").textContent = "";
  renderExercise();

  const transitionFiles = isInitial ? [audioFiles.start, audioFiles.ready] : transitionAudioFor(index);
  if (!await playSequence(transitionFiles, token)) return;
  if (!await playSequence([audioFiles.prepare, audioFiles.start5], token)) return;

  $("prepareLabel").textContent = "5秒後に開始します";
  for (let count = 5; count >= 1; count -= 1) {
    if (token !== sessionToken) return;
    $("prepareCount").textContent = count;
    playVoiceQuick(audioFiles.countdown[count]);
    await wait(1000);
  }

  if (token !== sessionToken) return;
  $("prepareCount").textContent = "START";
  playVoiceQuick(audioFiles.go);
  await wait(500);
  if (token !== sessionToken) return;
  $("prepareOverlay").hidden = true;
  preparing = false;
  startTimer();
}

function beginSession(single = false, index = 0) {
  sessionToken += 1;
  stopTimer();
  stopVoice();
  singleExercise = single;
  currentIndex = index;
  remaining = exercises[index].seconds;
  courseElapsed = 0;
  cheerIndex = 0;
  catCowArch = true;
  muted = false;
  $("muteButton").textContent = "音 ON";
  showScreen("courseScreen");
  renderExercise();
  playSelectedBgm();
  runPreparation(index, true);
}

function maybePlayCheer() {
  if (singleExercise || remaining <= 6) return;
  const cheerMoments = [90, 210, 330, 450];
  if (cheerIndex >= cheerMoments.length || courseElapsed < cheerMoments[cheerIndex]) return;
  const available = audioFiles.cheers;
  const file = available[(cheerIndex + Math.floor(Math.random() * 3)) % available.length];
  cheerIndex += 1;
  playVoiceQuick(file);
}

function handleSecondTick() {
  const exercise = exercises[currentIndex];
  courseElapsed += 1;

  if (remaining <= 5 && remaining >= 1) {
    playVoiceQuick(audioFiles.countdown[remaining]);
  } else if (exercise.catCow && remaining > 5 && remaining % 3 === 0) {
    playVoiceQuick(catCowArch ? audioFiles.arch : audioFiles.round);
    catCowArch = !catCowArch;
  } else {
    maybePlayCheer();
  }
}

function startTimer() {
  if (preparing || running) return;
  running = true;
  lastRenderedSecond = remaining;
  renderExercise();
  timerId = window.setInterval(() => {
    remaining -= 1;
    if (remaining !== lastRenderedSecond) {
      lastRenderedSecond = remaining;
      handleSecondTick();
    }

    if (remaining <= 0) {
      stopTimer();
      vibrate();
      if (singleExercise) {
        finishSession(false);
      } else if (currentIndex < exercises.length - 1) {
        runPreparation(currentIndex + 1, false);
      } else {
        finishSession(true);
      }
      return;
    }
    renderExercise();
  }, 1000);
}

function togglePause() {
  if (preparing) return;
  if (running) {
    stopTimer();
    renderExercise();
  } else {
    startTimer();
  }
}

function goToStep(index) {
  if (index < 0 || index >= exercises.length) return;
  sessionToken += 1;
  stopTimer();
  stopVoice();
  runPreparation(index, false);
}

function recordCompletion() {
  const today = localDateString();
  if (!state.history.includes(today)) state.history.push(today);
  state.total += 1;
  saveState();
}

async function playCompletionAudio(recorded) {
  await playVoice("stretch_complete.mp3");
  await playVoice(audioFiles.finishes[Math.floor(Math.random() * audioFiles.finishes.length)]);
  if (!recorded) return;
  const days = streakCount();
  const milestoneFile = audioFiles.milestones[days];
  const marker = `${days}:${localDateString()}`;
  if (milestoneFile && !state.milestonePlays.includes(marker)) {
    state.milestonePlays.push(marker);
    saveState();
    await playVoice(milestoneFile);
  }
}

function finishSession(recorded) {
  sessionToken += 1;
  stopTimer();
  preparing = false;
  $("prepareOverlay").hidden = true;
  bgmAudio.pause();
  if (recorded) recordCompletion();
  const streak = streakCount();
  $("completeStreak").textContent = streak;
  $("completeTotal").textContent = state.total;
  $("completeMessage").textContent = recorded
    ? "15ステップ完了しました。今日も身体をゆっくりほぐせました。"
    : "選んだストレッチを完了しました。";
  showScreen("completeScreen");
  playCompletionAudio(recorded);
}

function exitCourse() {
  sessionToken += 1;
  stopTimer();
  stopVoice();
  bgmAudio.pause();
  preparing = false;
  $("prepareOverlay").hidden = true;
  renderHome();
  showScreen("homeScreen");
}

function openSettings() {
  $("settingsModal").classList.add("open");
  $("settingsModal").setAttribute("aria-hidden", "false");
}

function closeSettings() {
  $("settingsModal").classList.remove("open");
  $("settingsModal").setAttribute("aria-hidden", "true");
}

function bindControls() {
  $("startCourseButton").addEventListener("click", () => beginSession(false, 0));
  $("openMenuButton").addEventListener("click", () => showScreen("menuScreen"));
  document.querySelectorAll("[data-home]").forEach((button) => {
    button.addEventListener("click", () => {
      renderHome();
      showScreen("homeScreen");
    });
  });

  $("previousMonthButton").addEventListener("click", () => {
    calendarOffset -= 1;
    renderCalendar();
  });
  $("nextMonthButton").addEventListener("click", () => {
    calendarOffset += 1;
    renderCalendar();
  });

  document.querySelectorAll("[data-bgm]").forEach((button) => {
    button.addEventListener("click", () => setBgm(button.dataset.bgm));
  });

  $("exitCourseButton").addEventListener("click", exitCourse);
  $("pauseButton").addEventListener("click", togglePause);
  $("previousStepButton").addEventListener("click", () => goToStep(currentIndex - 1));
  $("nextStepButton").addEventListener("click", () => {
    if (singleExercise || currentIndex === exercises.length - 1) finishSession(false);
    else goToStep(currentIndex + 1);
  });

  $("muteButton").addEventListener("click", () => {
    muted = !muted;
    $("muteButton").textContent = muted ? "音 OFF" : "音 ON";
    if (muted) {
      stopVoice();
      bgmAudio.pause();
    } else {
      playSelectedBgm();
    }
  });

  $("completeHomeButton").addEventListener("click", () => {
    stopVoice();
    renderHome();
    showScreen("homeScreen");
  });

  $("settingsButton").addEventListener("click", openSettings);
  document.querySelectorAll("[data-close-settings]").forEach((button) => {
    button.addEventListener("click", closeSettings);
  });

  $("voiceEnabledInput").checked = state.voiceEnabled;
  $("voiceVolumeInput").value = Math.round(state.voiceVolume * 100);
  $("bgmVolumeInput").value = Math.round(state.bgmVolume * 100);
  $("vibrationInput").checked = state.vibration;
  $("voiceVolumeOutput").textContent = `${Math.round(state.voiceVolume * 100)}%`;
  $("bgmVolumeOutput").textContent = `${Math.round(state.bgmVolume * 100)}%`;

  $("voiceEnabledInput").addEventListener("change", (event) => {
    state.voiceEnabled = event.target.checked;
    if (!state.voiceEnabled) stopVoice();
    saveState();
  });
  $("voiceVolumeInput").addEventListener("input", (event) => {
    state.voiceVolume = Number(event.target.value) / 100;
    voiceAudio.volume = state.voiceVolume;
    $("voiceVolumeOutput").textContent = `${event.target.value}%`;
    saveState();
  });
  $("bgmVolumeInput").addEventListener("input", (event) => {
    state.bgmVolume = Number(event.target.value) / 100;
    bgmAudio.volume = state.bgmVolume;
    $("bgmVolumeOutput").textContent = `${event.target.value}%`;
    saveState();
  });
  $("vibrationInput").addEventListener("change", (event) => {
    state.vibration = event.target.checked;
    saveState();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && running) {
      stopTimer();
      renderExercise();
    }
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }
}

function warmAssetCache() {
  if (!("caches" in window) || !location.protocol.startsWith("http")) return;
  const imageAssets = exercises.map((exercise) => `${IMAGE_PATH}${exercise.image}`);
  const audioAssets = [
    ...Object.values(audioFiles.countdown),
    ...audioFiles.finishes,
    ...audioFiles.cheers,
    ...Object.values(audioFiles.milestones),
    audioFiles.start,
    audioFiles.ready,
    audioFiles.change,
    audioFiles.prepare,
    audioFiles.start5,
    audioFiles.go,
    audioFiles.rightFinish,
    audioFiles.leftStart,
    audioFiles.leftFinish,
    audioFiles.next,
    audioFiles.round,
    audioFiles.arch,
    "stretch_complete.mp3",
    "bgm_river.mp3",
    "bgm_forest.mp3"
  ].map((file) => `${AUDIO_PATH}${file}`);
  window.setTimeout(() => {
    caches.open(`hogusu-media-${APP_VERSION}`).then((cache) => {
      [...imageAssets, ...audioAssets].forEach((asset) => {
        cache.add(asset).catch(() => {});
      });
    }).catch(() => {});
  }, 1800);
}

renderExerciseList();
bindControls();
setBgm(state.bgm);
renderHome();
renderExercise();
registerServiceWorker();
warmAssetCache();

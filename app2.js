const $form = document.querySelector("#form");
const $input = document.querySelector("#input");
const $logs = document.querySelector("#logs");

// 1부터 9까지 담는 배열
const numbers = [];
  for(let i = 0; i < 9; i++){
  numbers.push(i + 1);
}

// 4자리 정수인 정답을 담는 배열
const answer = [];
  for(let i = 0; i < 4; i++){
  const index = Math.floor(Math.random() * (numbers.length - 1));
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}

// 사용자가 입력한 값을 담는 배열
const tries = [];
  const checkInput = (input) => {
  if(input.length !== 4){
    return alert("4자리 숫자를 입력해 주세요!");
  }
  if(new Set(input).size !== 4){
    return alert("중복되지 않게 입력해 주세요!");
  }
  if(tries.includes(input)){
    return alert("이미 시도한 값입니다!");
  } 
  return true;
};

const outMessage = () => {
  $logs.append(document.createElement("hr"), `패배! 정답은 ${answer.join("")}`);
}

// 0 strike, 0 ball 의 횟수를 담는 배열
let out = [];

const playGame = (e) => {
  e.preventDefault();
  const value = $input.value;
  console.log(answer.join(""));
  $input.value = "";
  if(!checkInput(value)){
    return; // 입력값에 오류가 있으면 함수 종료
  }
  // 입력값에 문제가 없으면
  if(answer.join("") === value){
    $logs.append(document.createElement("br"), document.createElement("hr"), `${value} : 홈런!`);
    return;
  }
  if(tries.length >= 9){ // 10번 이상 시도했을 때
    outMessage();
    return;
  }
  let strike = 0;
  let ball = 0;
  for(let i = 0; i < answer.length; i++){
    const index = value.indexOf([answer[i]]);
    // answer = 3167, value = 3245
    // answer[0] = 3 (i=0)
    // value.indexOf(3) = 0
    if(index > -1){
      if(index === i){
        strike += 1;
      } else {
        ball += 1;
      }
    }
  }
  if(strike === 0 && ball === 0){
    out++;
    $logs.append(document.createElement("hr"), `${value} : ${out} OUT!`, document.createElement("br"));
  } else {
    $logs.append(document.createElement("hr"), `${value} : ${strike} strike / ${ball} ball`, document.createElement("br"));
  }
  if(out === 3){
    outMessage();
    return;
  }
  tries.push(value);
};

$form.addEventListener("submit", playGame);

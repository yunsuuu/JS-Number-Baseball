const $form = document.querySelector("#form");
const $input = document.querySelector("input");
const $logs = document.querySelector("#logs");

// while문
// const numbers = [];
// i = 1;
// while(i <= 9){
//   numbers.push(i);
//   i++;
// }

// for문 - 1~9까지 숫자를 모아놓는 배열
const numbers = []; // [1, 2, 3, 4, 5, 6, 7, 8, 9]
for (let i = 0; i < 9; i++){
  numbers.push(i + 1);
}

// 정답으로 선택된 4자리 랜덤숫자
const answer = [];
for (let i = 0; i < 4; i++){ // 4번 반복
  const index = Math.floor(Math.random() * (numbers.length - i)); 
  // 0~8까지 정수 4개 랜덤 추출
  // 숫자를 뽑을 때마다 하나씩 제거되니까 index 값도 하나씩 줄어야 함 (9 - i를 해준 이유)
  // index = 1 => numbers 배열에서 1번째 값(2)
  answer.push(numbers[index]); // numbers = 2를 answer로 push
  numbers.splice(index, 1); // push 해준 값을 splice로 제거 (index에서 1개 제거)
}

const tries = []; // input value 담는 배열
const checkInput = (input) => { // 사용자가 입력한 값을 검사하는 코드
  if(input.length !== 4){ // 4자리를 입력하지 않은 경우
    return alert("4자리 숫자를 입력해 주세요!"); 
    // alert의 return값은 undefined
    // undefined는 if문 안에 들어가면 false
  }
  if(new Set(input).size !== 4){ // 중복되게 입력한 경우
    return alert("중복되지 않게 입력해 주세요!");
  }
  if(tries.includes(input)){ // 이미 입력한 값일 경우
    return alert("이미 시도한 값입니다!");
  }
  return true; // true 이면 if문 안에 함수를 넣을 수 있음
};

// 패배했을 때 출력되는 메시지(중복제거를 위해 함수로 빼줌)
const outMessage = () => {
  $logs.append(document.createElement("hr"), `패배! 정답은 ${answer.join("")}`);
};

// out 횟수를 세는 변수
let out = 0;

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = $input.value;
  console.log(answer.join(""));
  $input.value = "";
  if(!checkInput(value)){
  // 입력값 문제있음
    return; // 입력값에 문제가 있으면 함수 중단
  } // (if문 중첩 제거해주기 위해 else 생략)
  // 입력값 문제 없음
  if(answer.join("") === value){ 
    // join 메서드는 배열을 문자열로 변환
    // [3, 1, 4, 6] -> join("") -> 3146 / 따옴표 없으면 , 이 들어감
    $logs.append(document.createElement("br"), document.createElement("hr"), `${value} : 홈런!`);
    return;
  }
  if(tries.length >= 9){ // 10번째 숫자 입력 후 submit 하면 결과 출력
    outMessage();
    return;
  }
  let strike = 0;
  let ball = 0;
  // answer = 3146, value = 3275
  for (let i = 0; i < answer.length; i++){ // answer를 0번째 숫자부터 반복해서 돔
    const index = value.indexOf(answer[i]);
    // answer[0] = 3 (i=0)
    // value.indexOf(3) = 0
    if(index > -1){ // 일치하는 숫자가 있으면
      if(index === i){ // 자릿수가 같음
          strike += 1;
      } else { // 숫자만 같음
          ball += 1;
      }
    }
  }
  if(strike === 0 && ball === 0){
    out++; // 횟수를 셀 때 변수를 0으로 두고, ++ 해주면 됨
    $logs.append(document.createElement("hr"), `${value}: ${out} OUT!`, document.createElement("br"));
  } else {
    $logs.append(document.createElement("hr"), `${value} : ${strike} strike / ${ball} ball`, document.createElement("br")); 
  }
  if(out === 3){
    outMessage();
    return;
  }
  tries.push(value);
});

// while문
// let strike = 0;
// let ball = 0;
// i = 0;
// while (i < answer.length){ // 자릿수 비교를 위해 answer.length 사용
//   const index = value.indexOf(answer[i]);
//   i++
//   if(index > -1){ // 일치하는 숫자가 있으면
//     if(index === i){ // 자릿수가 같음
//         strike += 1;
//     } else { // 숫자만 같음
//         ball += 1;
//     }
//   }
// }

// forEach
// const answer = [3, 1, 4, 6];
// const value = '3124';
// let strike = 0;
// let ball = 0;
// answer.forEach((element, i) => {
//   const index = value.indexOf(element);
//   if(index > -1){
//     if(index === i){
//       strike += 1;
//     } else {
//       ball += 1;
//     }
//   }
// })

// 산술연산자
console.log(10 + 3);
console.log(10 - 3);
console.log(10 * 3);
console.log(10 / 3); // java는 정수/정수 => 정수, js 정수/정수 => 실수
console.log(10 % 3);
console.log(Math.pow(10, 3)); // 거듭 제곱 10*10*10
console.log(10 ** 3); // 거듭 제곱

console.log(2 - "test"); // NaN
console.log(10 / 0); // Infinity : 자바에서는 에러
console.log(0 / 10); // 0

// String의 종류
// "" (쌍따옴표 : 더블쿼테이션)
// '' (홑따옴표 : 싱글쿼테이션)
// `` (백틱 : 키보드 1 옆에 ~ 표 있는거 그냥 누르면 됨)

let intro = '박윤재 \n 입니다 \\';
console.log(intro);
intro = "'박윤재' 입니다";
console.log(intro);
intro = '"박윤재" 입니다';
console.log(intro);

// `` 스트링 템플릿을 만들 수 있다.
const name = "박윤재";
const job = "백수";
intro = `저는 ${name} 입니다. 직업은 ${job} 입니다`;

console.log(intro);

// boolean타입은 동일하다

let isDead = true;
console.log(isDead);
console.log(!isDead);
console.log(!!isDead);

// falsy value : 값으로 인식하지 않는 값

console.log(!!0); // 숫자 0 
console.log(!!""); // 문자 빈문자열
console.log(!!null); // 비어있는 주소값
console.log(!!undefined);
console.log(!!NaN);

// let cat = undefined; -> 쓰지 마셍?
// cat; //  위에 있는 것을 축약 하면 동일한 것

let cat = null; // 비어있다는 표시 null로만 표시하기!

// truly

console.log(!!10); // 0 제외한 모든 숫자
console.log(!!-10.123); // 음수도 동일
console.log(!!"test"); // 비어있지 않는 모든 문자
console.log(!!10); // 0 제외한 모든 숫자
console.log(!!10); // 0 제외한 모든 숫자
console.log(!!10); // 0 제외한 모든 숫자
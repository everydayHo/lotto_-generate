조정우;
('use strict');
const popup = document.querySelector('.overlay');
const popupSubmitBtn = document.querySelector('.overlay .btn');
const overlayContainer = document.querySelector('.overlay .inner .wrapper');
const closeBtn = document.querySelector('.overlay .inner .close');
const fixballBtn = document.querySelector('.fixball_container .btn');
const choicelBtn = document.querySelector('.choice_container .btn');

function createItem(number) {
	const itemrow = document.createElement('span');
	itemrow.setAttribute('class', 'ball');
	itemrow.innerText = number;
	return itemrow;
}

for (let i = 1; i < 46; i++) {
	let itemBall = createItem(i);
	overlayContainer.appendChild(itemBall);
}

closeBtn.addEventListener('click', () => {
	popup.classList.remove('visible');
});

fixballBtn.addEventListener('click', () => {
	popup.classList.toggle('visible');
});
choicelBtn.addEventListener('click', () => {
	popup.classList.toggle('visible');
});

// 선택한 숫자들
// 선택힌 숫자들이거나 선택을 안했을 때 전체로 숫자가 나오게 만듬

let selectedNumbers = [];

let otherNumbers = [];
const textArea = document.querySelector('.area');

function luckyNumber() {
	document.querySelector('.btn3').addEventListener('click', (e) => {
		e.preventDefault();
		selectedNumbers = [1, 4];
	});
	document.querySelector('.btn1').addEventListener('click', ClickNumber);

	document.querySelector('.btn2').addEventListener('click', (e) => {
		e.preventDefault();
		let allNumbers = generateLottoNumbers(selectedNumbers, otherNumbers);
		if (textArea.childNodes.length > 0) {
			textArea.innerHTML = '';
		}

		for (let i = 0; i < allNumbers.length; i++) {
			let paragraph = document.createElement('p');
			let text = String(allNumbers[i].sort((a, b) => a - b).join(', '));
			console.log(text);
			paragraph.innerText = `${i}번째: ${text}`;

			textArea.appendChild(paragraph);
		}
	});
}

function ClickNumber(e) {
	e.preventDefault();
	otherNumbers = [2, 41, 35, 11, 17, 14];
}

function generateLottoNumbers(selectedNumbers, otherNumbers) {
	console.log('셀렉트:', selectedNumbers);
	console.log('클릭:', otherNumbers);
	let allNumbers = [];

	console.log('넘기는 숫자:', otherNumbers);
	for (let i = 0; i < 50; i++) {
		let otherLottoNumbers = generateOtherLottoNumbers(otherNumbers);
		let lottoNumbers = selectedNumbers.slice();

		if (lottoNumbers.length > 0) {
			for (let j = 0; j < lottoNumbers.length; j++) {
				otherLottoNumbers.splice(j, 1, lottoNumbers[j]);
			}
		}
		allNumbers.push(otherLottoNumbers);
		console.log(allNumbers);
	}
	return allNumbers;

	// 선택한 숫자들만으로 로또 번호 조합 생성
}

function generateOtherLottoNumbers(otherNumbers) {
	let lottoNumbers = [];
	console.log('넘어오는 값2:', otherNumbers);
	if (otherNumbers.length > 0) {
		while (lottoNumbers.length < 6) {
			let random =
				otherNumbers[Math.floor(Math.random() * otherNumbers.length)];
			if (lottoNumbers.indexOf(random) === -1) {
				lottoNumbers.push(random);
			}
		}
	}
	return lottoNumbers;
}

luckyNumber();

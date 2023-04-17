'use strict';
const popup = document.querySelector('.overlay');
const popupSubmitBtn = document.querySelector('.overlay .btn');
const overlayContainer = document.querySelector('.overlay .inner .wrapper');
const closeBtn = document.querySelector('.overlay .inner .close');
const fixballBtn = document.querySelector('.fixball_container .btn');
const choiceBtn = document.querySelector('.choice_container .btn');

function createItem(number) {
	const itemrow = document.createElement('span');
	itemrow.setAttribute('class', 'ball');
	itemrow.innerText = number;
	return itemrow;
}

for (let i = 1; i <= 45; i++) {
	let itemBall = createItem(i);
	overlayContainer.appendChild(itemBall);
}

closeBtn.addEventListener('click', () => {
	popup.classList.remove('visible');
});

fixballBtn.addEventListener('click', () => {
	popup.classList.toggle('visible');
});

choiceBtn.addEventListener('click', () => {
	popup.classList.toggle('visible');
});

// 선택한 숫자들
// 선택한 숫자들이거나 선택을 안했을 때 전체로 숫자가 나오게 만듦
let otherNumbers = [];
function clickNumber(e) {
	let selectedNumbers = [4, 16, 24];
	if (e.target.classList.contains('ball')) {
		let selectedNumber = parseInt(e.target.innerText);
		if (
			selectedNumbers.indexOf(selectedNumber) === -1 &&
			otherNumbers.indexOf(selectedNumber) === -1
		) {
			e.target.style.backgroundColor = '#00c6cf';
			otherNumbers.push(selectedNumber);
			console.log('넘어오는 값1:', otherNumbers);
			generateLottoNumbers(selectedNumbers, otherNumbers);
			popupSubmitBtn.addEventListener('click', () => {
				getResult(selectedNumbers, otherNumbers);
			});
		}
	}
}
overlayContainer.addEventListener('click', clickNumber);

function generateLottoNumbers(selectedNumbers, otherNumbers) {
	let allNumbers = [];
	for (let i = 0; i < 50; i++) {
		let otherLottoNumbers = generateOtherLottoNumbers(otherNumbers);
		let lottoNumbers = selectedNumbers.slice();
		if (lottoNumbers.length > 0) {
			for (let j = 0; j < lottoNumbers.length; j++) {
				otherLottoNumbers.splice(j, 1, lottoNumbers[j]);
			}
		}
		allNumbers.push(otherLottoNumbers);
	}

	getResult(selectedNumbers, otherNumbers, allNumbers);

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

function getResult(selectedNumbers, otherNumbers, allNumbers) {
	console.log('내가 선택한 숫자를 고정하고 조합한 모든 로또 번호:');
	// 생성된 모든 로또 번호 출력
	for (let i = 0; i < allNumbers.length; i++) {
		console.log(
			i + 1 + '번째: ' + allNumbers[i].sort((a, b) => a - b).join(', ')
		);
	}
}

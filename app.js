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

for (let i = 1; i < 46; i++) {
	let itemBall = createItem(i);
	overlayContainer.appendChild(itemBall);
}
const fixballs = document.querySelectorAll('.overlay .inner .wrapper .ball');

// 선택한 숫자들
// 선택힌 숫자들이거나 선택을 안했을 때 전체로 숫자가 나오게 만듬
let otherNumbers = [];
let selectedNumbers = [];
function clickNumber(e) {
	if (e.target.classList.contains('ball')) {
		let selectedNumber = parseInt(e.target.innerText);
		if (otherNumbers.indexOf(selectedNumber) === -1) {
			e.target.style.backgroundColor = '#00c6cf';
			otherNumbers.push(selectedNumber);
		}
	}
	console.log('넘어오는 값1:', otherNumbers);
	generateOtherLottoNumbers(otherNumbers);
}
function clickNumber2(e) {
	console.log('2:', e);
	if (e.target.classList.contains('ball')) {
		let selectedNumber = parseInt(e.target.innerText);
		e.target.style.backgroundColor = '#ff2c56';
		selectedNumbers.push(selectedNumber);
		console.log('넘어오는 값1:', selectedNumbers);
	}
	generateLottoNumbers(selectedNumbers);
}

function getFixball(e) {
	popup.classList.toggle('visible');
	overlayContainer.addEventListener('click', clickNumber);
}

function getSelectball(e) {
	popup.classList.toggle('visible');
	overlayContainer.addEventListener('click', clickNumber2);
}
function generateLuckNumber() {
	fixballBtn.addEventListener('click', getFixball);
	console.log('아더:', otherNumbers);
	choiceBtn.addEventListener('click', getSelectball);
	closeBtn.addEventListener('click', () => {
		popup.classList.remove('visible');
	});
	popupSubmitBtn.addEventListener('click', () => {
		let allNumbers = generateLottoNumbers(selectedNumbers, otherNumbers);
		for (let i = 0; i < allNumbers.length; i++) {
			console.log(
				i + 1 + '번째: ' + allNumbers[i].sort((a, b) => a - b).join(', ')
			);
		}
	});
}

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
	return allNumbers;
	// 선택한 숫자들만으로 로또 번호 조합 생성
}

function generateOtherLottoNumbers(otherNumbers) {
	console.log('안:', otherNumbers);
	let lottoNumbers = [];
	console.log('넘어오는 값2:', otherNumbers);
	if (otherNumbers.length > 6) {
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

generateLuckNumber();
